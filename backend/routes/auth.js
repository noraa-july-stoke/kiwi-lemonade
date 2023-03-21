const Router = require('@koa/router');
const router = new Router();
const Ctrl = require('../controllers/auth');

router.get('/', (ctx, next) => {
    ctx.body = "Hello, auth!";
});


//!@#$ controllers for auth.
router.post('/login', Ctrl.login);
router.post('/signup', Ctrl.signup);
router.get('/status', Ctrl.status);
router.get('/logout', Ctrl.logout);

module.exports = router.routes();
