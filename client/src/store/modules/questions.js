import question from '../../api/question'
import answer from '../../api/answer'

// initial state
const state = {
  all: [],
  detail: {}
}

// getters
const getters = {
  questionVotes: state => state.detail.upvotes.length - state.detail.downvotes.length,
  userQuestions: (state, getters, rootState, rootSetters) => {
    return state.all.filter(
      question => question.author._id === rootState.auth.user._id
    )
  },
  isAuthor: (state, getters, rootState) => {
    return state.detail.author._id === rootState.auth.user._id
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
  },
  voteQuestion: function ({ commit, rootState }, payload) {
    question
      .voteQuestion(payload.votes, {
        question: payload.question
      }, { token: rootState.auth.token })
      .then(question => {
        commit(`${payload.votes}Question`, question)
      })
  },
  voteAnswer: function ({ commit, rootState }, payload) {
    answer
      .voteAnswer(payload.votes, {
        question: rootState.questions.detail,
        answer: payload.answer
      }, { token: rootState.auth.token })
      .then(answer => {
        commit(`${payload.votes}Answer`, answer)
      })
  },
  createAnswer: function ({ commit, state, rootState }, payload) {
    answer
      .createAnswer({
        title: payload.title,
        description: payload.description
      }, {
        question: state.detail,
        token: rootState.auth.token,
        user_id: rootState.auth.user._id
      })
      .then(answer => {
        commit('addAnswer', answer)
      })
  },
  updateQuestion: function ({ commit, state, rootState }, payload) {
    question
      .updateQuestion({
        title: payload.title,
        description: payload.description
      }, {
        question: state.detail,
        token: rootState.auth.token,
        user_id: rootState.auth.user._id
      })
      .then(question => {
        commit('setDetailQuestion', question)
        commit('updateQuestions', question)
      })
  },
  deleteQuestion: function ({ commit, state, rootState }) {
    question
      .deleteQuestion({
        question: state.detail
      }, {
        token: rootState.auth.token,
        user_id: rootState.auth.user._id
      })
      .then(question => {
        commit('removeQuestions', question)
        commit('resetDetail')
      })
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
  },
  upvoteQuestion: function (state, question) {
    if (state.detail._id === question._id) {
      state.detail = question
    }
    state.all[state.all.findIndex(q => q._id === question._id)] = question
  },
  downvoteQuestion: function (state, question) {
    if (state.detail._id === question._id) {
      state.detail = question
    }
    state.all[state.all.findIndex(q => q._id === question._id)] = question
  },
  upvoteAnswer: function (state, answer) {
    state
      .detail
      .answers
      .splice(state.detail.answers.findIndex(a => a._id === answer._id), 1, answer)
  },
  downvoteAnswer: function (state, answer) {
    state
      .detail
      .answers
      .splice(state.detail.answers.findIndex(a => a._id === answer._id), 1, answer)
  },
  addAnswer: function (state, answer) {
    console.log(answer)
    state.detail.answers.push(answer)
  },
  updateQuestions: function (state, question) {
    state.all.splice(state.all.findIndex(q => q._id === question._id), 1, question)
  },
  removeQuestions: function (state, question) {
    state.all.splice(state.all.findIndex(q => q._id === question._id), 1)
  },
  resetDetail: function (state, payload) {
    state.detail = {}
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
