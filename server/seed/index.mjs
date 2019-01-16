import { connect, close } from '../src/db';
import { User } from '../src/models/user';

connect().then(async () => {
    global.console.log('Removing existing items');
    await User.deleteMany({});

    global.console.log('Creating seed data');
    await User.create(
        { email: 'email@domain.com', firstName: 'Vasyl', lastName: 'Ivanchuk', password: 'abcABC123' }
    );
}).finally(() => {
    global.console.log('Closing mongo connection');
    close();
});