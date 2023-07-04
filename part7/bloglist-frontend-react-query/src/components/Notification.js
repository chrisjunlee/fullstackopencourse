import { useContext } from "react";
import NotifyContext from "../NotifyContext";

const Notification = () => {
  const [msgObj, dispatch] = useContext(NotifyContext);

  if(msgObj == null | msgObj.msg == null) {return null}
  
  return <div class={msgObj.style}>{msgObj.msg}</div>
}

export default Notification;
