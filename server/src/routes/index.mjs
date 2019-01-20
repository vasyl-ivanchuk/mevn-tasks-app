import * as userRoute from './user';
import { loginPolicy } from '../policies/loginPolicy';
import * as tokenProvider from '../auth/tokenProvider';

export default (app) => {
    app.post('/login', loginPolicy, userRoute.login(tokenProvider));
};