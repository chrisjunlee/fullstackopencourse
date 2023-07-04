import { createContext, useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_SUCCESS":
      return {style: "success", msg: action.payload}
    case "SET_ERROR":
      return { style: "error", msg: action.payload };
    case "CLEAR":
      return null;
    default:
      return null
  }
}

const NotifyContext = createContext();

export const NotifyContextProvider = (props) => {
  const [msgObj, msgObjDispatch] = useReducer(reducer, null);

  return (
    <NotifyContext.Provider value={[msgObj, msgObjDispatch]}>
      {props.children}
    </NotifyContext.Provider>
  );
};

export default NotifyContext;
