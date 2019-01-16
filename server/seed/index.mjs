import { connect, close } from '../src/db';
import { User } from '../src/models/user';
import { Task } from '../src/models/task';

connect().then(async () => {
    global.console.log('Removing existing items');
    await Task.deleteMany({});
    await User.deleteMany({});

    global.console.log('Creating seed data');
    const user = await User.create(
        { email: 'email@domain.com', firstName: 'Vasyl', lastName: 'Ivanchuk', password: 'abcABC123' }
    );

    const taskDate = new Date();
    await Task.create({ user: user._id, description: 'Task 1 description', dueDate: taskDate });

    taskDate.setDate(taskDate.getDate() - 7);
    await Task.create({ user: user._id, description: 'Task 2 description', dueDate: taskDate });

    taskDate.setDate(taskDate.getDate() + 14);
    await Task.create({ user: user._id, description: 'Task 3 description', dueDate: taskDate });


}).finally(() => {
    global.console.log('Closing mongo connection');
    close();
});