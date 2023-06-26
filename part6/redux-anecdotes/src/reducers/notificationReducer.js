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

export const setNotification = (msg, timeOut = 3) => {
  return async dispatch => {
      await dispatch(setNotify(msg))
      setTimeout(async () => await dispatch(clearNotify()), timeOut*1000)
  }
}

export default notificationSlice.reducer
