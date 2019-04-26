const routes = require('express').Router({ mergeParams: true })

const UserQuestion = require('../../../controllers/User/Question')
const { user, auth } = require('../../../middlewares')

routes.use('/:question_id/answers', require('./answers'))

routes.post('/', auth.loggedIn, UserQuestion.create)
routes.put(
  '/:question_id',
  auth.loggedIn,
  user.isAuthorOfThis('Question'),
  UserQuestion.update
)
routes.delete(
  '/:question_id',
  auth.loggedIn,
  user.isAuthorOfThis('Question'),
  UserQuestion.deleteQuestion
)

routes.put(
  '/:question_id/upvote',
  auth.loggedIn,
  user.isNotAuthorOfThis('Question'),
  UserQuestion.upvote
)

routes.put(
  '/:question_id/downvote',
  auth.loggedIn,
  user.isNotAuthorOfThis('Question'),
  UserQuestion.downvote
)

module.exports = routes
