<template>
  <div class="mb24">
    <p class="is-size-4" v-html="question.title"></p>
    <div class="is-divider mt8"></div>
    <div class="media">
      <div class="media-left ml0 mr24">
        <VoteButtons @click="handleClickVotes"/>
      </div>
      <div class="media-content">
        <div v-html="question.description"></div>
      </div>
    </div>
    <AnswerList :answers="question.answers || []" class="mt81"/>
    <div class="mt81">
      <p class="is-size-4">Your Answer</p>
      <div class="is-divider mt8"></div>
      <Wysiwyg v-model="answer"></Wysiwyg>
      <div>
        <div class="is-divider mb16"></div>
        <div v-html="answer"></div>
        <div class="is-divider mt16"></div>
      </div>
      <div class="buttons mt16 is-right">
        <b-button @click="answer = ''" v-if="answer">Cancel</b-button>
        <b-button type="is-success" @click="handleClickSubmit">Submit</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import VoteButtons from '../components/VoteButtons'
import AnswerList from '../components/AnswerList'
import Wysiwyg from '../components/Wysiwyg'

export default {
  components: {
    VoteButtons,
    AnswerList,
    Wysiwyg
  },
  data: () => ({
    answer: ''
  }),
  computed: {
    ...mapGetters('auth', ['loggedIn']),
    ...mapState('questions', {
      question: 'detail'
    }),
  },
  created: function () {
    if (this.question) {
      this.$store.dispatch('questions/getQuestion', this.$route.params.question_id)
    }
  },
  methods: {
    pushLogin: function() {
      this.$router.push({
        path: '/login',
        query: {
          redirect: this.$route.fullPath
        }
      })
    },
    handleClickSubmit: function () {
      if (!this.loggedIn) {
        this.pushLogin()
      }
    },
    handleClickVotes: function (votes) {
      if (!this.loggedIn) {
        this.pushLogin()
      }
    }
  }
}
</script>

<style scoped>

</style>
