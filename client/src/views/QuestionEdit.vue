<template>
  <div>
    <p class="is-size-4">Edit a Question</p>
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
import { mapState } from 'vuex'

import Wysiwyg from '../components/Wysiwyg'

export default {
  components: {
    Wysiwyg
  },
  data: function () {
    return {
      id: this.$store.state.questions.detail._id,
      title: this.$store.state.questions.detail.title,
      description: this.$store.state.questions.detail.description
    }
  },
  methods: {
    handleSubmit: function () {
      this.$store
        .dispatch('questions/updateQuestion', {
          title: this.title,
          description: this.description
        })
        .then(_ => {
          this.$router.push(`/questions/${this.id}`)
        })
    }
  }
}
</script>

<style>

</style>
