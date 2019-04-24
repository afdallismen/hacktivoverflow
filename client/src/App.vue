<template>
  <div id="app">
    <div class="navbar is-light">
      <div class="container">
        <div class="navbar-brand">
          <router-link to="/" class="navbar-item has-text-weight-bold is-size-4">hacktivOverflow</router-link>
        </div>
        <div class="navbar-menu">
          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <template v-if="loggedIn">
                  <router-link
                    to="/dashboard"
                    tag="a"
                    class="button is-light has-text-grey-dark"
                  >Dashboard
                  </router-link>
                  <b-button
                    type="is-light has-text-grey-dark"
                    @click="handleClickLogout"
                  >Logout</b-button>
                </template>
                <template v-else>
                  <router-link
                    to="/register"
                    tag="a"
                    class="button is-light has-text-grey-dark"
                  >Register
                  </router-link>
                  <router-link
                    to="/login"
                    tag="a"
                    class="button is-light has-text-grey-dark"
                  >Login</router-link>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="buttons is-right mt48" v-if="!registering && !loggingIn">
        <b-button type="is-primary" @click="handleClickAskQuestion">Ask Question</b-button>
      </div>
      <router-view class="mt48" :questions="questions"/>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

import auth from './helpers/auth'

export default {
  data: () => ({
    loggingIn: false,
    registering: false,
  }),
  computed: {
    ...mapGetters('auth', [
      'loggedIn'
    ]),
    ...mapState('questions', {
      questions: 'all'
    })
  },
  watch: {
    '$route': function () {
      this.loggingIn = this.$route.name === 'auth-login'
      this.registering = this.$route.name === 'auth-register'
    }
  },
  created: function () {
    if (auth.loggedIn()) {
      this.$store.dispatch('auth/setLogin', localStorage.getItem('token'))
    }
    this.$store.dispatch('questions/getAllQuestions')
    this.loggingIn = this.$route.name === 'auth-login'
    this.registering = this.$route.name === 'auth-register'
  },
  methods: {
    handleClickAskQuestion: function () {
      this.$router.push('/dashboard/new-question')
    },
    handleClickLogout: function () {
      this.$store.dispatch('auth/logout')
      this.$router.push('/')
    }
  }
}
</script>

<style>
#app {
  min-height: 100vh;
  padding-bottom: 81px;
}
.ck-editor__editable_inline {
  min-height: 200px
}
.container {
  max-width: 720px;
}
</style>
