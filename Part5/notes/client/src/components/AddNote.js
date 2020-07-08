import React, { useState, createContext } from 'react'

const AddNote = ({ createNote }) => {
  const [newNote, setNewNote] = useState('')

  const addNote = event => {
    event.preventDefault()
    createNote({
      content: newNote,
      important: Math.random() > .5
    })
    setNewNote('')
  }

  return (
    <div>
      <h2>add new note</h2>

      <form onSubmit={addNote}>
        <input value={newNote} onChange={({target}) => setNewNote(target.value)} />
        <button type='submit'>add</button>
      </form>
    </div>
  )
}

export default AddNote