import passport from 'passport';
import { default as asyncHandler } from 'express-async-handler';

export const authenticate = (req, res, next, err, user) => {
    if (err) {
        next(err);
    }
    else if (!user) {
        res.status(403).json({
            error: 'Access forbiden.'
        });
    } else {
        req.user = user;
        next();
    }
};

export const isAuthenticated = asyncHandler(async (req, res, next) => {
    passport.authenticate('jwt', (err, user) => {
        authenticate(req, res, next, err, user);
    })(req, res, next);
});

