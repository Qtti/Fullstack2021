import React, { useEffect } from 'react'
import BlogList from './components/Blog'
import Notification from './components/Notification'
import NewBlog from './components/NewBlog'
import Login from './components/Login'
import blogService from './services/blogs'

import { initializeBlogs } from './reducers/blogReducer'
import { auth, logout } from './reducers/userReducer'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    console.log('store', user.name)
    dispatch(auth())

    updateBlogs()
  }, [])

  const updateBlogs = () => {
    blogService.getAll().then(blogs =>
    {
      blogs.sort(function(a, b) {
        return a.likes - b.likes
      })
      blogs.reverse()
      dispatch(initializeBlogs(blogs))
    }
    )
  }

  const userLogout = () => {
    window.localStorage.clear()
    dispatch(logout())
    dispatch(setNotification('User logged out'))
  }

  if (user.name === null) {
    return (
      <div>
        <Notification/>
        <h2>Log in to application</h2>
        <Login></Login>
      </div>
    )
  }

  return (
    <div>
      <Notification/>
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={userLogout}>Logout</button></p>
      <NewBlog/>
      <br></br>
      <BlogList/>
    </div>
  )
}


export default App