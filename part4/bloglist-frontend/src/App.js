import { useState, useEffect } from "react";
import Notification from "./components/Notification";
import './App.css'
import blogService from "./services/blogs"
import loginService from './services/login'

const App = () => {
  const USER_LOCALSTORAGE_KEY = "loggedBlogUser"
  const [blogs, setBlogs] = useState([]) 
  
  // new blog usestates
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  
  // user management
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  
  // diagnostics/messages
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    blogService
      .getAll().then(initialblogs => {setBlogs(initialblogs)})
    }, [blogs.length])

    // user persistence
    useEffect(() => {
      const userJSON = window.localStorage.getItem(USER_LOCALSTORAGE_KEY)

      if(userJSON) {
        const user = JSON.parse(userJSON)
        setUser(user)
      }
    }, [])


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({username, password})
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      window.localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(user))
    } catch(ex) {
      setErrorMessage('Wrong Credentials')
      setTimeout(() => {setErrorMessage(null)}, 5000)
    }
    console.log('logging in with', username, password)
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem(USER_LOCALSTORAGE_KEY)
    setUser(null)
    blogService.setToken('')
  }

  const handleBlogSave = async (event) => {
    event.preventDefault()
    const blogObj = {title: newTitle, author: newAuthor, url: newUrl}

    blogService.setToken(user.token)

    const savedBlog = await blogService.create(blogObj)
    setBlogs(blogs.concat(savedBlog))
    setNewAuthor('')
    setNewTitle('')
    setNewUrl('')
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        Username: 
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password: 
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  )

  const blogsForm = () => (
    <>
    <Blogs blogs={blogs.filter(blog => blog.user.username == user.username)} user={user}/>
    {/* NewBlog is defined here instead of separate component to prevent input focus loss bug: 
    https://stackoverflow.com/questions/59715158/react-hooks-input-loses-focus-when-1-character-is-typed-in */}
      <form>
        <div>Title: <input value={newTitle} onChange={({ target }) => setNewTitle(target.value)} /></div>
        <div>Author: <input value={newAuthor} onChange={({ target }) => setNewAuthor(target.value)} /></div>
        <div>Url: <input value={newUrl} onChange={({ target }) => setNewUrl(target.value)} /></div>
        <div><button type="submit" onClick={handleBlogSave}>add</button></div>
      </form>
    </>
  )

  const Blogs = ({ blogs, user }) =>
    <>
      <div style={{'font-size':'2em'}}>{user.username} logged in <button onClick={handleLogout}>Logout</button></div>
      <table><tbody>
        {blogs.map(b =>
          <tr>
            <td>Title: {b.title}</td>
            <td>Author: {b.author}</td>
          </tr>)}
      </tbody></table>
      <div>

      </div>
    </>

  return (
    <div>
      <h1>Blogs</h1>
      <NotifyError message={errorMessage} />
      <NotifySuccess message={successMessage} />
      {user == null? loginForm() : blogsForm()}
    </div>
  )
}

const NotifyError = ({ message }) => {
  if (message === null) { return null }
  return (<div className="error">{message}</div>)
}

const NotifySuccess = ({ message }) => {
  if (message === null) { return null }
  return (<div className="success">{message}</div>)
}
  
export default App