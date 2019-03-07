const router = require('koa-router')()
const HomeController = require('../controller/home')
module.exports = (app) => {
  router.get('/', HomeController.login)

  app.use(router.routes())
  .use(router.allowedMethods())
}
