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

const app = new Koa();
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
  onerror: function (err, ctx) {
    ctx.throw('body parse error', 422);
  },
}));

app.use(new CSRF());

// API routes
require('./routes')(router);

if (process.env.NODE_ENV === 'production') {
  // Serve the frontend's index.html file at the root route
  router.get('/', async (ctx, next) => {
    ctx.cookies.set('XSRF-TOKEN', ctx.csrf, {
      httpOnly: false,
      sameSite: 'strict',
    });

    await koaSend(ctx, 'index.html', {
      root: path.join(__dirname, '..', 'frontend', 'build'),
    });
  });

  // Serve the static assets in the frontend's build folder
  app.use(serve(path.join(__dirname, '..', 'frontend', 'build')));

  // Serve the frontend's index.html file at all other routes NOT starting with /api
  router.get(/^(?!\/?api).*/, async (ctx, next) => {
    ctx.cookies.set('XSRF-TOKEN', ctx.csrf, {
      httpOnly: false,
      sameSite: 'strict',
    });

    await koaSend(ctx, 'index.html', {
      root: path.join(__dirname, '..', 'frontend', 'build'),
    });
  });
}

app.use(router.routes());
app.use(router.allowedMethods());
app.use(respond());

module.exports = app;
