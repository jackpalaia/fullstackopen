import React from 'react'

const Search = ({ value, onChange }) => {
  return (
    <div>
      search: <input value={value} onChange={onChange} />
    </div>
  )
}

export default Search