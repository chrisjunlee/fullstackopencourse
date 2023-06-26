import { createSlice } from '@reduxjs/toolkit'

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
    vote(state, action) {
      const id = action.payload
      return state.map(anec => anec.id === id? {...anec, votes: anec.votes + 1} : anec)
    },
    createNew(state, action) {
      state.push(asObject(action.payload))
    },
    appendAnec(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { vote, createNew, appendAnec, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer