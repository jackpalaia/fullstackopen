import React, { useState } from 'react'

const Blog = ({ blog, handleLike }) => {
  const [expanded, setExpanded] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleExpanded = () => setExpanded(!expanded)

  const likeHandler = event => {
    event.preventDefault()
    handleLike(blog.id)
  }

  return (
    <div style={blogStyle}>
      { expanded
        ?
        <div>
          <div>
            {blog.title}
            <button onClick={toggleExpanded}>hide</button>
          </div>
          <div>{blog.url}</div>
          <div>
            likes: {blog.likes}
            <button onClick={likeHandler}>like</button>
          </div>
          <div>{blog.author}</div>
        </div>
        :
        <div>
          {blog.title} {blog.author} { }
          <button onClick={toggleExpanded}>view</button>
        </div>
      }
    </div>
  )
}

export default Blog
