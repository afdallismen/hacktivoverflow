<template>
  <div class="vote-buttons has-text-grey-light">
    <b-button
      icon-right="chevron-up"
      class="has-text-info"
      @click="$emit('click', 'upvote')"
      :disabled="!canUpvote"
    ></b-button>
    <p
      class="has-text-centered has-text-grey mt8 mb8 is-size-5"
      v-html="votes"
    ></p>
    <b-button
      icon-right="chevron-down"
      class="has-text-info"
      @click="$emit('click', 'downvote')"
      :disabled="!canDownvote"
    ></b-button>
  </div>
</template>

<script>
export default {
  props: ['votes', 'canUpvote', 'canDownvote']
}
</script>

<style scoped>
  .vote-buttons > * {
    display: block;
  }
</style>
