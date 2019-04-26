const routes = require('express').Router({ mergeParams: true })

const UserAnswer = require('../../../controllers/User/Answer')
const { user, auth } = require('../../../middlewares')

routes.post('/', auth.loggedIn, UserAnswer.create)

routes.put(
  '/:answer_id/upvote',
  auth.loggedIn,
  user.isNotAuthorOfThis('Answer'),
  UserAnswer.upvote
)

routes.put(
  '/:answer_id/downvote',
  auth.loggedIn,
  user.isNotAuthorOfThis('Answer'),
  UserAnswer.downvote
)

module.exports = routes
