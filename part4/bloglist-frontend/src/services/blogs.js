import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {token = `bearer ${newToken}`; console.log('setToken', newToken)}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObj => {
  console.log('blogs.js::token', token)
  const config = { headers: { Authorization: token }}
  const response = await axios.post(baseUrl, newObj, config)
  return response.data
}


// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, setToken }