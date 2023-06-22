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

const like = async blogObj => {
  const config = { headers: { Authorization: token } }

  // {...blogObj, } causes CastError: Cast to ObjectId failed for value
  const updatedBlog = {author: blogObj.author, title: blogObj.title, url: blogObj.url, likes: blogObj.likes + 1 }
  console.log('updatedBlog', updatedBlog)
  const response = await axios.put(`${baseUrl}/${blogObj.id}`, updatedBlog, config)
  return response.data
}

const deleteById = async id => {
  const config = { headers: { Authorization: token } }
  console.log('deleting', id, config)
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}


// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, deleteById, like, setToken }