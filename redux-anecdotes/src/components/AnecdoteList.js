import React from 'react'
// import { useSelector, useDispatch } from 'react-redux'
import { connect } from 'react-redux'
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

const AnecdoteList = (props) => {
  // const anecdotes = useSelector((state) => {
  //   const filter = state.filter
  //   return state.anecdotes.filter((a) =>
  //     a.content.toLowerCase().includes(filter.toLowerCase())
  //   )
  // })
  // anecdotes.sort((a, b) => b.votes - a.votes)
  // const dispatch = useDispatch()
  const addVote = async (data) => {
    // dispatch(voteOf(data))
    // dispatch(setNotification(`you voted '${data.content}'`, 10))
    props.voteOf(data)
    props.setNotification(`you voted '${data.content}'`, 2)
  }

  return (
    <ul>
      {props.anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => addVote(anecdote)}
        />
      ))}
    </ul>
  )
}

// export default AnecdoteList
const mapStateToProps = (state) => {
  const filter = state.filter
  const anecdotes = state.anecdotes.filter((a) =>
    a.content.toLowerCase().includes(filter.toLowerCase())
  )
  anecdotes.sort((a, b) => b.votes - a.votes)
  return {
    anecdotes: anecdotes,
  }
}
const mapDispatchToProps = {
  voteOf,
  setNotification,
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
