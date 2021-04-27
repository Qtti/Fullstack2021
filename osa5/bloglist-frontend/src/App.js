import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import NewBlog from './components/NewBlog'
import blogService from './services/blogs'
import user from './services/user'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loggeduser, setLoggeduser] = useState(null)

  useEffect(() => {
    updateBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setLoggeduser(user)
    }
  }, [])

  const updateBlogs = () => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }

  const userLogin = (event) => {
    event.preventDefault()
    user.login(username,password).then((user) => {
      //console.log("data:", user)
      
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      setLoggeduser(user)
      setUsername('')
      setPassword('')
    })
  }

  const userLogout = () => {
    setLoggeduser(null)
    user.logout()
  }

  if (loggeduser === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={userLogin}>
          Username: <input value={username} onChange={e => setUsername(e.target.value)}></input><br></br>
          Password: <input value={password} onChange={e => setPassword(e.target.value)} type='password'></input><br></br>
          <input type = 'submit'></input>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{loggeduser.name} logged in <button onClick={userLogout}>Logout</button></p>
      <NewBlog updateBlogs={ updateBlogs }/>
      <br></br>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}


export default App