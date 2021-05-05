const init = { name: null, token: null, username: null }

export const auth = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
  let user = init
  if (loggedUserJSON) {
    user = JSON.parse(loggedUserJSON)
  }

  return async dispatch => {
    dispatch({
      type: 'CHECK',
      data: user
    })
  }
}

export const login = ( userdata ) => {
  window.localStorage.setItem('loggedBlogappUser', JSON.stringify(userdata))
  return async dispatch => {
    dispatch({
      type: 'LOGIN',
      data: userdata
    })
  }
}

export const logout = () => {
  return async dispatch => {
    dispatch({
      type: 'LOGIN',
      data: init
    })
  }
}

const userReducer = (state = init, action) => {
  switch(action.type) {
  case 'CHECK':
    console.log(action.data)
    return action.data
  case 'LOGIN':
    console.log(action.data)
    return action.data
  case 'LOGOUT':
    return state
  default:
    return state
  }
}

export default userReducer