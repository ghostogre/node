const json = require('./json')
const path = require('path')
const ip = require('ip')
const rule = require('./rule')
const nunjucks = require('koa-nunjucks-2')
const staticFiles = require('koa-static')
const mylog = require('./log')
const httpError = require('./http-error')
const bodyParser = require('koa-bodyparser')()
const passport = require('koa-passport')

module.exports = (app) => {
  /**
   * 在接口的开头调用
   * 指定 controller 文件夹下的 js 文件，挂载在 app.controller 属性
   * 指定 service 文件夹下的 js 文件，挂载在 app.service 属性
   */ 
  rule({
    app,
    rules: [
      {
        folder: path.join(__dirname, '../controller'),
        name: 'controller'
      },
      {
        folder: path.join(__dirname, '../service'),
        name: 'service'
      }
    ]
  })
  app.use(httpError({
    errorPageFolder: path.resolve(__dirname, '../errorPage')
  }))
  app.use(mylog({
    env: app.env,  // koa 提供的环境变量
    projectName: 'koa2-app',
    appLogLevel: 'debug',
    dir: 'logs',
    serverIp: ip.address()
  }))
  app.use(staticFiles(path.resolve(__dirname, "./public")))
  app.use(nunjucks({
    ext: 'html',
    path: path.join(__dirname, '../views'),// 指定视图目录
    nunjucksConfig: {
      trimBlocks: true // 开启转义 防Xss
    }
  }))
  app.use(json())
  app.use(bodyParser)

  app.use(passport.initialize())
  app.use(passport.session())
  // 回调到config文件中的passport.js
  require('../utils/passport')(passport)

  // 增加错误的监听处理
  app.on("error", (err, ctx) => {
    if (ctx && !ctx.headerSent && ctx.status < 500) {
      ctx.status = 500
    }
    if (ctx && ctx.log && ctx.log.error) {
      if (!ctx.state.logged) {
        ctx.log.error(err.stack)
      }
    }
  })
}
