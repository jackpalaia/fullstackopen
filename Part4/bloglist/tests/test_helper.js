const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'blog1',
    author: 'jack palaia',
    url: 'youtube.com',
    likes: 1
  },
  {
    title: 'blog2',
    author: 'kate palaia',
    url: 'facebook.com',
    likes: 2
  },
  {
    title: 'blog3',
    author: 'will palaia',
    url: 'google.com',
    likes: 3
  }
]

const nonExistingID = async () => {
  const blog = new Blog({ content: 'will be removed soon' })
  await blog.save()
  await blog.remove()
  return blog._id.toString()
}

const blogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = { initialBlogs, nonExistingID, blogsInDB }