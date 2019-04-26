const models = require('../../models')

class Answer {
  static create (req, res) {
    Promise.all([
      models.Answer
        .create({
          title: req.body.title,
          description: req.body.description,
          author: req.user.id
        })
        .then(answer => answer.populate('author').execPopulate()),
      models.Question
        .findById(req.params.question_id)
    ])
      .then(([answer, question]) => {
        question.answers.push(answer._id)
        question.save(() => {
          res.status(201).json({ answer })
        })
      })
      .catch(_ => res.status(500).json({ message: 'Internal Server Error.' }))
  }

  static _vote (req, res, vote) {
    models.Answer
      .findById(req.params.answer_id)
      .then(answer => {
        if (vote === 'upvotes') {
          answer.downvotes.pull(req.user._id)
        } else {
          answer.upvotes.pull(req.user._id)
        }
        answer[vote].push(req.user._id)
        return answer.save().then(answer => answer.populate('author').execPopulate())
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
