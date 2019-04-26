const axios = require('axios')

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000'
})

export default {
  createAnswer: ({ title, description}, { question, token, user_id }) => {
    return axiosInstance
      .post(`/users/${user_id}/questions/${question._id}/answers`, {
        title,
        description
      }, {
        headers: {
          Authorization: token
        }
      })
      .then(({ data }) => data.answer)
  },
  voteAnswer: (votes, { question, answer }, { token }) => {
    return axiosInstance
      .put(`/users/${question.author}/questions/${question._id}/answers/${answer._id}/${votes}`, {}, {
        headers: {
          Authorization: token
        }
      })
      .then(({ data }) => data.answer)
  }
}
