const Koa = require('koa')
const http = require('http')
const path = require('path')
const router = require('./router/index')
const nunjucks = require('koa-nunjucks-2')
const staticFiles = require('koa-static')
const bodyParser = require('koa-bodyparser')()
const app = new Koa()
app.use(nunjucks({
  ext: 'html',
  path: path.join(__dirname, 'views'),// 指定视图目录
  nunjucksConfig: {
    trimBlocks: true // 开启转义 防Xss
  }
}))
app.use(staticFiles(path.resolve(__dirname, "./public")))
app.use(bodyParser)
router(app)

http.createServer(app.callback()).listen(3000)
