import axios from 'axios'
const SERVER = 'https://studies.cs.helsinki.fi/restcountries'

const getAll = () => {
    return axios.get(`${SERVER}/api/all`)
        .then(response => response.data)
}

export default {getAll}