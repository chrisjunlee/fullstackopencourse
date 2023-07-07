import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useApolloClient } from '@apollo/client'

const App = () => {
  const [page, setPage] = useState('authors')
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

  // login
  // if (!token) {
  //   return (
  //     <div>
  //       <h2>Login</h2>
  //       <div>{errorMessage}</div>
  //       <LoginForm setToken={setToken} setError={setErrorMessage}/>
  //     </div>
  //   );
  // }

  return (
    <div>
      <div>
        <button onClick={logout}>logout</button>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />
    </div>
  );
}

export default App