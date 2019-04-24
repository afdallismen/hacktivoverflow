<template>
  <div class="columns is-centered">
    <div class="column is-5 box pl24 pr24 pt16 pb24">
      <form @submit.prevent="handleSubmit">
        <b-field label="Email">
          <b-input type="email" v-model="user.email" required></b-input>
        </b-field>
        <b-field label="Password">
          <b-input type="password" v-model="user.password" required></b-input>
        </b-field>
        <div class="buttons is-right mt32">
          <b-button type="is-success" native-type="submit">Login</b-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

import auth from '../api/auth'

export default {
  data: () => ({
    user: {
      email: '',
      password: ''
    }
  }),
  methods: {
    handleSubmit: function () {
      this.$store
        .dispatch('auth/login', this.user)
        .then(_ => {
          let redirect = this.$route.query.redirect

          if (redirect) {
            this.$router.push(redirect)
          } else {
            this.$router.push('/')
          }

          Swal.fire({
            type: 'success',
            title: 'Welcome !',
            timer: 2000
          })
        })
        .catch(err => console.log(err))
    }
  }
}
</script>

<style>

</style>
