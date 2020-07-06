import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = user => {
  token = user.token
}

const create = async () => {
  const config = {
    headers: { Authorization: token }
  }
  const res = await axios.post(baseUrl)
  return res.data
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default { getAll }