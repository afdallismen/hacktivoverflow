const mongoose = require('mongoose')

const questionSchema = mongoose.Schema({
  title: String,
  description: String,
  upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  downvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  answers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'answer' }],
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
})

const Question = mongoose.model('question', questionSchema)

module.exports = Question
