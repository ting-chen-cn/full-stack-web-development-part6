import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteOf } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleClick }) => (
  <li>
    <div>{anecdote.content}</div>
    <div>
      has {anecdote.votes}
      <button onClick={handleClick}>vote</button>
    </div>
  </li>
)

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state)
  anecdotes.sort((a, b) => b.votes - a.votes)
  const dispatch = useDispatch()

  return (
    <ul>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => dispatch(voteOf(anecdote.id))}
        />
      ))}
    </ul>
  )
}

export default AnecdoteList
