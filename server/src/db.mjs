import mongoose from 'mongoose';
import { db } from './config';

mongoose.Promise = global.Promise;
export const connect =
    async () => mongoose.connect(`mongodb://${db.host}/${db.collectionName}`, { useNewUrlParser: true });

export const close = () => mongoose.connection && mongoose.connection.close();