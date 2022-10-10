//data
const m_bicikli_api = "https://raw.githubusercontent.com/dkundih/api/master/promet-kc/bicikl/mehani%C4%8Dki/T_M_BICIKLI.json"

async function create() {
    const response = await fetch(m_bicikli_api)
    const data = await response.json()
    return data
}

export var m_bicikli_podaci = await create()
