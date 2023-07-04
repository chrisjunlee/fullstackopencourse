import { useState, useEffect, useRef } from "react";
import './App.css'
import blogService from "./services/blogs"
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from "./components/Togglable";
import NewBlogForm from './components/NewBlogForm'
import Blogs from './components/Blogs'

import { useContext } from "react";
import NotifyContext from "./NotifyContext";
import Notification from "./components/Notification";
import { useQueries } from "react-query";
import axios from 'axios'


const App = () => {
  const USER_LOCALSTORAGE_KEY = "loggedBlogUser";
  // const blogFormRef = useRef(null);


  const testFunc = () => {
    return axios.get("http://localhost:3003/api/blogs").then((res) => res.data);
  };

  const results = useQueries({
    queries: [
      { queryKey: ["post", 1], queryFn: testFunc}
    ]
  });


  // const [postsQuery, usersQuery] = useQueries({
  //   queries: [
  //     {
  //       queryKey: ["posts"],
  //       queryFn: () =>
  //         axios
  //           .get("https://jsonplaceholder.typicode.com/posts")
  //           .then((res) => res.data),
  //     },

  //     {
  //       queryKey: ["users"],
  //       queryFn: () =>
  //         axios
  //           .get("https://jsonplaceholder.typicode.com/users")
  //           .then((res) => res.data),
  //     },
  //   ],
  // });

  // const [blogsQuery, userQuery] = useQueries({
  //   queries: [
  //     {
  //       queryKey: ["blogs"],
  //       queryFn: () =>
  //       axios
  //       .get("http://localhost:3003/api/blogs")
  //       .then((res) => res.data),
  //     },
  //     {
  //       queryKey: ["user"],
  //       queryFn:  () => {
  //         const userJSON = window.localStorage.getItem(USER_LOCALSTORAGE_KEY);
  //         if (userJSON) { return JSON.parse(userJSON)}
  //       }
  //     }
  //   ],
  // });


  return <div>hi</div>
}

//   // new blog usestates
//   const [newTitle, setNewTitle] = useState("");
//   const [newAuthor, setNewAuthor] = useState("");
//   const [newUrl, setNewUrl] = useState("");
  
//   // user management
//   const [user, setUser] = useState(null);
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
  
//   // notification
//   const [msgObj, dispatch] = useContext(NotifyContext);
  
//   if(blogsQuery.isLoading) return 'Loading Blogs'
//   if(userQuery.isLoading) return 'Loading User'
  
//   console.log('blogsQuery', blogsQuery.data)
//   console.log('userQuery', userQuery.data)

  
//   const setErrorMessage = (msg) => {
//     dispatch({ type: "SET_ERROR", payload: msg });
//   };

//   const setSuccessMessage = (msg) => {
//     dispatch({ type: "SET_SUCCESS", payload: msg });
//   };

//   const handleLogin = async (event) => {
//     event.preventDefault();
//     try {
//       const user = await loginService.login({ username, password });
//       setUser(user);
//       blogService.setToken(user.token);
//       setUsername("");
//       setPassword("");
//       window.localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(user));
//     } catch (ex) {
//       setErrorMessage("Wrong Credentials");
//       setTimeout(() => {
//         setErrorMessage(null);
//       }, 5000);
//     }
//     console.log("logging in with", username, password);
//   };

//   const handleLogout = (event) => {
//     event.preventDefault();
//     window.localStorage.removeItem(USER_LOCALSTORAGE_KEY);
//     setUser(null);
//     blogService.setToken("");
//   };

//   const handleBlogSave = async (event) => {
//     event.preventDefault();
//     // const blogObj = { title: newTitle, author: newAuthor, url: newUrl };

//     // blogService.setToken(user.token);
//     // const savedBlog = await blogService.create(blogObj);
//     // setBlogs(blogs.concat(savedBlog));
//     // setNewAuthor("");
//     // setNewTitle("");
//     // setNewUrl("");

//     // console.log("savedBlog", savedBlog);
//     // setSuccessMessage(`Saving: ${savedBlog.title}`);
//     // setTimeout(() => setSuccessMessage(null), 2000);

//     blogFormRef.current.toggleVisibility();
//   };

//   const handleDeleteBlog = async (blogId) => {
//     blogService.setToken(user.token);
//     await blogService.deleteById(blogId);
//     setSuccessMessage(`Deleting: blogID ${blogId}`);
//     setTimeout(() => setSuccessMessage(null), 3000);
//     // setBlogs(blogs.filter((blog) => blog.id !== blogId));
//   };

//   const handleLike = async (blogObj) => {
//     blogService.setToken(user.token);
//     const savedBlog = await blogService.like(blogObj);
//     // not using the response object since user isn't returned correctly
//     // setBlogs(
//     //   blogs.map((b) =>
//     //     b.id === savedBlog.id ? { ...b, likes: savedBlog.likes } : b
//     //   )
//     // );
//   };

//   const loginForm = () => {
//     return null
//     // return (
//     //   <LoginForm
//     //     username={username}
//     //     password={password}
//     //     handleUsernameChange={({ target }) => setUsername(target.value)}
//     //     handlePasswordChange={({ target }) => setPassword(target.value)}
//     //     handleSubmit={handleLogin}
//     //   />
//     // );
//   };

//   const blogsForm = () => {
//     if(blogsQuery.isLoading) {return null}

//     const blogs = blogsQuery.data
//     console.log('blogs', blogs)

//     return null

//   //   return (
//   //   <>
//   //     <div id="loggedinBanner" style={{ fontSize: "2em" }}>
//   //       {user.username} logged in <button onClick={handleLogout}>Logout</button>
//   //     </div>
//   //     <Blogs
//   //       blogs={blogs
//   //         .filter((blog) => blog.user.username == user.username)
//   //         .sort((a, b) => (a.likes < b.likes ? 1 : -1))}
//   //       handleLike={handleLike}
//   //       handleDeleteBlog={handleDeleteBlog}
//   //     />
//   //     <br />
//   //     {/* <Togglable
//   //       buttonLabel="Create"
//   //       buttonLabelCancel="Cancel"
//   //       ref={blogFormRef}
//   //     >
//   //       <NewBlogForm
//   //         title={newTitle}
//   //         author={newAuthor}
//   //         url={newUrl}
//   //         handleAuthorChange={({ target }) => setNewAuthor(target.value)}
//   //         handleTitleChange={({ target }) => setNewTitle(target.value)}
//   //         handleUrlChange={({ target }) => setNewUrl(target.value)}
//   //         handleSubmit={handleBlogSave}
//   //       />
//   //     </Togglable> */}
//   //   </>
//   // )
//     }

//   return (
//     <div>
//       <h1>Blogs</h1>
//       <Notification />
//       {console.log("user", user)}
//       {user == null ? loginForm() : blogsForm()}
//     </div>
//   );
// }
  
export default App