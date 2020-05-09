import React from 'react'

const Search = ({onChange, value}) => {
  return (
    <>
      <label>find countries: </label>
      <input onChange={onChange} value={value}/>
    </>
  )
}

export default Search