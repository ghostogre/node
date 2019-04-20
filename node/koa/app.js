const Koa = require('koa')
const http = require('http')
const router = require('./router/index')
const app = new Koa()
const middleware = require('./middleware')
const db = require('./config/keys')
const mongoose = require('mongoose')
mongoose.connect(db.uri, {useNewUrlParser: true}).then(() => {
  console.log('连接完成')
}).catch(() => {
  console.log('无法连接数据库')
})
middleware(app)
router(app)

const port = process.env.port || 3000

http.createServer(app.callback()).listen(port)
