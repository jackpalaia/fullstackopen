import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'
import Notification from './components/Notification'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true);
  const [nMessage, setNMessage] = useState(null)
  const [nType, setNType] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(response => {
        setNotes(response)
      })
  }, [])

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < .5,
    }
    noteService
      .create(noteObject)
      .then(response => {
        setNotes(notes.concat(response))
        setNewNote('')
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
      .catch(error => {
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

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={nMessage} type={nType} />
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
      </button>
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>
        )}
      </ul>
      <form onSubmit={addNote}>
        <input 
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type='submit'>save</button>
      </form>
  </div>
  )
}

export default App