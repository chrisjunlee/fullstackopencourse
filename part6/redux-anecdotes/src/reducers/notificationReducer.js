import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
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
