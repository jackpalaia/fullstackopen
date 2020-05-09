import React, { useState, useEffect } from 'react'
import Search from './components/Search'
import Countries from './components/Countries'
import axios from 'axios'

const App = () => {
  const [search, setSearch] = useState('')
  const [countryList, setCountryList] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountryList(response.data)
      })
  }, [])

  console.log(countryList)

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
  }

  const searchCountryList = () => {
    if (search === '') {
      return countryList
    }
    return [...countryList].filter(country => country.name.toLowerCase().includes(search))
  }

  return (
    <>
      <Search onChange={handleSearchChange} value={search} />
      <Countries countryList={searchCountryList()} />
    </>
  )
}

export default App;
