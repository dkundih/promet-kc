// api veze - točke
const m_bicikli_api = "https://raw.githubusercontent.com/dkundih/api/master/promet-kc/bicikl/mehani%C4%8Dki/T_M_BICIKLI.json"
const e_bicikli_api = "https://raw.githubusercontent.com/dkundih/api/master/promet-kc/bicikl/elektri%C4%8Dni/T_E_BICIKLI.json"
const vlak_api = "https://raw.githubusercontent.com/dkundih/api/master/promet-kc/vlak/T_V.json"
const bus_api = "https://raw.githubusercontent.com/dkundih/api/master/promet-kc/bus/T_B_L1.json"

// api veze - linije
const vlak_api_CK_KC = "https://raw.githubusercontent.com/dkundih/api/master/promet-kc/vlak/%C5%BD_%C4%8CK-KC.json"
const vlak_api_ZG_KC = "https://raw.githubusercontent.com/dkundih/api/master/promet-kc/vlak/%C5%BD_ZG-KC.json"
const vlak_api_VT_KC = "https://raw.githubusercontent.com/dkundih/api/master/promet-kc/vlak/%C5%BD_VT-KC.json"
const vlak_api_BT_KC = "https://raw.githubusercontent.com/dkundih/api/master/promet-kc/vlak/%C5%BD_BT-KC.json"
const bus_api_L1 = "https://raw.githubusercontent.com/dkundih/api/master/promet-kc/bus/B_B_L1.json"
const moj_api = "https://dkundih-api.herokuapp.com/"

// dohvaćanje podataka
async function kreiraj(api) {
    let zahtjev = await fetch(api)
    let podaci = await zahtjev.json()
    return podaci
}

// pohrana, indeksiranje i izvoz točki kao varijable
export var m_bicikli_podaci = await kreiraj(m_bicikli_api)
export var e_bicikli_podaci = await kreiraj(e_bicikli_api)
export var vlak_podaci = await kreiraj(vlak_api)
export var bus_podaci = await kreiraj(bus_api)

// pohrana, indeksiranje i izvoz linija kao varijable
export var vlak_podaci_CK_KC = await kreiraj(vlak_api_CK_KC)
export var vlak_podaci_ZG_KC = await kreiraj(vlak_api_ZG_KC)
export var vlak_podaci_VT_KC = await kreiraj(vlak_api_VT_KC)
export var vlak_podaci_BT_KC = await kreiraj(vlak_api_BT_KC)
export var bus_podaci_L1 = await kreiraj(bus_api_L1)
export var vrijeme = await kreiraj(moj_api)