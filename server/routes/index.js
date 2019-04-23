const routes = require('express').Router()

routes.use('/questions', require('./questions'))
routes.use('/auth', require('./auth'))
routes.use('/users', require('./users'))

module.exports = routes
