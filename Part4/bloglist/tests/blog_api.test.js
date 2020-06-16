const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const mongoose = require('mongoose')
const helper = require('./test_helper')
const logger = require('../utils/logger')
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogs = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogs.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('get all blogs', async () => {
  const blogs = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  const blogsInDB = await helper.blogsInDB()
  expect(blogs.body.length).toEqual(blogsInDB.length)
})

test('verify id', async () => {
  const blogs = await api
    .get('/api/blogs')
  blogs.body.forEach(b => {
    expect(b.id).toBeDefined()
    expect(b._id).not.toBeDefined()
  })
})

test('new blog post', async () => {
  const newBlog = {
    title: 'blog4',
    author: 'dddddddd',
    url: 'twitter.com',
    likes: 4
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDB()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

  const content = blogsAtEnd.map(b => b.content)
  expect(content).toContain(newBlog.content)
})

test('likes missing from request', async () => {
  const newBlog = {
    content: 'test blog',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
  
  const blogsAtEnd = await Blog.find({})
  expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0)
})

afterAll(() => {
  mongoose.connection.close()
})