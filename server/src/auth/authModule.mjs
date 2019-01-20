import passport from 'passport';
import { default as jwt } from 'passport-jwt';
import { User } from '../models/user';

import { auth } from '../config';
const { Strategy, ExtractJwt } = jwt;

export const init = () => passport.use(
    new Strategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: auth.secret
    }, async (jwtPayload, done) => {
        try {
            const user = await User.findById(jwtPayload._id);
            if (!user) {
                return done(new Error('Auth token is invalid'), false);
            }

            return done(null, user);
        } catch (err) {
            return done(new Error('Something went wrong'), false);
        }
    })
);