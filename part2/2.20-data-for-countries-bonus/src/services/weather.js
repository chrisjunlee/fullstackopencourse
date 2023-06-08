import axios from 'axios'
const API_KEY = process.env.REACT_APP_API_KEY

const getWeather = (country) => {
    const SERVER = 'https://api.openweathermap.org/data/3.0/onecall?'

    return getGeocode(country)
        .then( geocodes => {
            const [lat, lon] = [geocodes[0].lat, geocodes[0].lon]
            console.log('link', `${SERVER}lat=${lat}&lon=${lon}&appid=${API_KEY}`)
            return axios.get(`${SERVER}lat=${lat}&lon=${lon}&appid=${API_KEY}`).then(response => response.data)
        })
}

const getGeocode = (country) => {
    const SERVER = 'http://api.openweathermap.org/geo/1.0/direct?q='

    const [capital, countryCode] = [country.capital, country.cca2]
    console.log('country', country)
    console.log('geocode', capital, countryCode)
    return axios.get(`${SERVER}${country.capital},${country.cca2}&appid=${API_KEY}`)
        .then(response => response.data)
}

export default { getWeather }