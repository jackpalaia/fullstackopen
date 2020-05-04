import React from 'react'

const Form = ({onSubmit, nameValue, nameChange, numberValue, numberChange}) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          name: <input value={nameValue} onChange={nameChange} />
        </div>
        <div>
          number: <input value={numberValue} onChange={numberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default Form