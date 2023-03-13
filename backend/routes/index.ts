import { Context, Next } from "koa";
import Router from "koa-router";
const koaSend = require('koa-send');
const serve = require('koa-static');
const path = require('path');


// the index router is defined as a function by convention
module.exports = (router: Router) => {
  if (process.env.NODE_ENV === 'production') {
    // Serve the frontend's index.html file at the root route
    router.get('/', async (ctx: Context, next: Next) => {
      ctx.cookies.set('XSRF-TOKEN', ctx.csrf, {
        httpOnly: false,
        sameSite: 'strict',
      });

      await koaSend(ctx, 'index.html', {
        root: path.join(__dirname, '..', 'frontend', 'build'),
      });
    });

    // Serve the static assets in the frontend's build folder
    router.use(serve(path.join(__dirname, '..', 'frontend', 'build')));

    // Serve the frontend's index.html file at all other routes NOT starting with /api
    router.get(/^(?!\/?api).*/, async (ctx: Context, next: Next) => {
      ctx.cookies.set('XSRF-TOKEN', ctx.csrf, {
        httpOnly: false,
        sameSite: 'strict',
      });

      await koaSend(ctx, 'index.html', {
        root: path.join(__dirname, '..', 'frontend', 'build'),
      });
    });
  } else {
    router.get('/api/csrf/restore', (ctx: Context, next: Next) => {
      ctx.cookies.set('XSRF-TOKEN', ctx.csrf, {
        httpOnly: false,
        sameSite: 'strict',
      });
      ctx.send(201, "CSRF Restored Succesfully")
    });
  }

  router.use("/api", require("./api"));
}
