const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.send(blogs.map(b => b.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  const newBlog = new Blog(request.body)
  const savedBlog = await newBlog.save()
  response.json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id)
  res.sendStatus(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.send(updatedBlog.toJSON())
})

module.exports = blogsRouter