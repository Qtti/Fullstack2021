import React from 'react'
//import blogService from '../services/blogs'
//import { connect } from 'react-redux'
import { useSelector, useDispatch } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

import {
  useParams, Link
} from 'react-router-dom'

const BlogList = () => {

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  console.log('prop', blogs)

  if(user.username) {
    return (<div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>)
  }
  else {
    return (<div></div>)
  }
}

export const OneBlog = () => {

  const dispatch = useDispatch()
  const id = useParams().id
  const blogs = useSelector(state => state.blogs)
  const blog = blogs.find(n => n.id === id)
  console.log('blgo', blog)
  if (!blog) {
    return null
  }

  const deleteBlog = async (blog) => {
    if (window.confirm(`Do you really want to remove blog ${blog.title}?`)) {
      await dispatch(removeBlog(blog))
      dispatch(setNotification('Removed'))
    }
  }

  return (
    <div>
      <span>{blog.title}</span> {blog.author}<br></br>
      {blog.url}<br></br>
      {blog.likes}<button id='addonelike-button' onClick={() => dispatch(likeBlog(blog))}>Like</button><br></br>
      {blog.user && blog.user.name}<br></br>
      <button id='removeblog-button' onClick={() => deleteBlog(blog)}>Remove</button><br></br>
    </div>)
}

export const Blog = ({ blog }) => {
  //const dispatch = useDispatch()
  //const [visible, setVisible] = useState(false)

  const style = {
    border: '1px solid black',
    marginTop: '5px',
    marginBottom: '5px'
  }
  return (
    <div>
      <div style={style}>
        <Link to={`/blog/${blog.id}`}><span>{blog.title}</span> {blog.author}</Link>
      </div>
    </div>
  )}

export default BlogList