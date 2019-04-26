<template>
  <div>
    <p class="is-size-4">{{ answers.length }} Answer</p>
    <div v-for="(answer, index) in answers" :key="answer.id">
      <div class="is-divider mt8 mb32" :class="{'mt48': index !== 0}"></div>
      <div class="media">
        <div class="media-left ml0 mr24">
          <VoteButtons
            :can-upvote="canUpvote(answer)"
            :can-downvote="canDownvote(answer)"
            :votes="answer.upvotes.length - answer.downvotes.length"
            @click="votes => handleClickVotes(answer, votes)"/>
        </div>
        <div class="media-content">
          <span v-html="answer.author.email" class="has-text-weight-bold"></span>
          <p v-html="answer.description"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

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
  },
  computed: {
    ...mapState('auth', ['user']),
    ...mapGetters('auth', ['loggedIn']),
    canUpvote: function () {
      return (answer) => !answer.upvotes.includes(this.user._id)
    },
    canDownvote: function () {
      return (answer) => !answer.downvotes.includes(this.user._id)
    }
  },
  methods: {
    handleClickVotes: function (answer, votes) {
      if (!this.loggedIn) {
        this.pushLogin()
      } else {
        this.$store.dispatch('questions/voteAnswer', {
          answer,
          votes
        })
      }
    }
  }
}
</script>

<style>

</style>
