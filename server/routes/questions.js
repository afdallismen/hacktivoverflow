const routes = require('express').Router()

const Question = require('../controllers/Question')

routes.get('/', Question.findAll)
routes.get('/:question_id', Question.findById)

module.exports = routes
