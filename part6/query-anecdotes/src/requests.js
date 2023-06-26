import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes"

export const getAnecdotes = () => {
  return axios.get(baseUrl).then(res => res.data)
}

export const createAnecdote = (newAnecdote) => {
  console.log('newAnecdote', newAnecdote)
  return axios.post(baseUrl, newAnecdote).then(res => res.data)
}

export const vote = (anecdote) => {
  const newAnec = { ...anecdote, votes: anecdote.votes + 1 };
  const resData = axios.put(`${baseUrl}/${anecdote.id}`, newAnec).then(res => res.data)
  console.log('resData', resData)
  return resData
}