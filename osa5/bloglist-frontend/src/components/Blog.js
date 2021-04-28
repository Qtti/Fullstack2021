import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, updateBlogs, showNotification }) => {
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

  const addOneLike = (blogObject) => {
    console.log(blogObject)
    blogObject.likes = blogObject.likes + 1
    //event.preventDefault()
    console.log('update')

    blogService
      .update(blogObject)
      .then(() => {
        updateBlogs()
        showNotification('Updated new Blog')
      })
  }

  const removeBlog = (blog) => {
    console.log(blog.id)
    console.log('delete')
    if (window.confirm(`Do you really want to remove blog ${blog.title}?`)) {
      blogService
        .remove(blog.id)
        .then(() => {
          updateBlogs()
          showNotification('Updated new Blog')
        })
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
        {blog.likes}<button id='addonelike-button' onClick={() => addOneLike(blog)}>Like</button><br></br>
        {blog.user && blog.user.name}<br></br>
        <button id='removeblog-button' onClick={() => removeBlog(blog)}>Remove</button><br></br>
        <button onClick={() => setVisible(false)}>Hide</button>
      </div>
    </div>
  )}

export default Blog