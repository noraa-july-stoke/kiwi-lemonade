//This file sets up KoaJS and MongoDB;
const passport = require('koa-passport');
const bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User');

const options = {};

// Utility functions for user serialization
passport.serializeUser((user: any, done: any) => {
    done(null, user.id);
});

passport.serializeUser((id: number, done: any) => {
    User.findById(id, (err: Error, user: any) => {done(err,user)});
});

passport.deserializeUser((id: number, done: any) => {
    User.findById(id)
        .then((user: any) => done(null, user))
        .catch((err: Error) => done(err));
});

// Setup authentication
passport.use(
    new LocalStrategy(options, (username: string, password: string, done: any ) => {
        User.findOne({ username: username })
            .then((user: any) => {
                if (!user) return done(null, false);
                if (comparePass(password, user.password)) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            })
            .catch((err: {Error: any}) => done(err));
}));


// Utility function to compare passwords with hashed versions
function comparePass(userPassword, databasePassword) {
    return bcrypt.compareSync(userPassword, databasePassword);
}
