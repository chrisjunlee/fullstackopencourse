import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { useApolloClient } from '@apollo/client'

const App = () => {
  const [page, setPage] = useState('login')
  const [errorMessage, setErrorMessage] = useState(null);

  // user login management
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  const MONGODB_URI = process.env.MONGODB_URI;
  console.log('MONGODB_URI', MONGODB_URI)

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <div style={{visibility: page !== 'login'? "visible" : "hidden"}} >
        <Notification message={errorMessage}/>
        <button onClick={logout}>logout</button>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>
      <LoginForm show={page === "login"} setToken={setToken} setPage={setPage} setError={setErrorMessage}/>
      <Authors show={page === "authors"} />
      <Books show={page === "books"} />
      <NewBook show={page === "add"} />
    </div>
  );
}

export default App