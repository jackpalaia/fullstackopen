import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Feedback = ({handleGood, handleNeutral, handleBad}) => (
  <>
    <h1>Give Feedback</h1>
    <Button text='good' handleClick={handleGood} />
    <Button text='neutral' handleClick={handleNeutral} />
    <Button text='bad' handleClick={handleBad} />
  </>
)

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

const Statistics = ({good, neutral, bad, total}) => (
  <>
    <h1>Statistics</h1>
    <Statistic text='good' value={good} />
    <Statistic text='neutral' value={neutral} />
    <Statistic text='bad' value={bad} />
    <Statistic text='total' value={total} />
    <Statistic text='average' value={(total === 0) ? 0 : (good - bad) / total} />
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
      <Feedback handleGood={handleGood} handleNeutral={handleNeutral} handleBad={handleBad} />
      <Statistics good={good} neutral={neutral} bad={bad} total={total} />
    </>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)