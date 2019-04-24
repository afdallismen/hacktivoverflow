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

  static _vote (req, res, vote) {
    models.Question
      .findById(req.params.question_id)
      .then(question => {
        question[vote] += 1
        return question.save()
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
}

module.exports = Question
