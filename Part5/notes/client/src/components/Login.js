import React from 'react'

const Login = ({ submitHandler, username, password, usernameChange, passwordChange }) => (
  <div>
    <h2>login</h2>
    <form onSubmit={submitHandler}>
      <div>username<input value={username} onChange={usernameChange}></input></div>
      <div>password<input value={password} onChange={passwordChange}></input></div>
      <button type='submit'>login</button>
    </form>
  </div>
)

export default Login