const routes = require('express').Router()

routes.use('/:user_id/questions', require('./questions'))

module.exports = routes
