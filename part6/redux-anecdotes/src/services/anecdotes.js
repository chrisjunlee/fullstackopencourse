import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const obj = {content, votes: 0}
  const response = await axios.post(baseUrl, obj)
  return response.data
}

const update = async (newObj) => {
  const response = await axios.put(`${baseUrl}/${newObj.id}`, newObj)
  return response.data
}

const deleteByID = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

export default { getAll, createNew, deleteByID, update, getById };
