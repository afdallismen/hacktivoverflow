const models = require('../models')

class Question {
  static findAll (req, res) {
    models.Question
      .find()
      .then(questions => res.status(200).json({ questions }))
      .catch(_ => res.status(500).json({ message: 'Invalid Server Error.' }))
  }

  static findById (req, res) {
    models.Question
      .findById(req.params.question_id)
      .populate('answers')
      .then(question => res.status(200).json({ question }))
      .catch(_ => res.status(500).json({ message: 'Invalid Server Error.' }))
  }
}

module.exports = Question