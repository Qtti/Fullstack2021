import React from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  return (
    <div>
      <Notification/>
      <h2>Anecdotes</h2>
      <AnecdoteForm/>
      <AnecdoteList/>
    </div>
  )
}
export default App