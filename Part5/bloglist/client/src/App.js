import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Login from './components/Login'
import CreateBlog from './components/CreateBlog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (e) {
      console.log('wrong credentials')
    }
  }

  const handleLogout = async event => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const handleCreateBlog = async event => {
    event.preventDefault()
    const newBlog = await blogService.create({ title, author, url })
    setBlogs(blogs.concat(newBlog))
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      
      {user === null
        ? <Login 
          submit={handleLogin}
          username={username} pass={password}
          usernameChange={({target}) => setUsername(target.value)}
          passChange={({target}) => setPassword(target.value)}
        />
        : <div>
            <CreateBlog
              submit={handleCreateBlog}
              title={title} author={author} url={url}
              titleChange={({target}) => setTitle(target.value)}
              authorChange={({target}) => setAuthor(target.value)}
              urlChange={({target}) => setUrl(target.value)}
            />
            {user.name} logged in <button onClick={handleLogout}>log out</button>
            <h2>blogs</h2>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
          </div>
      }
    
    </div>
  )
}

export default App