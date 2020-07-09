import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Login from './components/Login'
import CreateBlog from './components/CreateBlog'
import Notification from './components/Notification'
import Toggle from './components/Toggle'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [nMessage, setNMessage] = useState('')

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
      setNMessage('wrong credentials')
      setTimeout(() => { setNMessage('') }, 3000)
    }
  }

  const handleLogout = async event => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    setNMessage('successfully logged out')
    setTimeout(() => { setNMessage('') }, 3000)
    setUser(null)
  }

  const handleCreateBlog = async blog => {
    blogFormRef.current.toggleVisibility()
    const newBlog = await blogService.create(blog)
    setNMessage(`${newBlog.title} added`)
    setTimeout(() => { setNMessage('') }, 3000)
    setBlogs(blogs.concat(newBlog))
  }

  const handleLike = async id => {
    const blog = blogs.find(curr => curr.id === id)
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    setBlogs(blogs.map(blog => blog.id === id ? updatedBlog : blog))
    await blogService.update(id, updatedBlog)
  }

  const handleDelete = async blog => {
    setBlogs(blogs.filter(curr => curr !== blog))
    await blogService.remove(blog.id)
  }

  const loginForm = () => (
    <Login
      submit={handleLogin}
      username={username} pass={password}
      usernameChange={({ target }) => setUsername(target.value)}
      passChange={({ target }) => setPassword(target.value)}
    />
  )

  const blogFormRef = useRef()
  const blogForm = () => (
    <Toggle label='create blog' ref={blogFormRef}>
      <CreateBlog submit={handleCreateBlog} />
    </Toggle>
  )

  return (
    <div>

      {user !== null
        ? <div>{user.name} logged in <button onClick={handleLogout}>log out</button></div>
        : null
      }

      <Notification message={nMessage} />

      {user === null
        ? loginForm()
        : <div>
          {blogForm()}
          <h2>blogs</h2>

          {(blogs.sort((a, b) => b.likes - a.likes)).map(blog =>
            <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete}/>
          )}
        </div>
      }
    
    </div>
  )
}

export default App