
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'


const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        if ( state.filter === 'ALL' ) {
          return state.anecdotes
        }
        return state.anecdotes
            .filter((anecdote) => {
                console.log("asd", anecdote)
                return anecdote.content.includes(state.filter)
            })
      })
    
    const dispatch = useDispatch()

    const vote = (id) => {
        console.log('vote', id)
        const notification = "You voted: " + anecdotes.find(n => n.id === id).content
        console.log('anecdote', notification.content)
        dispatch(showNotification(notification))
        dispatch(voteAnecdote(id))
        setTimeout(() => {
            dispatch(hideNotification())
          }, 5000)
      }

    return (
        <div>
            {anecdotes
                .sort((a,b) => (a.votes - b.votes))
                .reverse()
                .map(anecdote =>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => vote(anecdote.id)}>vote</button>
                        </div>
                    </div>
            )}
        </div>
      )
}

export default AnecdoteList