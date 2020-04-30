import React from 'react'
import ReactDOM from 'react-dom'

const Hello = (props) => {
  return (
    <>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
    </>
  );
}

const App = () => {
  const name = 'Jack';
  const age = 19;

  return (
    <>
      <h1>Greetings</h1>
      <Hello name='Will' age={17} />
      <Hello name={name} age={age} />
    </>
  );
}