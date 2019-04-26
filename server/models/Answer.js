const mongoose = require('mongoose')

const answerSchema = mongoose.Schema({
  title: String,
  description: String,
  upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  downvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
})

const Answer = mongoose.model('answer', answerSchema)

module.exports = Answer
