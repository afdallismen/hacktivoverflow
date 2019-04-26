const models = require('../../models')

class Question {
  static create (req, res) {
    models.Question
      .create({
        title: req.body.title,
        description: req.body.description,
        author: req.user.id
      })
      .then(question => {
        return question.populate('author').execPopulate()
      })
      .then(question => {
        res.status(201).json({ question })
      })
      .catch(_ => res.status(500).json({ message: 'Internal Server Error.' }))
  }

  static update (req, res) {
    models.Question
      .findById(req.params.question_id)
      .then(question => {
        question.title = req.body.title
        question.description = req.body.description
        return question.save()
      })
      .then(question => {
        return question
          .populate('author')
          .populate({
            path: 'answers',
            populate: {
              path: 'author'
            }
          })
      })
      .then(question => {
        res.status(200).json({ question })
      })
      .catch(_ => res.status(500).json({ message: 'Internal Server Error.' }))
  }

  static _vote (req, res, vote) {
    models.Question
      .findById(req.params.question_id)
      .then(question => {
        if (vote === 'upvotes') {
          question.downvotes.pull(req.user._id)
        } else {
          question.upvotes.pull(req.user._id)
        }
        question[vote].push(req.user._id)
        return question.save().then(question => question.populate('author').execPopulate())
      })
      .then(question => {
        res.status(201).json({ question })
      })
      .catch(_ => res.status(500).json({ message: 'Internal Server Error.' }))
  }

  static upvote (req, res) {
    Question._vote(req, res, 'upvotes')
  }

  static downvote (req, res) {
    Question._vote(req, res, 'downvotes')
  }

  static deleteQuestion (req, res) {
    models.Question
      .findOneAndRemove({ _id: req.params.question_id })
      .then(question => {
        res.status(200).json({ question })
      })
      .catch(_ => res.status(500).json({ message: 'Internal Server Error.' }))
  }
}

module.exports = Question
