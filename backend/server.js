const Koa = require('koa');
const Router = require('@koa/router');
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

const app = new Koa();
const router = new Router();

app.use(Helmet());

if (process.env.NODE_ENV === 'development') {
  app.use(Logger());
}

app.keys = [process.env.SECRET_KEY];

app.use(cors({ credentials: true }));
// You can add more keys as needed to this array;
app.use(session(app, app));

app.use(bodyParser({
  enableTypes: ['json'],
  jsonLimit: '5mb',
  strict: true,
  onerror: function (err, ctx) {
    ctx.throw('body parse error', 422);
  },
}));


app.use(CSRF({
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' && "Lax",
    httpOnly: true
}));

//make a csrfrouter and use it here so we have access to what we need.
//set csrf here...
// const restoreCSRF = (ctx) => {
//   console.log(ctx.state._csrf);
//   ctx.cookies.set("XSRF-TOKEN", ctx.state._csrf);
// }

// app.use(restoreCSRF);


//!@#$ csrf injected here
router.get("/api/csrf/restore", (ctx, next) => {
      ctx.cookies.set("XSRF-TOKEN", ctx.state._csrf);
      console.log(ctx.cookies.get("XSRF-TOKEN"));
      ctx.send(201, "CSRF Restored Succesfully");
});

// auth setup
require('./auth');
app.use(passport.initialize());
app.use(passport.session());

// API routes
require('./routes')(router);
app.use(respond());

app.use(router.routes());
app.use(router.allowedMethods());


module.exports = app;
