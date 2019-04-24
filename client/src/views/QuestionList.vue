<template>
  <div class="mt24 mb32">
    <template v-if="questions.length">
      <div class="media" v-for="question in questions" :key="question.id">
        <div class="media-left mr32">
          <a
            class="has-text-grey"
            :href="`/questions/${question._id}`"
            @click.prevent="handleClickDetail(question._id)"
          >
            <div class="columns has-text-centered">
              <div class="column">
                <p v-html="question.upvotes + question.downvotes"></p>
                <p>votes</p>
              </div>
              <div class="column">
                <p v-html="question.answers.length"></p>
                <p>answer</p>
              </div>
            </div>
          </a>
        </div>
        <div class="media-content has-text-grey">
          <a
            :href="`/questions/${question._id}`"
            class="is-size-5"
            @click.prevent="handleClickDetail(question._id)"
            v-html="question.title"
          ></a>
          <p>created by <a v-html="question.author.email"></a></p>
        </div>
      </div>
    </template>
    <p v-else>No Question yet.</p>
  </div>
</template>

<script>
export default {
  props: ['questions'],
  methods: {
    handleClickDetail: function (id) {
      this.$store.dispatch('questions/getQuestion', id)
      this.$router.push(`/questions/${id}`)
    }
  }
}
</script>

<style>
  .d-flex {
    display: flex;
  }
</style>
