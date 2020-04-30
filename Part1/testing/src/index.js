import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const [count, setCount] = useState(0);

  const increase = () => setCount(count + 1);
  const decrease = () => setCount(count - 1);
  const zero = () => setCount(0);

  return (
    <>
      <Display count={count} />
      <Button text='plus' handleClick={increase} />
      <Button text='minus' handleClick={decrease} />
      <Button text='zero' handleClick={zero} />
    </>
  );
};

const Display = ({count}) => <>{count}</>;
const Button = ({text, handleClick}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)