<template>
  <div>
    <p class="is-size-4">{{ answers.length }} Answer</p>
    <div v-for="(answer, index) in answers" :key="answer.id">
      <div class="is-divider mt8 mb32" :class="{'mt48': index !== 0}"></div>
      <div class="media">
        <div class="media-left ml0 mr24">
          <VoteButtons />
        </div>
        <div class="media-content">
          <span v-html="answer.author.name" class="has-text-weight-bold"></span>
          <p v-html="answer.description"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VoteButtons from './VoteButtons'

export default {
  props: {
    answers: {
      type: Array,
      required: true
    }
  },
  components: {
    VoteButtons
  }
}
</script>

<style>

</style>
