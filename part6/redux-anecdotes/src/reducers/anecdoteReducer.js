import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteSlice = createSlice({
  name: 'anecdote', 
  initialState: [],
  reducers: {
    updateAnec(state, action) {
      const updatedAnec = action.payload
      const id = updatedAnec.id
      return state.map(anec => anec.id === id? updatedAnec : anec )
    }
    ,
    appendAnec(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    removeAnec(state, action) {
      const id = action.payload
      return state.filter(anec => anec.id !== id)
    }
  }
})

export const { appendAnec, setAnecdotes, removeAnec, updateAnec } = anecdoteSlice.actions;

// Asynchronous Action Creators
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createNew = (content) => {
  return async dispatch => {
    const newObj = await anecdoteService.createNew(content)
    dispatch(appendAnec(newObj))
  }
}

export const deleteById = (id) => {
  return async dispatch => {
    await anecdoteService.deleteByID(id)
    dispatch(removeAnec(id))
  }
}

export const vote = (id) => {
    return async dispatch => {
      const anecObj = await anecdoteService.getById(id)
      const newObj = await anecdoteService.update({...anecObj, votes: anecObj.votes + 1})
      dispatch(updateAnec(newObj))
    }
  }

export default anecdoteSlice.reducer