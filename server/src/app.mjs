import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { app as appConfig } from './config';
import { default as routes } from './routes';
import * as db from './db';
import { init as authInit } from './auth/authModule';

const app = express();
app.use(bodyParser.json());
app.use(cors());
authInit();

routes(app);

db.connect().then(() => {
    const server = app.listen(appConfig.port);

    const shutdown = () => {
        db.close();
        server && server.close(e => {
            if (e) {
                console.error(e);
                process.exit(1);
            }
            process.exit();
        });
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
    process.on('unhandledRejection', shutdown);
}).catch(() => {
    db.close();
});