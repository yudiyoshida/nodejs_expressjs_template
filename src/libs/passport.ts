import passport from 'passport';
import passportOptions from '@config/passport';

import { IPayloadDto } from '../modules/auth/dtos/payload.dto';
import { Strategy } from 'passport-jwt';

passport.use(
  new Strategy(passportOptions, (payload: IPayloadDto, done) => {
    done(null, payload);
  }),
);

export default passport;
