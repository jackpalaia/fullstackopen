import React from 'react'
import Entry from './Entry'

const Entries = ({persons, deleteEntry }) => {
  return (
    <div>
      <h2>Numbers</h2>
      <ul style={{
        listStyle: 'none',
        margin: 0,
        padding: 0
      }}>
        {persons.map(person => <Entry key={person.name} person={person} deleteEntry={deleteEntry} />)}
      </ul>
    </div>
  )
}

export default Entries