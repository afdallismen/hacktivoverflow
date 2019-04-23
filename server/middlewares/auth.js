const models = require('../models')
const { verifyToken } = require('../helpers/auth')

module.exports = {
  loggedIn: (req, res, next) => {
    if (!('authorization' in req.headers)) {
      res.status(400).json({ message: 'Authentication is required.' })
    } else {
      try {
        let payload = verifyToken(req.headers.authorization)
        models.User
          .findById(payload._id)
          .then(user => {
            if (!user) {
              res.status(401).json({ message: 'Invalid Token.' })
            } else {
              req.user = user
              next()
            }
          })
      } catch (e) {
        res.status(401).json({ message: 'Invalid Token.' })
      }
    }
  }
}
