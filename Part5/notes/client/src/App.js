import React, { useState, useEffect, useRef } from 'react'
import Note from './components/Note'
import noteService from './services/notes'
import Notification from './components/Notification'
import loginService from './services/login'
import Login from './components/Login'
import AddNote from './components/AddNote'
import Togglable from './components/Togglable'

const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [nMessage, setNMessage] = useState(null)
  const [nType, setNType] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(response => {
        setNotes(response)
      })
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser !== null) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const addNote = note => {
    noteFormRef.current.toggleVisibility()
    noteService
      .create(note)
      .then(response => {
        setNotes(notes.concat(response))
        setNType('good')
        setNMessage(`note '${response.content}' added`)
        setTimeout(() => {
          setNMessage(null)
        }, 3000)
      })
  }

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(response => {
        setNotes(notes.map(note => note.id === id ? response : note))
        setNType('good')
        setNMessage(`note '${response.content}' importance changed to ${response.important}`)
        setTimeout(() => {
          setNMessage(null)
        }, 3000)
      })
      .catch(() => {
        setNType('bad')
        setNMessage(
          `Note '${note.content}' was already removed from the server`
        )
        setTimeout(() => {
          setNMessage(null)
        }, 3000)
      })
    setNotes(notes.filter(n => n.id !== id))
  }

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (e) {
      setNType('bad')
      setNMessage('wrong credentials')
      setTimeout(() => {
        setNMessage(null)
      }, 3000)
    }
  }

  const loginForm = () => (
    <Togglable buttonLabel='login'>
      <Login
        username={username}
        password={password}
        usernameChange={({ target }) => setUsername(target.value)}
        passwordChange={({ target }) => setPassword(target.value)}
        submitHandler={handleLogin}
      />
    </Togglable>
  )

  const noteFormRef = useRef()

  const noteForm = () => (
    <Togglable buttonLabel="new note" ref={noteFormRef}>
      <AddNote createNote={addNote} />
    </Togglable>
  )

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={nMessage} type={nType} />

      {user === null
        ? loginForm()
        : <div><p>{user.name} logged in</p>{noteForm()}</div>
      }
      
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
      </button>
      <ul>
        {notes.map(note =>
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>
        )}
      </ul>
    </div>
  )
}

export default App