let db          = require('../models/db.js');
const User          = require('../models/user_model.js');
const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy   = require('passport-jwt').Strategy;
const ExtractJwt    = require('passport-jwt').ExtractJwt;
const JwtOpts       = {};


JwtOpts.jwtFromRequest = function(req) {
  let token = null;
  if (req && req.cookies) {
      token = req.cookies['jwt_token'];
  }
  return token;
};

JwtOpts.secretOrKey = process.env.JWT_SECRET;

passport.use(new JwtStrategy(JwtOpts, (jwtToken, done) => {
  User.findByUsername(jwtToken.username).then((user) => {
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
}));

passport.use(new LocalStrategy((username, password, done) => {
  User.findByUsername(username).then((user) => {
    if (!user) {
      // If we want to send back flash messages with a description of the error
      // We would need to install express-flash for this to work

      // return done(null, false, { message: 'Incorrect username.' });
      return done(null, false);
    }

    if (user.password !== password) {
      // return done(null, false, { message: 'Incorrect password.' });
      return done(null, false);
    }

    return done(null, user);
  });
}));


module.exports = passport;
