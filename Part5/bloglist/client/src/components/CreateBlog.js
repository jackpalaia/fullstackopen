import React, { useState } from 'react'

const CreateBlog = ({ submit }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  
  const addBlog = event => {
    event.preventDefault()
    submit({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <div>title<input value={title} onChange={({ target }) => setTitle(target.value)}/></div>
        <div>author<input value={author} onChange={({ target }) => setAuthor(target.value)}/></div>
        <div>url<input value={url} onChange={({ target }) => setUrl(target.value)}/></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default CreateBlog