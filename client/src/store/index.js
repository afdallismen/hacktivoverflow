import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import questions from './modules/questions'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    questions
  },
})
