// the index router is defined as a function by convention
module.exports = (router) => {
  // if (process.env.NODE_ENV === 'production') {
  //   // Serve the frontend's index.html file at the root route
  //   router.get('/', async (ctx, next) => {
  //     ctx.cookies.set("XSRF-TOKEN", ctx.state._csrf, {
  //       httpOnly: false,
  //       sameSite: "strict",
  //     });

  //     await koaSend(ctx, 'index.html', {
  //       root: path.join(__dirname, '..', 'frontend', 'build'),
  //     });
  //   });
  //   // Serve the static assets in the frontend's build folder
  //   router.use(serve(path.join(__dirname, '..', 'frontend', 'build')));
  //   // Serve the frontend's index.html file at all other routes NOT starting with /api
  //   router.get(/^(?!\/?api).*/, async (ctx, next) => {
  //     ctx.cookies.set("XSRF-TOKEN", ctx.state._csrf);

  //     await koaSend(ctx, 'index.html', {
  //       root: path.join(__dirname, '..', 'frontend', 'build'),
  //     });
  //   });
  // }
  // // else {
  //   router.get('/api/csrf/restore', (ctx, next) => {
  //     ctx.cookies.set('XSRF-TOKEN', ctx.state._csrf);
  //     console.log(ctx.cookies.get("XSRF-TOKEN"));
  //     ctx.send(201, `CSRF Restored Succesfully: ${ctx.cookies.get('XSRF-TOKEN')} ${ctx.state._csrf}`);
  //   });
  // }
  router.use("/api", require("./api"));
}
