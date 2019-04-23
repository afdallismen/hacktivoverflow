const mongoose = require('mongoose')

const answerSchema = mongoose.Schema({
  title: String,
  description: String,
  upvotes: {
    type: Number,
    default: 0
  },
  downvotes: {
    type: Number,
    default: 0
  },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
})

const Answer = mongoose.model('answer', answerSchema)

module.exports = Answer
