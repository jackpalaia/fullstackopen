import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const create = async stuff => {
  const config = {
    headers: { Authorization: token }
  }
  const res = await axios.post(baseUrl, stuff, config)
  return res.data
}

const update = async (id, blog) => (await axios.put(`${baseUrl}/${id}`, blog)).data

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default { getAll, create, update, setToken }