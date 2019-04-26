<template>
  <div class="mb24">
    <p class="is-size-4" v-html="question.title"></p>
    <div class="is-divider mt8"></div>
    <div class="media">
      <div class="media-left ml0 mr24">
        <VoteButtons
          :can-upvote="canUpvote"
          :can-downvote="canDownvote"
          :votes="question.upvotes.length - question.downvotes.length"
          @click="handleClickVotes"/>
      </div>
      <div class="media-content">
        <div v-html="question.description"></div>
      </div>
    </div>
    <div class="buttons is-right" v-if="isAuthor">
      <b-button type="is-danger" icon-left="close" @click="handleClickDelete">Delete</b-button>
      <b-button type="is-success" icon-left="pencil" @click="handleClickEdit">Edit</b-button>
    </div>
    <AnswerList :answers="question.answers || []" class="mt81"/>
    <div class="mt81">
      <p class="is-size-4">Your Answer</p>
      <div class="is-divider mt8"></div>
      <form @submit.prevent="handleSubmit">
        <b-field label="Title">
          <b-input v-model="title"></b-input>
        </b-field>
        <b-field label="Description">
          <Wysiwyg v-model="description"></Wysiwyg>
        </b-field>
        <div>
          <div class="is-divider mb16"></div>
          <div v-html="description"></div>
          <div class="is-divider mt16"></div>
        </div>
        <div class="buttons mt16 is-right">
          <b-button type="is-success" native-type="submit">Submit</b-button>
        </div>
      </form>
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
    title: '',
    description: ''
  }),
  computed: {
    ...mapState('auth', ['user']),
    ...mapGetters('auth', ['loggedIn']),
    ...mapGetters('questions', ['isAuthor']),
    ...mapState('questions', {
      question: 'detail'
    }),
    canUpvote: function () {
      return !this.question.upvotes.includes(this.user._id)
    },
    canDownvote: function () {
      return !this.question.downvotes.includes(this.user._id)
    }
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
    handleSubmit: function () {
      if (!this.loggedIn) {
        this.pushLogin()
      } else {
        this.$store.dispatch('questions/createAnswer', {
          title: this.title,
          description: this.description
        })
        this.title = ''
        this.description = ''
      }
    },
    handleClickVotes: function (votes) {
      if (!this.loggedIn) {
        this.pushLogin()
      } else {
        this.$store.dispatch('questions/voteQuestion', {
          question: this.question,
          votes
        })
      }
    },
    handleClickEdit: function () {
      this.$router.push({
        name: 'question-edit',
        params: {
          question_id: this.question._id
        }
      })
    },
    handleClickDelete: function () {
      this.$store.dispatch('questions/deleteQuestion')
      this.$router.push('/dashboard')
    }
  }
}
</script>

<style scoped>

</style>
