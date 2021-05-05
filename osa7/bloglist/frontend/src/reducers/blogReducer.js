import blogService from '../services/blogs'

export const createBlog = (content) => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const likeBlog = (blog) => {
  console.log('likeblofg', blog)
  return async dispatch => {
    const changedBlog = { ...blog, likes: blog.likes + 1 }
    await blogService.update(changedBlog)
    console.log('changedblofg', changedBlog)
    dispatch({
      type: 'LIKE',
      data: changedBlog
    })
  }
}

export const removeBlog = (blog) => {
  return async dispatch => {
    await blogService.remove(blog.id)
    dispatch({
      type: 'REMOVE',
      data: blog.id
    })
  }
}

export const initializeBlogs = (blogs) => {
  return {
    type: 'INIT_BLOGS',
    data: blogs,
  }
}

const blogReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type) {
  case 'LIKE': {
    console.log('LIKE')
    const id = action.data.id
    return state.map(blog =>
      blog.id !== id ? blog : action.data
    )}
  case 'NEW_BLOG':
    console.log('new', action.data)
    return [...state, action.data]
  case 'REMOVE': {
    const newstate = state.filter((blog) => blog.id !== action.data )
    return newstate
  }
  case 'INIT_BLOGS':
    return action.data
  default:
    return state
  }
}

export default blogReducer