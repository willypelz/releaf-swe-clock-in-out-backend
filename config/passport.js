const passport = require('passport');
const user = require('../models/user');

const jwt = require('jwt-simple');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const AuthRepository = require('../repositories/AuthRepository');
const config = require('../config/config');

passport.use(new LocalStrategy(
    {
        usernameField: 'staff_id',
        passwordField: 'password',
    },
    async (staff_id, password, done) => {
        const response = await (new AuthRepository()).login(staff_id, password);
        if (("error" in response)) return done(null, response);
        done(null, {token: jwt.encode(response.user, config.authSecret), user: response.user});
    }));

passport.use(new BearerStrategy((token, done) => {
    try {
        const {staff_id} = jwt.decode(token, config.authSecret);
        user.findOne({staff_id})
            .then((user) => {(!user) ? done(null, false) : done(null, user);}).catch(done);
    } catch (error) {
        done(null, false);
    }
}));
