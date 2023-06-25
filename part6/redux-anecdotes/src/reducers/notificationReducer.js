import { createSlice } from "@reduxjs/toolkit";

const initialState = 'InitialState'

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotify(state, action) {
      return action.payload
    },
    clearNotify (state, action) {
      return ''
    }
  }
})

export const { setNotify, clearNotify } = notificationSlice.actions
export default notificationSlice.reducer
