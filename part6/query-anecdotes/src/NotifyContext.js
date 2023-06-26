import { createContext, useReducer } from "react";

const reducer = (state, action) => {
  switch(action.type) {
    case "SET":
      return action.payload
    case "CLEAR":
      return ''
  }
}

const NotifyContext = createContext();

export const NotifyContextProvider = (props) => {
  const [msg, msgDispatch] = useReducer(reducer, '')

  return (
    <NotifyContext.Provider value={[msg, msgDispatch]}>
      {props.children}
    </NotifyContext.Provider>
  )
}

export default NotifyContext;
