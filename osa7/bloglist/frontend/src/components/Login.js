import React, { useState } from 'react'
import { login, logout } from '../reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import user from '../services/user'
import { setNotification } from '../reducers/notificationReducer'
import { Form, Button } from 'react-bootstrap'

const Login = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const userdata = useSelector(state => state.user)

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

  const userLogout = () => {
    window.localStorage.clear()
    dispatch(logout())
    dispatch(setNotification('User logged out'))
  }

  if(userdata.username === null)
  {
    return (
      <div className="justify-content-md-center">
        <h2>Log in to application</h2>
        <Form onSubmit={userLogin}>
          <Form.Label>Username:</Form.Label><Form.Control id = 'username' value={username} onChange={e => setUsername(e.target.value)}></Form.Control><br></br>
          <Form.Label>Password:</Form.Label><Form.Control id = 'password' value={password} onChange={e => setPassword(e.target.value)} type='password'></Form.Control><br></br>
          <Button id='login-button' type = 'submit' value = 'Log in'>Log in</Button>
        </Form>
      </div>
    )
  }
  else
  {
    return (
      <>
        <span>{ userdata.name} logged in <button onClick={userLogout}>Logout</button></span>
      </>)
  }
}

export default Login