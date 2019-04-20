// const HomeService = require('../service/home')
const utils = require('../utils/utils')
module.exports = {
  login: async(ctx, next) => {
    const { app } = ctx;
    let {
      email,
      password
    } = ctx.request.body;
    if (!email || !password) {
      ctx.body = {
        errcode: 10001,
        errmsg: '缺少关键参数!'
      };
    } else if (!utils.checkEmail(email)) {
      ctx.body = {
        errcode: 10002,
        errmsg: '邮箱格式错误!'
      };
    } else {
      let data = await app.service.User.login(email, password);
      ctx.response.body = data;
    }
  },
  register: async(ctx, next) => {
    const { app } = ctx;
    let {
      name,
      email,
      password
    } = ctx.request.body;
    if (!name || !password || !email) {
      ctx.body = {
        errcode: 10001,
        errmsg: '缺少关键参数!'
      };
    } else if (!utils.checkEmail(email)) {
      ctx.body = {
        errcode: 10002,
        errmsg: '邮箱格式错误!'
      };
    } else {
      let data = await app.service.User.register(name, password, email);
      ctx.response.body = data;
    }
  }
}
