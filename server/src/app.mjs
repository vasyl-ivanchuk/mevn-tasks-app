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
    app.listen(appConfig.port);
}).catch(() => {
    db.close();
});