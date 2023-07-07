import { useState, useEffect } from 'react'
import { gql, useMutation } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) { value } }
`
const LoginForm = ({ setError, setToken }) => {
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')

const [login, result] = useMutation(LOGIN, {
  onError: (error) => {
    console.log("errorLogin", error);
    setError(error.graphQLErrors[0].message);
  },
});

useEffect(() => {
    console.log('result0', result)
    if ( result.data ) {
      console.log('result', result)
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
    }
  }, [result.data]) // eslint-disable-line

  const submit = async (event) => {
    event.preventDefault()
    login({ variables: { username, password } })

  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password <input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm