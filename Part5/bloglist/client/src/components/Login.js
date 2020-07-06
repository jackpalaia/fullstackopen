import React from 'react'

const Login = ({ submit, username, usernameChange, pass, passChange }) => (
  <div>
    <h2>login</h2>
    <form onSubmit={submit}>
      <div>username<input value={username} onChange={usernameChange} /></div>
      <div>password<input value={pass} onChange={passChange} /></div>
      <button type='submit'>login</button>
    </form>
  </div>
)

export default Login