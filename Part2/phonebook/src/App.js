import React, { useState } from 'react'
import AddNew from './components/AddNew'
import Entries from './components/Entries'
import Search from './components/Search'

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState('')

  const handleFormSubmit = e => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber
    };
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`);
      return;
    }
    setPersons(persons.concat(newPerson));
    setNewName('');
    setNewNumber('');
  }

  const handleNameChange = e => {
    setNewName(e.target.value);
  }

  const handleNumberChange = e => {
    setNewNumber(e.target.value);
  }

  const handleSearchChange = e => {
    setSearch(e.target.value);
  }

  const searchPersons = () => {
    if (search === '') {
      return persons;
    }
    return [...persons].filter(person => person.name.toLowerCase().includes(search));
  }
//
  return (
    <div>
      <h1>Phonebook</h1>
      <Search value={search} onChange={handleSearchChange} />
      <AddNew onSubmit={handleFormSubmit} nameValue={newName} nameChange={handleNameChange} numberValue={newNumber} numberChange={handleNumberChange}/>
      <Entries persons={searchPersons()} />
    </div>
  )
}

export default App