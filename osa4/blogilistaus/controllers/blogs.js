const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
                .populate('user')
  if (blog) {
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
  }
})

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
                  .populate('user')
  response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
  if (!request.body.title || !request.body.url) {
    return response.status(400).json({ error: 'title or url missing' })
  }
  const blog = new Blog(request.body)
  const result = await blog.save()
  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', (request, response, next) => {

  Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog.toJSON())
    })
    .catch(error => next(error))
})

  module.exports = blogsRouter