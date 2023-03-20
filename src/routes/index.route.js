const siteRouter =  require('./site.route')
const courseRouter =  require('./course.route')
const MeRouter = require('./store.me.route')

function route(app) {
    app.use('/home', siteRouter)
    app.use('/courses', courseRouter)
    app.use('/me', MeRouter)
    app.use('/', siteRouter)
}

module.exports = route