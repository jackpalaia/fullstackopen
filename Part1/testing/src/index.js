import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = (props) => {
  const [value, setValue] = useState(0);

  const setToValue = (newValue) => () => setValue(newValue);

  return (
    <>
      {value}
      <button onClick={setToValue(1000)}>thousand</button>
      <button onClick={setToValue(0)}>reset</button>
      <button onClick={setToValue(value + 1)}>increment</button>
    </>
  )
}

ReactDOM.render (
  <App />,
  document.getElementById('root')
)