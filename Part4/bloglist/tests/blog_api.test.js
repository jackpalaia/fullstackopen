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
  const blogs = await api.get('/api/blogs')
  const blogsInDB = await helper.blogsInDB()
  expect(blogs.body.length).toEqual(blogsInDB.length)
})

afterAll(() => {
  mongoose.connection.close()
})