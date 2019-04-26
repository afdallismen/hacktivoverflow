const models = require('../models')

module.exports = {
  isNotAuthorOfThis: modelName => (req, res, next) => {
    let id = req.params[modelName.toLowerCase() + '_id']
    models[modelName]
      .findById(id)
      .then(doc => {
        if (!doc) {
          res.status(404).json({ message: `${modelName} Not Found.` })
        } else {
          if (doc.author === req.user._id) {
            res.status(401).json({ message: 'Unauthorized Access' })
          } else {
            next()
          }
        }
      })
      .catch(_ => res.status(500).json({ message: 'Internal Server Error.' }))
  },
  isAuthorOfThis: modelName => (req, res, next) => {
    let id = req.params[modelName.toLowerCase() + '_id']
    models[modelName]
      .findById(id)
      .then(doc => {
        if (!doc) {
          res.status(404).json({ message: `${modelName} Not Found.` })
        } else {
          if (String(doc.author) !== req.user.id) {
            res.status(401).json({ message: 'Unauthorized Access' })
          } else {
            next()
          }
        }
      })
      .catch(_ => res.status(500).json({ message: 'Internal Server Error.' }))
  }
}
