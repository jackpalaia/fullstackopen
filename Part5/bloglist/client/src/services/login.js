import axios from 'axios'
const baseUrl = '/api/login'

const login = async creds => {
  return (await axios.post(baseUrl, creds)).data
}

export default { login }