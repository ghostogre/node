const router = require('koa-router')()
// const HomeController = require('../controller/home')
module.exports = (app) => {
  // router.get('/', HomeController.login)
  router.post('/login', app.controller.User.login);
  router.post('/register', app.controller.User.register)
  app.use(router.routes()).use(router.allowedMethods());
}
