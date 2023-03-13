import { Context } from "koa";

const Koa = require('koa');
const Router = require('koa-router');
const Logger = require('koa-logger');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const Helmet = require('koa-helmet');
const respond = require('koa-respond');
const session = require('koa-session');
const passport = require('koa-passport');
const CSRF = require('koa-csrf');
const serve = require('koa-static');
const path = require('path');
const koaSend = require('koa-send');

const app: typeof Koa = new Koa();
const router = new Router();

app.use(Helmet());

if (process.env.NODE_ENV === 'development') {
  app.use(Logger());
}

app.use(cors({ credentials: true }));

// You can add more keys as needed to this array;
app.keys = [process.env.SECRET_KEY];
app.use(session(app, app));

// auth setup
require('./auth');
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser({
  enableTypes: ['json'],
  jsonLimit: '5mb',
  strict: true,
  onerror: function (err: Error, ctx: Context) {
    ctx.throw('body parse error', 422);
  },
}));

app.use(new CSRF());

// API routes
require('./routes')(router);

app.use(respond());

app.use(router.routes());
app.use(router.allowedMethods());


module.exports = app;
