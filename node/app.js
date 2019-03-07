const type = 'koa'

if (type === 'koa') {
  require('./koa/app')
}
else if (type === 'express') {
  require('./express/app')
}
