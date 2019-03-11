// const HomeService = require('../service/home')
module.exports = {
  login: async(ctx, next) => {
    await ctx.render('home',{
      btnName: 'GoGoGo'
    });
  },
  register: async(ctx, next) => {
    const { app } = ctx;
    let {
      name,
      password
    } = ctx.request.body;
    let data = await app.service.home.register(name, password);
    ctx.response.body = data;
  }
}
