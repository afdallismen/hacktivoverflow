<template>
  <div>
    <router-view :questions="questions"></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('questions', {
      questions: 'userQuestions'
    })
  }
}
</script>

<style>

</style>
