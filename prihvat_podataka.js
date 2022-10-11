// api veze
const m_bicikli_api = "https://raw.githubusercontent.com/dkundih/api/master/promet-kc/bicikl/mehani%C4%8Dki/T_M_BICIKLI.json"
const e_bicikli_api = "https://raw.githubusercontent.com/dkundih/api/master/promet-kc/bicikl/elektri%C4%8Dni/T_E_BICIKLI.json"
const vlak_api = "https://raw.githubusercontent.com/dkundih/api/master/promet-kc/vlak/T_V.json"
const bus_api = "https://raw.githubusercontent.com/dkundih/api/master/promet-kc/bus/T_B_L1.json"

// dohvaćanje podataka
async function kreiraj(api) {
    const zahtjev = await fetch(api)
    const podaci = await zahtjev.json()
    return podaci
}

// pohrana i indeksiranje nad varijablom
export var m_bicikli_podaci = await kreiraj(m_bicikli_api)
export var e_bicikli_podaci = await kreiraj(e_bicikli_api)
export var vlak_podaci = await kreiraj(vlak_api)
export var bus_podaci = await kreiraj(bus_api)
