import React from 'react'
import login from '../services/login'

const Login = ({ submitHandler, username, password, usernameChange, passwordChange }) => (
  <form onSubmit={submitHandler}>
    <div>username<input value={username} onChange={usernameChange}></input></div>
    <div>password<input value={password} onChange={passwordChange}></input></div>
    <button type='submit'>login</button>
  </form>
)

export default Login