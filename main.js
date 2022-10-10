const map = L.map('map').setView([45.8, 16], 12);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let locIcon = L.icon({
    iconUrl: "https://raw.githubusercontent.com/dkundih/dkundih-busko/master/ikone/vlak.png",
    iconSize:     [38, 50], // size of the icon
    iconAnchor:   [20, 30], // point of the icon which will correspond to marker's location
})

var markers = [L.marker([45.82, 16], {icon: locIcon}).addTo(map), L.marker([45.81, 16.14], {icon: locIcon}).addTo(map)]

function showTime() {
    var time = new Date();
    return time.toLocaleTimeString("hr-HR");
}

let first = true;


function popup() {
    for (let i of markers) {
        if (first) {
        i.bindPopup(
        `
        <H1>ZG</H1>
        <p> ${showTime()} je sati ustani.</p>
        <p>Hi</p>
        <img src = "https://media-exp1.licdn.com/dms/image/C4D16AQHpOsJkmupuZg/profile-displaybackgroundimage-shrink_350_1400/0/1636792791248?e=1671062400&v=beta&t=PTNuKJYQF-krZudZFeQiOXVpU-M3iPulvMDBfUG6MMg" height = 80px width = 200px</img>
        `
        ).openPopup();
        }
        else {
            i.bindPopup(
                `
                <H1>ZG</H1>
                <p> ${showTime()} je sati ustani.</p>
                <p>Hi</p>
                <img src = "https://media-exp1.licdn.com/dms/image/C4D16AQHpOsJkmupuZg/profile-displaybackgroundimage-shrink_350_1400/0/1636792791248?e=1671062400&v=beta&t=PTNuKJYQF-krZudZFeQiOXVpU-M3iPulvMDBfUG6MMg" height = 80px width = 200px</img>
                `
                )
        }
    }
    first = false
}

setInterval(popup, 1000)