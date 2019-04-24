<template>
  <div class="vote-buttons has-text-grey-light">
    <b-button
      icon-right="chevron-up"
      class="has-text-info"
      @click="$emit('click', 'upvote')"
    ></b-button>
    <p
      class="has-text-centered has-text-grey mt8 mb8 is-size-5"
      v-html="questionVotes"
    >questionVotes</p>
    <b-button
      icon-right="chevron-down"
      class="has-text-info"
      @click="$emit('click', 'downvote')"
    ></b-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters('questions', ['questionVotes'])
}
</script>

<style scoped>
  .vote-buttons > * {
    display: block;
  }
</style>
