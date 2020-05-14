import React from 'react'

const Weather = ({ data }) => {
  return (
    <>
      <h2>Weather in {data.location.name}</h2>
      <p>temperature: {data.current.temperature}</p>
      <img src={data.current.weather_icons[0]} alt={data.current.weather_descriptions[0]} />
      <p>wind: {data.current.wind_speed} kmh {data.current.wind_dir}</p>
    </>
  )
}

export default Weather