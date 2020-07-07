import React from 'react'

const CreateBlog = ({ submit, title, titleChange, author, authorChange, url, urlChange }) => (
  <div>
    <h2>Create new</h2>
    <form onSubmit={submit}>
      <div>title<input value={title} onChange={titleChange} /></div>
      <div>author<input value={author} onChange={authorChange} /></div>
      <div>url<input value={url} onChange={urlChange} /></div>
      <button type='submit'>create</button>
    </form>
  </div>
)

export default CreateBlog