const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.send(blogs.map(b => b.toJSON()))
})

blogsRouter.post('/', (request, response) => {
  const body = request.body
  const blog = new Blog({
    content: body.content,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  })
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = blogsRouter