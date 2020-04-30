import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = ({text, handleClick}) => (
  <>
    <button onClick={handleClick}>
      {text}
    </button>
  </>
);

const Statistic = ({text, value}) => (
  <>
    <p>{text}: {value}</p>
  </>
)

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
    setTotal(total + 1);
  };
  const handleNeutral = () => {
    setNeutral(neutral + 1);
    setTotal(total + 1);
  };
  const handleBad = () => {
    setBad(bad + 1);
    setTotal(total + 1);
  };

  return (
    <>
      <h1>Give Feedback</h1>
      <Button text='good' handleClick={handleGood} />
      <Button text='neutral' handleClick={handleNeutral} />
      <Button text='bad' handleClick={handleBad} />
      <h2>Statistics</h2>
      <Statistic text='good' value={good} />
      <Statistic text='neutral' value={neutral} />
      <Statistic text='bad' value={bad} />
      <Statistic text='total' value={total} />
      <Statistic text='average' value={(total === 0) ? 0 : (good - bad) / total} />
    </>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)