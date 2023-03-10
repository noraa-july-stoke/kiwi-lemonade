const Koa = require('koa');
const Router = require('koa-router');
const apiRouter = require('./api');

const app = new Koa();
const router = new Router();

router.use('/api', apiRouter.routes());

// Static routes
// Serve React build files in production
if (process.env.NODE_ENV === 'production') {
    const path = require('path');
    const serve = require('koa-static');
    const indexHtml = path.resolve(__dirname, '../../frontend', 'build', 'index.html');

    // Serve the frontend's index.html file at the root route
    router.get('/', async (ctx) => {
        ctx.cookies.set('XSRF-TOKEN', ctx.csrf, { httpOnly: false });
        await ctx.sendfile(indexHtml);
    });

    // Serve the static assets in the frontend's build folder
    router.use(serve(path.resolve("../frontend/build")));

    // Serve the frontend's index.html file at all other routes NOT starting with /api
    router.get(/^(?!\/?api).*/, async (ctx) => {
        ctx.cookies.set('XSRF-TOKEN', ctx.csrf, { httpOnly: false });
        await ctx.sendfile(indexHtml);
    });
}

// Add a XSRF-TOKEN cookie in development
if (process.env.NODE_ENV !== 'production') {
    router.get('/api/csrf/restore', async (ctx) => {
        ctx.cookies.set('XSRF-TOKEN', ctx.csrf, { httpOnly: false });
        ctx.status = 201;
        ctx.body = {};
    });
}

app.use(router.routes()).use(router.allowedMethods());

module.exports = router;
