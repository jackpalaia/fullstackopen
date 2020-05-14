import React from 'react'
import Country from './Country'

const Countries = ({ countryList, weatherData }) => {
  const length = countryList.length;
  if (length > 10) {
    return ( <p>Too many matches, specificy another filter</p> )
  } else if (length > 1){
    return (
      <ul style={{margin: 0, padding: 0, listStyle: 'none'}}>
        {countryList.map(x => {
          return (
            <li key={x.name}>
              {x.name}
            </li>
          )
        })}
      </ul>
    )
  } else if (length === 0) { return <p>No matches found</p> }

  const country = countryList[0]
  return (
    <>
      <Country country={country} weatherData={weatherData} />
    </>
  )

}

export default Countries