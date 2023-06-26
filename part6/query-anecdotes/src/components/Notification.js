import {useContext} from 'react'
import NotifyContext from '../NotifyContext'

const Notification = () => {
  const [msg, dispatch] = useContext(NotifyContext)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  console.log('msg', msg)

  return (
    <div style={style}>
      {msg}
    </div>
  )
}

export default Notification
