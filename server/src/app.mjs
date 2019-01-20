import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { app as appConfig } from './config';
import { default as routes } from './routes';

const app = express();
app.use(bodyParser.json());
app.use(cors());

routes(app);

app.listen(appConfig.port);