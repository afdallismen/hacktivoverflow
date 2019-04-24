import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000'
})

export default {
  login: ({ email, password }) => {
    return axiosInstance
      .post('/auth/login', { email, password })
      .then(({ data })=> data)
  },
  register: ({ email, password }) => {
    return axiosInstance
      .post('/auth/register', { email, password })
      .then(({ data }) => data)
  }
}
