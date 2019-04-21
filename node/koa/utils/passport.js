// token鉴权
const { ExtractJwt, Strategy } = require('passport-jwt');
const keys = require('../config/keys');
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;
const mongoose = require('mongoose');
const User = mongoose.model('user');
module.exports = passport => {
  passport.use(new Strategy(opts, async function(jwt_payload, done) {
    const user = await User.findById(jwt_payload.id);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  }));
}
