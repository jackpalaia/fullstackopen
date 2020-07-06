import React from 'react'

const AddNote = ({ submitHandler, text, textChange }) => (
  <form onSubmit={submitHandler}>
    <input value={text} onChange={textChange} />
    <button type='submit'>save</button>
  </form>
)

export default AddNote