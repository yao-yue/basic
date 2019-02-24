const Koa = require('koa');

const app = new Koa()


//每收到一个http请求，koa就会调用通过app.use()注册的async函数，并传入ctx和next参数。
// 每个async函数称为一个链 ， await next（）调用下一个middleware
// ctx对象有一些简写的方法，例如ctx.url相当于ctx.request.url，ctx.type相当于ctx.response.type。
app.use(async (ctx, next) => {
    await next();
    ctx.response.type = 'text/html';
    ctx.response.body ='<h1>hello koa</h1>';
})

app.listen(3000)
console.log('app started at port 3000');