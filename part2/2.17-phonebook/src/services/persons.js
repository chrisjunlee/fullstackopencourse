import axios from 'axios'
const DEV_SERVER = 'http://localhost:3001/persons'

const getAll = () => {
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

export default { getAll, create, update}