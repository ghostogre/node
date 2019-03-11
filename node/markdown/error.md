## Node **Error** 类

一个通用的 JavaScript Error 对象，它不表示错误发生的具体情况。 Error 对象会捕捉一个“堆栈跟踪”，详细说明被实例化的 Error 对象在代码中的位置，并可能提供错误的文字描述。

### error.code

`error.code` 属性是标识错误类别的字符标签。

### error.message

error.message 属性是错误的字符串描述，通过调用 new Error(message) 设置。 传给构造函数的 message 也会出现在 Error 的堆栈跟踪的第一行。

### error.stack

`error.stack` 属性是一个字符串，描述代码中 Error 被实例化的位置。

```
Error: Things keep happening!
   at /home/gbusey/file.js:525:2
   at Frobnicator.refrobulate (/home/gbusey/business-logic.js:424:21)
   at Actor.<anonymous> (/home/gbusey/actors.js:400:8)
   at increaseSynergy (/home/gbusey/actors.js:701:6)
```

第一行会被格式化为 `<error class name>: <error message>`，且带上一系列栈帧（每一行都以 "at " 开头）。 每一帧描述了一个代码中导致错误生成的调用点。 V8 引擎会试图显示每个函数的名称（变量名、函数名、或对象的方法名）。



