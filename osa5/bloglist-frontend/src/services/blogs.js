import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const remove = (blogid) => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.delete(baseUrl + '/' + blogid,config)
  return request.then(response => response.data)
}

const update = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  console.log(typeof newObject.id)
  let tempObject = { ...newObject }
  delete tempObject.id
  if(tempObject.user){tempObject.user = tempObject.user.id}
  console.log(typeof newObject.id)
  const response = await axios.put(baseUrl + '/' + newObject.id, tempObject, config)
  return response.data
}

export default { getAll, create, update, remove, setToken }