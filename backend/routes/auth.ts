import { Context, Next } from "koa";

const AuthRouter = require('koa-router');
const authRouter = new AuthRouter();
const Ctrl = require('../controllers/auth');

authRouter.get('/', (ctx: Context, next: Next) => {
    ctx.body = "Hello, auth!";
});

authRouter.post('/login', Ctrl.login);
authRouter.post('/signup', Ctrl.signup);
authRouter.get('/status', Ctrl.status);
authRouter.get('/logout', Ctrl.logout);


module.exports = authRouter.routes();
