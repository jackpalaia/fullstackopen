import React from 'react'
import Weather from './Weather'

const Country = ({country, weatherData}) => {
  return (
    <>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h2>Languages</h2>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={country.flag} alt='flag' style={{maxWidth: 200}}/>
      <Weather data={weatherData} />
    </>
  )
}

export default Country