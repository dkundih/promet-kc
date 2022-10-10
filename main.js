import { m_bicikli_podaci } from "./pass_args.js"

//time

function showTime() {
    var time = new Date();
    return time.toLocaleTimeString("hr-HR");
}

//map

const centermap = [[46.1639, 16.83], 14.8]

const map = L.map('map').setView(centermap[0], centermap[1]);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let locIcon = L.icon({
    iconUrl: "ikone/vlak.png",
    iconSize:     [38, 50], // size of the icon
    iconAnchor:   [20, 30], // point of the icon which will correspond to marker's location
})

var mjesta = ["LENIŠĆE", "CERINE", "KAMPUS", "ŽELJEZNIČKI KOLODVOR", "GROBLJE", "ZRINSKI TRG", "DOM MLADIH"]

//initial show
for (let i of mjesta) {
    var j = await L.marker([m_bicikli_podaci[i]['X'], m_bicikli_podaci[i]['Y']], {icon: locIcon}).addTo(map)
    j.bindPopup(
        `
        <H4>${i}</H4>
        <p>Sada je ${showTime()}.</p>
        <p>Ovdje se nalazi postolje mehaničkih <b>Bicko</b> bicikala.</p>
        <img src = "slike/bicikli.jpg" height = 150px width = 300px</img>
        `
    )
}

// initial load
for (let i of mjesta) {
    var j = await L.marker([m_bicikli_podaci[i]['X'], m_bicikli_podaci[i]['Y']], {icon: locIcon}).addTo(map)
    j.bindPopup(
        `
        <H4>${i}</H4>
        <p>Sada je ${showTime()}.</p>
        <p>Ovdje se nalazi postolje mehaničkih <b>Bicko</b> bicikala.</p>
        <img src = "slike/bicikli.jpg" height = 150px width = 300px</img>
        `
    )
}

// update every 15 sec
async function prikazMBicikala() {
    for (let i of mjesta) {
        var j = await L.marker([m_bicikli_podaci[i]['X'], m_bicikli_podaci[i]['Y']], {icon: locIcon}).addTo(map)
        j.bindPopup(
            `
            <H4>${i}</H4>
            <p>Sada je ${showTime()}.</p>
            <p>Ovdje se nalazi postolje mehaničkih <b>Bicko</b> bicikala.</p>
            <img src = "slike/bicikli.jpg" height = 150px width = 300px</img>
            `
        )
    }
}

setInterval(prikazMBicikala, 15000)