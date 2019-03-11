const logger = require("./logger")
module.exports = (options) => {
  const loggerMiddleware = logger(options)
  // return logger()
  return (ctx, next) => {
   return loggerMiddleware(ctx, next).catch(e => {
     if (ctx.status < 500) {
       ctx.status = 500;
     }
     ctx.log.error(e.stack);
     ctx.state.logged = true;
     ctx.throw(e);
     // 处理中间件内部的错误
   })
  }
}
