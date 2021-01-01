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

export const createNew = (data) => {
  return {
    type: 'NEW',
    data,
  }
}

export const voteOf = (data) => {
  return {
    type: 'VOTE',
    data,
  }
}

export const initialAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  }
}
export default reducer
