import React from 'react'

const Login = ({ login, u, uChange, p, pChange }) => (
  <div>
    <h2>Log In</h2>
    <form onSubmit={login}>
      <div>
        username
        <input type="text" name="Username" value={u} onChange={uChange}/>
      </div>
      <div>
        password
        <input type="text" name="Password" value={p} onChange={pChange}/>
      </div>
      <button type="submit">login</button>
    </form>
  </div>
)

export default Login