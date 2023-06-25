import { useSelector } from 'react-redux'

const Notification = () => {
  const msg = useSelector(({notif}) => notif)

  if(!msg) {return null}

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    width: "fit-content",
    background: "WhiteSmoke",
    'border-radius': '5px'
  };
  
  return (
    <div style={style}>
      {msg}
    </div>
  )
}

export default Notification