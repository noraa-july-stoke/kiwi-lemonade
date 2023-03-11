const User = require('../models/User');
const passport = require('koa-passport');
const bcrypt = require('bcryptjs');
const { countDocuments } = require('../models/User');

// logs in user
const login = async (ctx) => {
    return passport.authenticate('local', (err, user, info, status) => {
        if (user) {
            ctx.login(user);
            ctx.redirect('/api/auth/status');
        } else {
            ctx.status = 400;
            ctx.body = {status: "error"}
        }
    })(ctx);
}

//signup function
const signup = async (ctx) => {
    // console.log(ctx.request.body);
    // generate salt
    const salt = bcrypt.genSaltSync();
    //generate hash w/password & salt
    const hash = bcrypt.hashSync(ctx.request.body.password, salt);

    const newUser = new User({
        username: ctx.request.body.username,
        password: hash
    });

    const savedUser = await newUser.save().catch((err) => {
        console.log(err);
        // console.log(savedUser);
    });

    if (savedUser) {
        return passport.authenticate("local", (err, user, info, status) => {
            if (err) {
                ctx.status = 401;
                ctx.body = { status: "error authenticating user", message: err.message };
            } else if (user) {
                ctx.login(user);
                ctx.redirect("/api/auth/status");
            } else {
                ctx.status = 400;
                ctx.body = { status: "error authenticating new user" };
            }
        })(ctx);
    } else {
        ctx.status = 400;
        ctx.body = { status: "error creating new user" };
    }

}

//gets auth status
const status = async (ctx) => {
    ctx.body = {}
    if (ctx.isAuthenticated()) {
        ctx.body.user = {
            id: ctx.state.user.id,
            name: ctx.state.user.username,
        };
        ctx.body.authenticated = true
    } else {
        ctx.body.user = null;
        ctx.body.authenticated = false;
    }
}

//logs user out
const logout = async (ctx) => {
    if (ctx.isAuthenticated()) {
        ctx.logout();
        ctx.status = 200;
        ctx.body = "logged out";
    } else {
        //throw error
        ctx.body = {success: false, message: "error logging out"};
        ctx.throw(401);
    }
}


module.exports = {
    login,
    signup,
    status,
    logout
}
