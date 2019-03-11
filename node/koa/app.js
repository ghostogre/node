const Koa = require('koa')
const http = require('http')
const router = require('./router/index')
const app = new Koa()
const middleware = require('./middleware')
middleware(app)
router(app)

http.createServer(app.callback()).listen(3000)
