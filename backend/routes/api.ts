const ApiRouter = require("koa-router");
const apiRouter = new ApiRouter();

//basic test route
apiRouter.get("/", (ctx: { body: string; }, next: any) => {
    ctx.body = "Hello Api!";
});
//auth subroutes;
apiRouter.use('/auth', require('./auth'));

module.exports = apiRouter.routes();
