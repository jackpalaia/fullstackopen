import axios from 'axios'
const baseURL = 'http://localhost:3001/api/notes'

const getAll = () => {
  const request = axios.get(baseURL)
  const nonExisting = {
    id: 10000,
    content: 'this note is not saved to server',
    date:'2019-4-124012412',
    important: true
  }
  return request.then(response => response.data.concat(nonExisting))
}

const create = newObj => {
  const request = axios.post(baseURL, newObj)
  return request.then(response => response.data)
}

const update = (id, newObj) => {
  const request = axios.put(`${baseURL}/${id}`, newObj)
  return request.then(response => response.data)
}

export default { getAll, create, update }