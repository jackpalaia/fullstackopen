import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

  const voteAction = id => {
    console.log('vote', id)
    dispatch(vote(id))
  }

  return (
    (anecdotes.sort((a, b) => b.votes - a.votes)).map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => voteAction(anecdote.id)}>vote</button>
        </div>
      </div>
    )
  )
}

export default AnecdoteList