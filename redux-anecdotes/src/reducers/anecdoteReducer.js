import anecdoteService from '../services/anecdote'
// import {
//   notificationSetting,
//   notificationRemoving,
// } from './notificationReducer'
const reducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    case 'VOTE':
      return state.map((anecdote) =>
        anecdote.id !== action.data.id ? anecdote : action.data
      )
    default:
      return state
  }
}

export const createNew = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createAnecdote(content)
    dispatch({
      type: 'NEW',
      data: newAnecdote,
    })
  }
}

export const voteOf = (content) => {
  return async (dispatch) => {
    const changedAnecdote = await anecdoteService.addVote(content)
    dispatch({
      type: 'VOTE',
      data: changedAnecdote,
    })
    // dispatch(notificationSetting(`you vote ${content.content}`))
    // setTimeout(() => {
    //   dispatch(notificationRemoving())
    // }, 5000)
  }
}

// export const voteOf = (data) => {
//   return {
//     type: 'VOTE',
//     data,
//   }
// }

export const initialAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export default reducer
