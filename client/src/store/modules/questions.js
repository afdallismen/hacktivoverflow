import question from '../../api/question'

// initial state
const state = {
  all: [],
  detail: {}
}

// getters
const getters = {
  questionVotes: state => state.detail.upvotes - state.detail.downvotes,
  userQuestions: (state, getters, rootState, rootSetters) => {
    return state.all.filter(
      question => question.author._id === rootState.auth.user._id
    )
  }
}

// actions
const actions = {
  getAllQuestions: function ({ commit }) {
    question
      .fetchQuestions()
      .then(questions => {
        commit('setQuestions', questions)
      })
      .catch(err => console.log(err))
  },
  getQuestion: function ({ commit }, id) {
    question
      .fetchQuestionById(id)
      .then(question => {
        commit('setDetailQuestion', question)
      })
      .catch(err => console.log(err))
  },
  createQuestion: function ({ commit, rootState }, payload) {
    question
      .createQuestion({ title: payload.title, description: payload.description }, {
        user_id: rootState.auth.user._id,
        token: rootState.auth.token
      })
      .then(question => {
        commit('addQuestion', question)
        return Promise.resolve()
      })
      .catch(err => Promise.reject(err))
  }
}

// mutations
const mutations = {
  setQuestions (state, questions) {
    state.all = questions
  },
  setDetailQuestion (state, question) {
    state.detail = question
  },
  addQuestion: function (state, question) {
    state.all.push(question)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
