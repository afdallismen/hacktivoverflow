import auth from '../../api/auth'

// initial state
const state = {
  user: {},
  token: ''
}

// getters
const getters = {
  loggedIn: state => !!state.user._id
}

// actions
const actions = {
  login: function ({ commit }, { email, password }) {
    return auth
      .login({ email, password })
      .then(payload => {
        localStorage.setItem('token', payload.token)
        commit('setLogin', payload)
        return Promise.resolve()
      })
      .catch(err => Promise.reject(err))
  },
  setLogin: function ({ commit }, token) {
    commit('setLogin', { token, user: JSON.parse(window.atob(token.split('.')[1])) })
  },
  logout: function ({ commit }) {
    localStorage.removeItem('token')
    commit('setLogin', { user: {}, token: '' })
  }
}

// mutations
const mutations = {
  setLogin: function (state, payload) {
    state.user = payload.user
    state.token = payload.token
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
