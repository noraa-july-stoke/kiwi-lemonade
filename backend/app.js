const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const Cors = require("@koa/cors");
const Helmet = require('koa-helmet')
const respond = require('koa-respond')
const mongoose = require('mongoose')
const session = require("koa-session");

const app = new Koa();


//default config

app.usecors({credentials:true});
app.keys = [process.env.SECRET_KEY];
app.use(session(app));

app.use(bodyParser({
    // enableTypes: ['json'],
    jsonLimit: '7mb',
    strict: true,
    onerror: function (err, ctx) {
        ctx.throw('body parse error', 422)
    }
}))

app.listen(5001);
