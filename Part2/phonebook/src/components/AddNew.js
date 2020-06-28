import React from 'react'

const AddNew = ({onSubmit, nameValue, nameChange, numberValue, numberChange}) => {
  return (
    <div>
      <h2>Add New Entry</h2>
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

export default AddNew