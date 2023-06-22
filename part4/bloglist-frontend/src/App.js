import { useState, useEffect, useRef } from "react";
import Notification from "./components/Notification";
import './App.css'
import blogService from "./services/blogs"
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from "./components/Togglable";
import NewBlogForm from './components/NewBlogForm'

const App = () => {
  const USER_LOCALSTORAGE_KEY = "loggedBlogUser"
  const [blogs, setBlogs] = useState([]) 
  const blogFormRef = useRef(null)
  
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

    blogFormRef.current.toggleVisibility()
  }

  const handleDeleteBlog = async (blogId) => {
    blogService.setToken(user.token)
    await blogService.deleteById(blogId)
    setBlogs(blogs.filter(blog => blog.id !== blogId))
  }

  const handleLike = async (blogObj) => {
    blogService.setToken(user.token)
    const savedBlog = await blogService.like(blogObj)
    console.log('blogs', blogs)
    console.log('savedBlog', savedBlog)
    // not using the response object since user isn't returned correctly
    setBlogs(blogs.map(b => b.id === savedBlog.id? {...b, likes: savedBlog.likes} : b ))
  }

  const loginForm = () => {
    return (
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    )}
  

  const blogsForm = () => (
    <>
      <Blogs blogs={blogs.filter(blog => blog.user.username == user.username).sort((a,b) => a.likes < b.likes? 1 : -1)} user={user}/>
      <br/>
      <Togglable buttonLabel="Create" buttonLabelCancel="Cancel" ref={blogFormRef}>
        <NewBlogForm title={newTitle} author={newAuthor} url={newUrl} 
          handleAuthorChange={({ target }) => setNewAuthor(target.value)}
          handleTitleChange={({ target }) => setNewTitle(target.value)}
          handleUrlChange={({ target }) => setNewUrl(target.value)} 
          handleSubmit={handleBlogSave}/>
      </Togglable>
    </>
  )

  const Blogs = ({ blogs, user }) =>{
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    return (
      <>
        <div style={{'fontSize':'2em'}}>{user.username} logged in <button onClick={handleLogout}>Logout</button></div>
        {blogs.map(b =>
          <div key={b.id} style={blogStyle}>
          {b.title} :: {b.author}
          <button onClick={() => handleDeleteBlog(b.id)}>DELETE</button>
          <Togglable buttonLabel="View" buttonLabelCancel="Hide">
          <div>{b.url} <br/>
          {b.likes} <button onClick={() => handleLike(b)}>Like</button><br/>
          {b.user.username}</div>
          </Togglable>
          </div>
        )}
      </>
    )
  }

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