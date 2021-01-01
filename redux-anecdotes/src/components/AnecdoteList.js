import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteOf } from '../reducers/anecdoteReducer'
import {
  notificationSetting,
  notificationRemoving,
} from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdote'

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
    const changedAnecdote = await anecdoteService.addVote(data)
    dispatch(voteOf(changedAnecdote))
    dispatch(notificationSetting(`you vote ${data.content}`))
    setTimeout(() => {
      dispatch(notificationRemoving())
    }, 5000)
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
