import React, { useState } from 'react'
import blogService from '../services/blogs'



const NewBlog = ({ updateBlogs, showNotification }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const addBlog = (event) => {
    event.preventDefault()
    console.log('submit')
    const blogObject = {
      title: title,
      author: author,
      url: url }
    blogService
      .create(blogObject)
      .then(() => {
        updateBlogs()
        showNotification('Created new Blog')
        setVisible(false)
      })

  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => setVisible(!visible)}>Add blog</button>
      </div>
      <div style={showWhenVisible}>
        <form onSubmit={addBlog}>
          <span>title:</span> <input value={title} onChange={(e => setTitle(e.target.value))}></input><br></br>
          <span>author:</span> <input value={author} onChange={(e => setAuthor(e.target.value))}></input><br></br>
          <span>url:</span> <input value={url} onChange={(e => setUrl(e.target.value))}></input><br></br>
          <input type="submit" value="Create"></input>
        </form>
        <button onClick={() => setVisible(false)}>Cancel</button>
      </div>
    </div>
  )
}

export default NewBlog