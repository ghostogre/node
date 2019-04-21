// const HomeService = require('../service/home')
const { validateLogin, validateRegister} = require('../validation/User')
module.exports = {
  login: async(ctx, next) => {
    const { app } = ctx;
    let {
      email,
      password
    } = ctx.request.body;
    let errmsg = validateLogin(ctx.request.body);
    if (errmsg) {
      ctx.response.body = {
        errcode: 10001,
        errmsg
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
    let errmsg = validateRegister(ctx.request.body);
    if (errmsg) {
      ctx.body = {
        errcode: 10001,
        errmsg
      };
    } else {
      let data = await app.service.User.register(name, password, email);
      ctx.response.body = data;
    }
  },
  // 用户信息获取
  getMsg: async (ctx, next) => {
    const user = ctx.state.user;
    if (user) {
      ctx.body = {
        errcode: 0,
        data: {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
          email: user.email
        },
        errmsg: 'success'
      }
    } else {
      ctx.body = {
        errcode: 10002,
        errmsg: '用户认证失败!'
      }
    }
  }
}
