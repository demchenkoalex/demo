import axios from 'axios'

const api = axios.create({
  baseURL: 'https://reqres.in/api',
  timeout: 10000
})

export default api
