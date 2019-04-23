const mongoose = require('mongoose')

const questionSchema = mongoose.Schema({
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
  answers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'answer' }],
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
})

const Question = mongoose.model('question', questionSchema)

module.exports = Question
