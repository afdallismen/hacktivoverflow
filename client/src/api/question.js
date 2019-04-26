const axios = require('axios')

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000'
})

export default {
  fetchQuestions: _ => {
    return axiosInstance
      .get('/questions')
      .then(({ data }) => data.questions)
  },
  fetchQuestionById: (id) => {
    return axiosInstance
      .get(`/questions/${id}`)
      .then(({ data }) => data.question)
  },
  createQuestion: ({ title, description }, { user_id, token }) => {
    return axiosInstance
      .post(`/users/${user_id}/questions`, {
        title,
        description
      }, {
        headers: {
          Authorization: token
        }
      })
      .then(({ data }) => data.question)
  },
  voteQuestion: (votes, { question }, { token }) => {
    return axiosInstance
      .put(`/users/${question.author}/questions/${question._id}/${votes}`, {}, {
        headers: {
          Authorization: token
        }
      })
      .then(({ data }) => data.question)
  },
  updateQuestion: ({ title, description }, { question, token }) => {
    return axiosInstance
      .put(`/users/${question.author}/questions/${question._id}`, {
        title,
        description
      }, {
        headers: {
          Authorization: token
        }
      })
      .then(({ data }) => data.question)
  },
  deleteQuestion: ({ question }, { user_id, token }) => {
    return axiosInstance
      .delete(`/users/${user_id}/questions/${question._id}`, {
        headers: {
          Authorization: token
        }
      })
      .then(({ data }) => data.question)
  }
}
