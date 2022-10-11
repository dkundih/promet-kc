// unos
import { m_bicikli_podaci, e_bicikli_podaci, vlak_podaci, bus_podaci } from "./prihvat_podataka.js"
import { vlak_podaci_CK_KC, vlak_podaci_ZG_KC, vlak_podaci_VT_KC, vlak_podaci_BT_KC, bus_podaci_L1 } from "./prihvat_podataka.js"
import { stil_vlak, stil_bus } from "./stilovi_linija.js"

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
function Ikona(veza) {
    let ikona = L.icon({
        iconUrl: veza,
        iconSize:     [35, 45],
        iconAnchor:   [18, 25],
    })
    return ikona
}

const biciklIkona = Ikona("ikone/bicikl.png")
const busIkona = Ikona("ikone/bus.png")
const vlakIkona = Ikona("ikone/vlak.png")

// mjesta
const m_bicikli_mjesta = ["LENIŠĆE", "CERINE", "KAMPUS", "ŽELJEZNIČKI KOLODVOR", "GROBLJE", "ZRINSKI TRG", "DOM MLADIH"]
const e_bicikli_mjesta = ["SVEUČILIŠTE SJEVER"]
const bus_mjesta = ["AUTOBUSNI KOLODVOR", "TRG MLADOSTI", "BOLNICA", "STADION", "KAMPUS"]
const vlak_mjesta = ['KC-VŽ', 'KC-BT', 'KC-VT', 'KC-ZG', 'KUNOVEC-SUBOTICA', 'DRNJE', 'BREGI', 'MUČNA REKA']


// rječnik bicikala
let Mehanički = {
    "mjesta" : m_bicikli_mjesta,
    "podaci" : m_bicikli_podaci,
    "tekst" : "mehaničkih",
}

let Električni = {
    "mjesta" : e_bicikli_mjesta,
    "podaci" : e_bicikli_podaci,
    "tekst" : "električnih",
}

// funkcija za prikaz terminala električnih bicikala
async function prikazBicikala(vrsta) {
    if (vrsta == "mehanički") {
        for (let i of Mehanički["mjesta"]) {
            var j = await L.marker([Mehanički["podaci"][i]['X'], Mehanički["podaci"][i]['Y']], {icon: biciklIkona}).addTo(karta)
            j.bindPopup(
                `
                <H3>${i}</H3>
                <p><i>Točka ${Mehanički["tekst"]} Bicko bicikala.</i></p>
                <img src = ${Mehanički["podaci"][i]["FOTOGRAFIJA"]} height = 150px width = 300px</img>
                `
            )
        }
    } else if (vrsta == "električni") {
        for (let i of Električni["mjesta"]) {
            var j = await L.marker([Električni["podaci"][i]['X'], Električni["podaci"][i]['Y']], {icon: biciklIkona}).addTo(karta)
            j.bindPopup(
                `
                <H3>${i}</H3>
                <p><i>Točka ${Električni["tekst"]} Bicko bicikala.</i></p>
                <img src = ${Električni["podaci"][i]["FOTOGRAFIJA"]} height = 160px width = 300px</img>
                `
            )
        }
    }
}

// funkcija za prikaz terminala autobusa  POTREBNO U JSONU PRIDRUŽITI LINK SLIKE LOKACIJI I IZMJENITI bindPopup opis!!!
async function prikazBusa() {
    for (let i of bus_mjesta) {
        var j = await L.marker([bus_podaci[i]['X'], bus_podaci[i]['Y']], {icon: busIkona}).addTo(karta)
        j.bindPopup(
            `
            <H3>${i}</H3>
            <p><i>Busko stajalište autobusa.</i></p>
            <p>Sada je ${showTime()}.</p>
            <img src = ${bus_podaci[i]["FOTOGRAFIJA"]} height = 160px width = 300px</img>
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
            <H3>${i}</H3>
            <p><i>HŽ željeznički kolodvor.</i></p>
            <p>Sada je ${showTime()}.</p>
            <img src = ${vlak_podaci[i]["FOTOGRAFIJA"]} height = 130px width = 300px</img>
            `
        )
    }
}


// prikaz linija na karti
async function prikazLinije(koordinate, stil) {
    let linija = L.polyline(koordinate, stil).addTo(karta);
    return await linija
}

// inicijalizacija i kontinuirano ažuriranje funkcije
async function kontinuiraniPrikaz(funkcija, iznos) {
    await funkcija()
    setInterval(funkcija, iznos)
}

// __main__.py alike
prikazBicikala("mehanički")
prikazBicikala("električni")
prikazLinije(vlak_podaci_CK_KC, stil_vlak)
prikazLinije(vlak_podaci_ZG_KC, stil_vlak)
prikazLinije(vlak_podaci_VT_KC, stil_vlak)
prikazLinije(vlak_podaci_BT_KC, stil_vlak)
prikazLinije(bus_podaci_L1, stil_bus)
kontinuiraniPrikaz(prikazBusa, 30000)
kontinuiraniPrikaz(prikazVlaka, 30000)
