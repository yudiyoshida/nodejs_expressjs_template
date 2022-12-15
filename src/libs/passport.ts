import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

const options = {
  secretOrKey: process.env.JWT_SECRET as string,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new Strategy(options, (payload, done) => {
    done(null, payload);
  }),
);

export default passport;
