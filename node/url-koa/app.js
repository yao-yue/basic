const Koa = require('koa');

//注意引入koa-router的语句最后是函数调用
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');

const app = new Koa()


// app.use(async (ctx, next) => {
//     await next();
//     ctx.response.type = 'text/html';
//     ctx.response.body ='<h1>hello koa</h1>';
// })

// router.get(url, async())
// router 的使用  用router封装一下，然后在用app.use(router.routers())

router.get('/', async (ctx, next) => {
    ctx.response.body = `<h1>Index</h1>
            <form action="/signin" method="post">
                <p>Name: <input name="name" value="koa"></p>
                <p>Password: <input name="password" type="password"></p>
                <p><input type="submit" value="Submit"></p>
            </form>`;
});

router.post('/signin', async (ctx, next) => {
    var
        name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    console.log(`signin with name: ${name}, password: ${password}`);
    if (name === 'koa' && password === '12345') {
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
            <p><a href="/">Try again</a></p>`;
    }
});
// 由于middleware的顺序很重要，这个koa-bodyparser必须在router之前被注册到app对象上。
app.use(bodyParser())
app.use(router.routers())
app.listen(3000)
console.log('app started at port 3000');

//但无论是Node.js提供的原始request对象，还是koa提供的request对象，都不提供解析request的body的功能！
// 中间件 koa-bodyparser专门来干这个活