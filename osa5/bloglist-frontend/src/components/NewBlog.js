import React, { useState } from 'react'
import blogService from '../services/blogs'



const NewBlog = ({ updateBlogs }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        console.log("submit")
        const blogObject = {
            title: title,
            author: author,
            url: url}
        blogService
          .create(blogObject)
          .then(returnedBlog => {
            updateBlogs()
            
        })
        
    }
    
    return (
    <div>
      <form onSubmit={addBlog}>
        <span>title:</span> <input value={title} onChange={(e => setTitle(e.target.value))}></input><br></br>
        <span>author:</span> <input value={author} onChange={(e => setAuthor(e.target.value))}></input><br></br>
        <span>url:</span> <input value={url} onChange={(e => setUrl(e.target.value))}></input><br></br>
        <input type="submit" value="Create"></input>
      </form>
    </div>  
  )
}

export default NewBlog