//This file sets up KoaJS and MongoDB;
const passport = require('koa-passport');
const bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-locals').Strategy;
const User = require('./models/user');

const options = {};

// Utility functions for user serialization
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.serializeUser((id, done) => {
    User.findById(id, (err, user) => {done(err,user)});
});

passport.use(
    new LocalStrategy(options, (username, password, done) => {
        User.findOne({username: username}, (err, user) => {
            if (!user) return done(null, false);
            if (comparePass(password, user.password)) {
                return done(null, user);
            }
            else {
                return done(null, false)
            }
        });
}));


// Utility function to compare passwords with hashed versions
function comparePass(userPassword, databasePassword) {
    return bcrypt.compareSync(userPassword, databasePassword);
}
