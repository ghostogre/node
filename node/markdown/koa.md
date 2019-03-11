## 使用 Babel 实现 Async 方法

要在 node < 7.6 版本的 Koa 中使用 async 方法, 我们推荐使用`babel's require hook`.

```
require('babel-register');
// 应用的其余 require 需要被放到 hook 后面
const app = require('./app');
```

要解析和编译 async 方法, 你至少应该有 `transform-async-to-generator` 或 `transform-async-to-module-method` 插件.

例如, 在你的 .babelrc 文件中, 你应该有:

```
{
  "plugins": ["transform-async-to-generator"]
}
```

你也可以用 env preset 的 target 参数 "node": "current" 替代.

Koa 应用程序是一个包含一组中间件函数的对象，它是按照类似堆栈的方式组织和执行的。

## 设置

### app.listen(...)

Koa 应用程序不是 HTTP 服务器的1对1展现。 可以将一个或多个Koa应用程序安装在一起以形成具有单个HTTP服务器的更大应用程序。

app.listen(...) 方法只是以下方法的语法糖:

```
const http = require('http');
const Koa = require('koa');
const app = new Koa();
http.createServer(app.callback()).listen(3000);
```

意味着您可以将同一个应用程序同时作为 HTTP 和 HTTPS 或多个地址：

```
const http = require('http');
const https = require('https');
const Koa = require('koa');
const app = new Koa();
http.createServer(app.callback()).listen(3000);
https.createServer(app.callback()).listen(3001);
```

### app.callback()

返回适用于 http.createServer() 方法的回调函数来处理请求。你也可以使用此回调函数将 koa 应用程序挂载到 Connect/Express 应用程序中。

1. `app.use(function)`: 将给定的中间件方法添加到此应用程序
2. `app.keys=`: 设置签名的 Cookie 密钥。
3. `app.context` 是从其创建 ctx 的原型。您可以通过编辑 app.context 为 ctx 添加其他属性。

    app.context.db = db();

    app.use(async ctx => {
    console.log(ctx.db);
    });

## context

1. ctx.req/ctx.request
2. ctx.res/ctx.response
3. ctx.state: 推荐的命名空间，用于通过**中间件传递信息**和你的前端视图。
4. ctx.app: 应用程序实例引用
5. ctx.cookies.get(name, [options]): 通过 options 获取 cookie
6. ctx.cookies.set(name, value, [options])
7. ctx.throw([status], [msg], [properties]): 抛出一个 status 属性默认为 500 的错误

    用 err.expose 标记，这意味着消息适用于客户端响应，这通常不是错误消息的内容。

8. ctx.assert(value, [status], [msg], [properties]): 当 !value 时，抛出类似于 .throw() 的错误。
9. 为了绕过 Koa 的内置 response 处理，你可以显式设置 ctx.respond = false。使用这个属性被认为是一个 hack。 

每个请求都将创建一个 Context，并在中间件中作为接收器引用

## request内容协商

Koa的 request 对象包括由 accepts 和 negotiator 提供的有用的内容协商实体。如果没有提供类型，则返回**所有**可接受的类型。
如果提供多种类型，将返回最佳匹配。如果没有找到匹配项，则返回一个false，你应该向客户端发送一个406 "Not Acceptable" 响应。
如果接收到任何类型的接收头，则会返回第一个类型。

1. request.accepts(types): 检查给定的 type(s) 是否可以接受，如果 true，**返回最佳匹配**，否则为 false。type值可能是一个或多个 mime 类型的字符串或数组.
2. request.acceptsEncodings(encodings): **检查 encodings 是否可以接受，可接受则返回最佳匹配，否则为 false。 请注意，您应该将identity 作为编码之一！**
   
   当没有给出参数时，所有接受的编码将作为数组返回：

    // Accept-Encoding: gzip, deflate
    ctx.acceptsEncodings();
    // => ["gzip", "deflate", "identity"]

3. request.acceptsCharsets(charsets): 检查 charsets 是否可以接受，在 true 时**返回最佳匹配**，否则为 false。当没有参数被赋予所有被接受的字符集将作为数组返回。
4. request.acceptsLanguages(langs): 检查 langs 是否可以接受，如果为 true，返回最佳匹配，否则为 false。

## Response

如果 response.status 未被设置, Koa 将会自动设置状态为 200 或 204。

**response.headerSent**: 检查是否已经发送了一个响应头。 用于查看客户端是否可能会收到错误通知。

