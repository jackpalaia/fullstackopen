import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (e) {
      console.log('wrong credentials')
    }
  }

  return (
    <div>
      {user === null ?
        <Login login={handleLogin} u={username} uChange={({ target }) => setUsername(target.value)} p={password} pChange={({ target }) => setPassword(target.value)} /> :
        <div>
          <p>{user.name} logged in</p>
          <Blogs blogs={blogs} />
        </div>
      }
    </div>
  )
}

export default App