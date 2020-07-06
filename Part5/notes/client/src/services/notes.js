import axios from 'axios'

const baseURL = '/api/notes'
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseURL)
  return request.then(response => response.data)
}

const create = async newObj => {
  const config = {
    headers: { Authorization: token }
  }
  const res = await axios.post(baseURL, newObj, config)
  return res.data
}

const update = (id, newObj) => {
  const request = axios.put(`${baseURL}/${id}`, newObj)
  return request.then(response => response.data)
}

export default { getAll, create, update, setToken }