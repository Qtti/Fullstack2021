
import React from 'react'
//import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification} from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {

    const vote = (id) => {
        console.log('vote', id)
        const anecdote = props.anecdotes.find(n => n.id === id)
        const notification = "You voted: " + anecdote.content
        console.log('anecdote', anecdote)
        props.setNotification(notification, 5)
        props.voteAnecdote(anecdote)
        
      }

    return (
        <div>
            {props.anecdotes
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

const mapStateToProps = (state) => {
    if ( state.filter === 'ALL' ) {
      return {anecdotes: state.anecdotes}
    }
    return state.anecdotes
        .filter((anecdote) => {
            console.log("asd", anecdote)
            return anecdote.content.includes(state.filter)
    })
}

const mapDispatchToProps = {
    setNotification,
    voteAnecdote
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(AnecdoteList)