import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = []

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
      
      const changedAnecdote = {...anecdote, votes: anecdote.votes + 1}
      
      const updatedAnecdote = await anecdoteService.update(anecdote.id, changedAnecdote)
      dispatch({
        type: 'VOTE',
        data: changedAnecdote
      })
  }
  /*
  return {
    type: 'VOTE',
    data: { anecdote.id }
  }*/
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  }
}

const initialState = [].map(asObject)

const anecdoteReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type) {
    case 'VOTE':
      const id = action.data.id
      //const AnecdoteToChange = state.find(n => n.id === id)
      //const changedAnecdote = {...AnecdoteToChange, votes: AnecdoteToChange.votes + 1}
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : action.data 
      )
    case 'NEW_ANECDOTE':
        console.log("new", action.data)
        return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export default anecdoteReducer