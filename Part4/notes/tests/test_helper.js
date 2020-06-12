const Note = require('../models/note')

const initialNotes = [
  {
    content: 'HTML is easy',
    important: false
  },
  {
    content: 'Browser can execute only Javascript',
    important: true
  }
]

const nonExistingID = async () => {
  const note = new Note({ content: 'willremovethissoon' })
  await note.save()
  await note.remove()
  return note._id.toString()
}

const notesInDB = async () => {
  const notes = await Note.find({})
  return notes.map(note => note.toJSON())
}

module.exports = { initialNotes, nonExistingID, notesInDB }