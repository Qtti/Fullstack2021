const _ = require("lodash"); 

const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
  
  const total = blogs.reduce((sum, blog) => sum + blog.likes, 0)
  
  return total
}

const favoriteBlog = (blogs) => {

  const sort = blogs.sort(function (a, b) {
    return a.likes - b.likes
  })
  
  let max = sort[sort.length - 1]
  if(max) {
    delete max._id
    delete max.__v
    delete max.url
  }
  else {
    max = []
  }

  return max
}

const mostBlogs = (blogs) => {
  const blogswriter = _.map(_.countBy(blogs, "author"), (val, key) => ({ author: key, blogs: val }))

  const sort = blogswriter.sort(function (a, b) {
    return a.blogs - b.blogs
  })
  let max = sort[sort.length - 1] ?? []

  return max
}

  
module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs
}