import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteOf } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
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
  const anecdotes = useSelector((state) => {
    const filter = state.filter
    return state.anecdotes.filter((a) =>
      a.content.toLowerCase().includes(filter.toLowerCase())
    )
  })
  anecdotes.sort((a, b) => b.votes - a.votes)
  const dispatch = useDispatch()
  const addVote = async (data) => {
    dispatch(voteOf(data))
    dispatch(setNotification(`you voted '${data.content}'`, 10))
  }

  return (
    <ul>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => addVote(anecdote)}
        />
      ))}
    </ul>
  )
}

export default AnecdoteList
