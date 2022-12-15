require("dotenv/config");
const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");

const options = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

passport.use(
  new Strategy(options, (payload, done) => {
    done(null, payload);
  })
);

module.exports = passport;