// unos
import { m_bicikli_podaci, e_bicikli_podaci, vlak_podaci, bus_podaci } from "./prihvat_podataka.js"

// vrijeme
function showTime() {
    var vrijeme = new Date();
    return vrijeme.toLocaleTimeString("hr-HR");
}

// karta
const centar = [[46.1639, 16.83], 14]
const karta = L.map('map').setView(centar[0], centar[1]);

// izgled karte
L.tileLayer("https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png", {
    maxZoom: 20,
    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>"'
}).addTo(karta);

// ikone
let biciklIkona = L.icon({
    iconUrl: "ikone/bicikl.png",
    iconSize:     [35, 45], // size of the icon
    iconAnchor:   [18, 25], // point of the icon which will correspond to marker's location
})

let busIkona = L.icon({
    iconUrl: "ikone/bus.png",
    iconSize:     [35, 45], // size of the icon
    iconAnchor:   [18, 25], // point of the icon which will correspond to marker's location
})

let vlakIkona = L.icon({
    iconUrl: "ikone/vlak.png",
    iconSize:     [35, 45], // size of the icon
    iconAnchor:   [18, 25], // point of the icon which will correspond to marker's location
})

// mjesta
const m_bicikli_mjesta = ["LENIŠĆE", "CERINE", "KAMPUS", "ŽELJEZNIČKI KOLODVOR", "GROBLJE", "ZRINSKI TRG", "DOM MLADIH"]
const e_bicikli_mjesta = ["SVEUČILIŠTE SJEVER"]
const bus_mjesta = ["AUTOBUSNI KOLODVOR", "TRG MLADOSTI", "BOLNICA", "STADION", "KAMPUS"]
const vlak_mjesta = ['KC-VŽ', 'KC-BT', 'KC-VT', 'KC-ZG', 'KUNOVEC-SUBOTICA', 'DRNJE', 'BREGI', 'MUČNA REKA']

// funkcija za prikaz terminala mehaničkih bicikala
async function prikazMBicikala() {
    for (let i of m_bicikli_mjesta) {
        var j = await L.marker([m_bicikli_podaci[i]['X'], m_bicikli_podaci[i]['Y']], {icon: biciklIkona}).addTo(karta)
        j.bindPopup(
            `
            <H4>${i}</H4>
            <p>Ovdje se nalazi postolje mehaničkih <b>Bicko</b> bicikala.</p>
            <img src = "slike/bicikli.jpg" height = 150px width = 300px</img>
            `
        )
    }
}

// funkcija za prikaz terminala električnih bicikala
async function prikazEBicikala() {
    for (let i of e_bicikli_mjesta) {
        var j = await L.marker([e_bicikli_podaci[i]['X'], e_bicikli_podaci[i]['Y']], {icon: biciklIkona}).addTo(karta)
        j.bindPopup(
            `
            <H4>${i}</H4>
            <p>Ovdje se nalazi postolje električnih <b>Bicko</b> bicikala.</p>
            <img src = "slike/bicikli.jpg" height = 150px width = 300px</img>
            `
        )
    }
}

// funkcija za prikaz terminala autobusa  POTREBNO U JSONU PRIDRUŽITI LINK SLIKE LOKACIJI I IZMJENITI bindPopup opis!!!
async function prikazBusa() {
    for (let i of bus_mjesta) {
        var j = await L.marker([bus_podaci[i]['X'], bus_podaci[i]['Y']], {icon: busIkona}).addTo(karta)
        j.bindPopup(
            `
            <H4>${i}</H4>
            <p>Sada je ${showTime()}.</p>
            <p>Ovdje se nalazi postolje električnih <b>Bicko</b> bicikala.</p>
            <img src = "slike/bicikli.jpg" height = 150px width = 300px</img>
            `
        )
    }
}

// funkcija za prikaz terminala autobusa  POTREBNO U JSONU PRIDRUŽITI LINK SLIKE LOKACIJI I IZMJENITI bindPopup opis!!!
async function prikazVlaka() {
    for (let i of vlak_mjesta) {
        var j = await L.marker([vlak_podaci[i]['X'], vlak_podaci[i]['Y']], {icon: vlakIkona}).addTo(karta)
        j.bindPopup(
            `
            <H4>${i}</H4>
            <p>Sada je ${showTime()}.</p>
            <p>Ovdje se nalazi postolje električnih <b>Bicko</b> bicikala.</p>
            <img src = "slike/bicikli.jpg" height = 150px width = 300px</img>
            `
        )
    }
}

// inicijalizacija i kontinuirano ažuriranje funkcije
async function kontinuiraniPrikaz(funkcija, iznos) {
    await funkcija()
    setInterval(funkcija, iznos)
}

// __main__.py alike
kontinuiraniPrikaz(prikazMBicikala, 30000)
kontinuiraniPrikaz(prikazEBicikala, 30000)
kontinuiraniPrikaz(prikazBusa, 10000)
kontinuiraniPrikaz(prikazVlaka, 10000)
