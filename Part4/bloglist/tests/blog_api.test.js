const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const mongoose = require('mongoose')
const helper = require('./test_helper')
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
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDB()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

  const content = blogsAtEnd.map(b => b.content)
  expect(content).toContain(newBlog.content)
})

test('likes missing from request', async () => {
  const newBlog = {
    title: 'test blog',
    author: 'test author'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
  
  const blogsAtEnd = await Blog.find({})
  expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0)
})

test('title and url missing, 400 bad request', async () => {
  const newBlog = {
    likes: 4
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('delete blog', async () => {
  const blogsAtStart = await helper.blogsInDB()
  const blogToDelete = blogsAtStart[2]

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

  const blogsAtEnd = await helper.blogsInDB()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1)

  expect(blogsAtEnd).not.toContain(blogToDelete)
})

test('update blog', async () => {
  const startingBlogs = await helper.blogsInDB()
  const newBlog = {
    title: 'updated blog',
    author: 'updated author'
  }
  const blogToUpdate = startingBlogs[2]

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const endingBlogs = await helper.blogsInDB()
  expect(endingBlogs[2].title).toBe('updated blog')
  expect(endingBlogs).toHaveLength(startingBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})