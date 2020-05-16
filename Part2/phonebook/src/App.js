import React, { useState, useEffect } from 'react'
import AddNew from './components/AddNew'
import Entries from './components/Entries'
import Search from './components/Search'
import Notification from './components/Notification'
import phonebookService from './services/services'
import './index.css'

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState('')
  const [ notifMsg, setNotifMsg ] = useState(null)
  const [ notifType, setNotifType ] = useState('')

  useEffect(() => {
    phonebookService
      .getAll()
      .then(persons => setPersons(persons))
  }, [])

  const handleFormSubmit = e => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber
    };
    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const id = persons.find(p => p.name === newName).id
        phonebookService
          .update(id, newPerson)
          .catch(() => {
            setNotifMsg(`${newName} has already been removed from server`)
            setNotifType('error')
          })
          .then(() => phonebookService.getAll())
          .then(people => setPersons(people))
        setNotifMsg(`updated ${newName}'s number to ${newNumber}`)
        setNotifType('success')
        setTimeout(() => setNotifMsg(null), 3000)
      }
      return;
    }
    phonebookService
      .create(newPerson)
      .then(person => setPersons(persons.concat(person)))
    setNewName('')
    setNewNumber('')
    setNotifMsg(`${newName} added to phonebook`)
    setNotifType('success')
    setTimeout(() => setNotifMsg(null), 3000)
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

  const handleDelete = id => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      phonebookService
      .deleteEntry(id)
      .then(() => setPersons(persons.filter(p => p !== person)))
      setNotifMsg(`${person.name} deleted from phonebook`)
      setNotifType('success')
      setTimeout(() => setNotifMsg(null), 3000)
    }
  }

  const searchPersons = () => {
    if (search === '') {
      return persons;
    }
    return [...persons].filter(person => person.name.toLowerCase().includes(search));
  }
  
  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notifMsg} type={notifType} />
      <Search value={search} onChange={handleSearchChange} />
      <AddNew onSubmit={handleFormSubmit} nameValue={newName} nameChange={handleNameChange} numberValue={newNumber} numberChange={handleNumberChange}/>
      <Entries persons={searchPersons()} deleteEntry={handleDelete} />
    </div>
  )
}

export default App