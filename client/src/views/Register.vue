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
          <b-button type="is-success" native-type="submit">Register</b-button>
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
      auth
        .register(this.user)
        .then(_ => {
          this.$router.push('/login')
          Swal.fire({
            type: 'success',
            title: 'Your account has been saved. Procced to login to continue.',
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
