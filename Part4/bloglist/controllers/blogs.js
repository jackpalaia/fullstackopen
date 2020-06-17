const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.send(blogs.map(b => b.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const newBlog = new Blog({
    content: body.content,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  })
  
  const savedBlog = await newBlog.save()
  response.json(savedBlog.toJSON())
})

module.exports = blogsRouter