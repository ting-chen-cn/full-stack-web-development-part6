import React from 'react'
import { useDispatch } from 'react-redux'
import { createNew } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const create = async (e) => {
    e.preventDefault()
    const data = e.target.anecdote.value
    e.target.anecdote.value = ''
    dispatch(createNew(data))
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div>
          <input name='anecdote' />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
