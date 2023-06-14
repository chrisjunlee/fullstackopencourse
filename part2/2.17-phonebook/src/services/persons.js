import axios from 'axios'
const DEV_SERVER = '/api/persons'

const getAll = () => {
    console.log('baseurl', DEV_SERVER)
    return axios.get(DEV_SERVER)
        .then(response => response.data)
}

const create = newObject => {
    return axios.post(DEV_SERVER, newObject)
        .then(response => response.data)
}

const update = (id, newObject) => {
    return axios.put(`${DEV_SERVER}/${id}`, newObject)
        .then(response => response.data)
}

const deletePersonById = (id) => {
    return axios.delete(`${DEV_SERVER}/${id}`)
        .then(response => response.data)
}

export default { getAll, create, update, deletePersonById}