import mongoose from 'mongoose';
import mongooseTimestamps from 'mongoose-timestamp';
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    description: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    }
});

TaskSchema.plugin(mongooseTimestamps);

export const Task = mongoose.model('Task', TaskSchema);