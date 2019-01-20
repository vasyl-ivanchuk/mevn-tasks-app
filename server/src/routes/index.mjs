import * as userRoute from './user';
import { loginPolicy } from '../policies/loginPolicy';
import * as tasksRoute from './tasks';
import * as tokenProvider from '../auth/tokenProvider';
import { isAuthenticated } from '../policies/isAuthenticated';
import { taskItemPolicy } from '../policies/taskItemPolicy';

export default (app) => {
    app.post('/login', loginPolicy, userRoute.login(tokenProvider));
    app.get('/tasks', isAuthenticated, tasksRoute.get);
    app.post('/task', isAuthenticated, taskItemPolicy, tasksRoute.create);
    app.put('/tasks/:id', isAuthenticated, taskItemPolicy, tasksRoute.update);
    app.delete('/tasks/:id', isAuthenticated, tasksRoute.remove);
};