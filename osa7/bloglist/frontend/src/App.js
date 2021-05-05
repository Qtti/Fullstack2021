import React, { useEffect } from 'react'
import BlogList, { OneBlog } from './components/Blog'
import Notification from './components/Notification'
import NewBlog from './components/NewBlog'
import Login from './components/Login'
import Users from './components/Users'

import { auth } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'

import {
  BrowserRouter as Router,
  Switch, Route, Redirect, Link
} from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)


  useEffect(() => {
    dispatch(auth())
    dispatch(initializeBlogs())
  }, [])

  const padding = { padding: 5 }


  return (
    <div className="container">
      <Router>
        <Notification/>
        {user.username === null ?
          <Redirect to='/login' /> :
          <div>
            <Link style={padding} to='/blogs'>Blogs</Link>
            <Link style={padding} to='/users'>Users</Link>
            <Login></Login>
          </div>
        }
        <Switch>
          <Route path='/login'>
            {user.username === null ? <div></div>: <Redirect to='/blogs' />}
            <Login></Login>
          </Route>
          <Route path='/blogs'>
            <h2>Blogs</h2>
            <NewBlog/>
            <BlogList/>
          </Route>
          <Route path='/blog/:id'>
            <h2>Blog</h2>
            <OneBlog/>
          </Route>
          <Route path='/users'>
            <h2>Users</h2>
            <Users></Users>
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App