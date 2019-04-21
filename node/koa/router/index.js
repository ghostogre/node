const router = require('koa-router')()
const passport = require('koa-passport')
// const HomeController = require('../controller/home')
module.exports = (app) => {
  // router.get('/', HomeController.login)
  router.post('/login', app.controller.User.login);
  router.post('/register', app.controller.User.register);
  router.get('/account', passport.authenticate('jwt', { session: false }), app.controller.User.getMsg);
  app.use(router.routes()).use(router.allowedMethods());
}
