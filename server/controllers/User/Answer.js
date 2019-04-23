const models = require('../../models')

class Answer {
  static create (req, res) {
    models.Answer
      .create({
        title: req.body.title,
        description: req.body.description,
        author: req.user.id
      })
      .then(answer => {
        res.status(201).json({ answer })
      })
      .catch(_ => res.status(500).json({ message: 'Internal Server Error.' }))
  }

  static _vote (req, res, vote) {
    models.Answer
      .findById(req.params.answer_id)
      .then(answer => {
        answer[vote] += 1
        return answer.save()
      })
      .then(answer => {
        res.status(201).json({ answer })
      })
      .catch(_ => res.status(500).json({ message: 'Internal Server Error.' }))
  }

  static upvote (req, res) {
    Answer._vote(req, res, 'upvotes')
  }

  static downvote (req, res) {
    Answer._vote(req, res, 'downvotes')
  }
}

module.exports = Answer
