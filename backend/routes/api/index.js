const Router = require('koa-router');
const sessionRouter = require('./session.js');
const { restoreUser } = require("../../utils/auth.js");

const router = new Router();

// Connect restoreUser middleware to the API router
// If current user session is valid, set ctx.state.user to the user in the database
// If current user session is not valid, set ctx.state.user to null
router.use(restoreUser);

router.use('/session', sessionRouter.routes());

router.post('/test', async (ctx) => {
    ctx.body = { requestBody: ctx.request.body };
});

module.exports = router;
