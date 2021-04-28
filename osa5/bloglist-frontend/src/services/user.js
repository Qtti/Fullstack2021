import axios from 'axios'
const baseUrl = '/api/login'

const login = (username, password) => {

  const request = axios.post(baseUrl, { username: username, password: password })
  return request.then(response => response.data)
}

const logout = () => {
  window.localStorage.clear()
}


export default { login, logout }