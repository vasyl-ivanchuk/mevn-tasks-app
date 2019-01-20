import * as userRoute from './user';

export default (app) => {
    app.post('/', userRoute.login);
};