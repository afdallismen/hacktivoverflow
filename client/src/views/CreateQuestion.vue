<template>
  <div>
    <p class="is-size-4">Create a Question</p>
    <div class="is-divider mt8"></div>
    <form @submit.prevent="handleSubmit">
      <b-field label="Title">
        <b-input v-model="title"></b-input>
      </b-field>
      <b-field label="Description">
        <Wysiwyg v-model="description" />
      </b-field>
      <div class="buttons is-right mt16">
        <b-button type="is-success" native-type="submit">Save</b-button>
      </div>
    </form>
  </div>
</template>

<script>
import Wysiwyg from '../components/Wysiwyg'

export default {
  components: {
    Wysiwyg
  },
  data: () => ({
    title: '',
    description: ''
  }),
  methods: {
    handleSubmit: function () {
      this.$store
        .dispatch('questions/createQuestion', {
          title: this.title,
          description: this.description
        })
        .then(_ => {
          this.$router.push('/dashboard')
        })
    }
  }
}
</script>

<style>

</style>
