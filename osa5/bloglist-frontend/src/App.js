import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import user from './services/user'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loggeduser, setLoggeduser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const userLogin = (event) => {
    event.preventDefault()
    user.login(username,password).then((data) => {
      console.log("data:", data)
      setLoggeduser(data.name)
    })
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
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}


export default App