import React, { useState } from 'react'
//import blogService from '../services/blogs'
//import { connect } from 'react-redux'
import { useSelector, useDispatch } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  console.log('prop', blogs)

  return (<div>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
  </div>)
}

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = {
    display: visible ? 'none' : '',
    border: '1px solid black',
    marginTop: '5px',
    marginBottom: '5px'
  }
  const showWhenVisible = {
    display: visible ? '' : 'none',
    border: '1px solid black',
    marginTop: '5px',
    marginBottom: '5px'
  }

  const deleteBlog = async (blog) => {
    if (window.confirm(`Do you really want to remove blog ${blog.title}?`)) {
      await dispatch(removeBlog(blog))
      dispatch(setNotification('Removed'))
    }
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <span onClick={() => setVisible(!visible)}>{blog.title}</span> {blog.author}
        <button id='setvisible-button' onClick={() => setVisible(true)}>View</button>
      </div>
      <div style={showWhenVisible}>
        <span onClick={() => setVisible(!visible)}>{blog.title}</span> {blog.author}<br></br>
        {blog.url}<br></br>
        {blog.likes}<button id='addonelike-button' onClick={() => dispatch(likeBlog(blog))}>Like</button><br></br>
        {blog.user && blog.user.name}<br></br>
        <button id='removeblog-button' onClick={() => deleteBlog(blog)}>Remove</button><br></br>
        <button onClick={() => setVisible(false)}>Hide</button>
      </div>
    </div>
  )}

export default BlogList