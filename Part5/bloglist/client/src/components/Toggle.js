import React, { useState } from 'react'

const Toggle = ({ label, children }) => {
  const [visibility, setVisibility] = useState(false)

  const toggleVisibility = () => { setVisibility(!visibility) }

  return (
    <div>
      <div style={{ display: visibility ? 'none' : '' }}>
        <button onClick={toggleVisibility}>{label}</button>
      </div>
      <div style={{ display: visibility ? '' : 'none' }}>
        {children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}

export default Toggle