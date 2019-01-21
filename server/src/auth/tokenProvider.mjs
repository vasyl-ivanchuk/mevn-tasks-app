import jwt from 'jsonwebtoken';
import { auth } from '../config';

export function getAuthToken(user) {
    return jwt.sign(user, auth.secret, {
        expiresIn: auth.tokenExpiresIn
    });
}