import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteOf } from '../reducers/anecdoteReducer'
import {
  notificationSetting,
  notificationRemoving,
} from '../reducers/notificationReducer'

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

  return (
    <ul>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => {
            dispatch(voteOf(anecdote.id))
            dispatch(
              notificationSetting(`you vote ${anecdote.content}`)
            )
            setTimeout(() => {
              dispatch(notificationRemoving())
            }, 5000)
          }}
        />
      ))}
    </ul>
  )
}

export default AnecdoteList
