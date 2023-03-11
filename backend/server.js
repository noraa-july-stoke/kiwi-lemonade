const Koa = require('koa');
const Router = require('koa-router');
const Logger = require('koa-logger');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const Helmet = require('koa-helmet');
const respond = require('koa-respond');
const session = require("koa-session"); // Import authentication sessions
const passport = require('koa-passport');
const mongoose = require('mongoose');

const app = new Koa();
const router = new Router();

app.use(Helmet());

if (process.env.NODE_ENV === 'development') {
  app.use(Logger())
};

app.use(cors({ credentials: true }));
app.keys = [process.env.SECRET_KEY];
app.use(session(app));

//auth setup
//get auth file functions;
require('./auth');
// Intialize passport authentication
app.use(passport.initialize());
// Initialize passport sessions
app.use(passport.session())

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
//logs errors;
db.on('error', console.error.bind(console, "connection error:"));

app.use(bodyParser({
  enableTypes: ['json'],
  jsonLimit: '5mb',
  strict: true,
  onerror: function (err, ctx) {
    ctx.throw('body parse error', 422)
  }
}));

app.use(respond());
// API routes
require('./routes')(router);
app.use(router.routes());
app.use(router.allowedMethods());

module.exports = app
