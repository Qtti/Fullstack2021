import React, { useState } from 'react'
import { login } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import user from '../services/user'
import { setNotification } from '../reducers/notificationReducer'

const Login = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const userLogin = (event) => {
    event.preventDefault()
    console.log(event)
    user.login(username,password)
      .then((userdata) => {
        dispatch(login(userdata))
        dispatch(setNotification('User logged in'))
      })
      .catch(() => {
        dispatch(setNotification('Wrong credentials'))
      })
  }


  return (
    <form onSubmit={userLogin}>
          Username: <input id = 'username' value={username} onChange={e => setUsername(e.target.value)}></input><br></br>
          Password: <input id = 'password' value={password} onChange={e => setPassword(e.target.value)} type='password'></input><br></br>
      <input id='login-button' type = 'submit' value = 'Log in'></input>
    </form>)
}

export default Login