const dummy = () => {
  return 1
}

const totalLikes = blogs => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = blogs => {
  if (blogs.length === 0) {
    return null
  }
  let maxLikes = 0
  let favBlog = blogs[0]
  blogs.forEach(blog => {
    if (blog.likes > maxLikes) {
      maxLikes = blog.likes
      favBlog = blog
    }
  })
  return favBlog
}

const mostBlogs = blogs => {
  if (blogs.length === 0) {
    return null
  }
  let authors = []
  blogs.forEach(blog => {
    if (authors.some(author => ))
  })
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs
}