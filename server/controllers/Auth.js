const models = require('../models')
const { createToken } = require('../helpers/auth')

class Auth {
  static register (req, res) {
    models.User
      .create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      })
      .then(user => {
        let payload = { user: user.toJSON() }
        delete payload.user.password
        res.status(201).json(payload)
      })
      .catch(err => res.status(500).json({ message: 'Internal Server Error.' }))
  }

  static login (req, res) {
    models.User
      .findOne({
        email: req.body.email
      })
      .select('+password')
      .then(user => {
        if (user && user.comparePassword(req.body.password)) {
          let payload = { user: user.toJSON(), token: createToken(user) }
          delete payload.user.password
          res.status(201).json(payload)
        } else {
          res.status(401).json({ message: 'Wrong email or password.' })
        }
      })
      .catch(_ => res.status(500).json({ mesage: 'Internal Server Error.' }))
  }
}

module.exports = Auth
