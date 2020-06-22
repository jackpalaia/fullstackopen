const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.send(blogs.map(b => b.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const token = request.token
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await newBlog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (req, res) => {
  const token = req.token
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const blog = await Blog.findById(req.params.id)
  if (blog.user.toString() !== user.id.toString()) {
    return res.status(401).json({ error: 'only the creator can delete blogs' })
  }

  await blog.remove()
  user.blogs = user.blogs.filter(b => b.id.toString() !== req.params.id.toString())
  await user.save()
  res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.send(updatedBlog.toJSON())
})

module.exports = blogsRouter