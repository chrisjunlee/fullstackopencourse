import PropTypes from 'prop-types'

const LoginForm = ({
   handleSubmit,
   handleUsernameChange,
   handlePasswordChange,
   username,
   password
  }) => {
    return (
    <form onSubmit={handleSubmit}>
      <div>
        Username: 
        <input type="text" value={username} onChange = {handleUsernameChange}/>
      </div>
      <div>
        Password: <input type="password" value={password} onChange = {handlePasswordChange}/>
      </div>
      <button type="submit">Login</button>
    </form>
  )}

// eslint-disable-next-line react/no-typos
LoginForm.PropTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}
  
export default LoginForm