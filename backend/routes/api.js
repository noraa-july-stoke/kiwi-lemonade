const Router = require("koa-router");
const router = new Router();


//basic test route
router.get("/", (ctx, next) => {
    ctx.body = "Hello Api!";
});

module.exports = router.routes();
