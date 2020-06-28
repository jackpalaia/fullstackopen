import React from 'react'

const Entry = ({ person, deleteEntry }) => {
  return (
    <li>
      {person.name}: {person.number} {}
      <button onClick={() => deleteEntry(person.id)}>delete</button>
    </li>
  )
  // <li>{person.name}: {person.number}</li>
}

export default Entry