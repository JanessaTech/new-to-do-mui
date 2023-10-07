const accountRouter = require('./account')
const userRouter = require('./user')
const todoRouter = require('./todo')
const apiPrefix = require('../config').apiPrefix
const routes = app => {
    app.use(apiPrefix + '/accounts', accountRouter)
    app.use(apiPrefix + '/users', userRouter)
    app.use(apiPrefix + '/todos', todoRouter)
}

module.exports = routes