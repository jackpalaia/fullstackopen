import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const vote = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  }
  const next = () => setSelected(Math.floor(Math.random() * 6));

  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <p>has {votes[selected]} votes</p>
      <button onClick={vote}>vote</button>
      <button onClick={next}>next anecdote</button>
      <h2>Anecdote with most votes</h2>
      <div>{anecdotes[votes.indexOf(Math.max(...votes))]}</div>
      <p>has {votes[votes.indexOf(Math.max(...votes))]} votes</p>
    </>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render (
  <App anecdotes={anecdotes}/>,
  document.getElementById('root')
);