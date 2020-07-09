import React, { useState, useImperativeHandle } from 'react'

const Toggle = React.forwardRef(({ label, children, }, ref) => {
  const [visibility, setVisibility] = useState(false)

  const toggleVisibility = () => { setVisibility(!visibility) }

  useImperativeHandle(ref, () => (
    { toggleVisibility }
  ))

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
})

Toggle.displayName = 'Toggle'

export default Toggle