import mongoose from 'mongoose';
import { default as validator } from 'validator';
import mongooseBcrypt from 'mongoose-bcrypt';
import mongooseTimestamps from 'mongoose-timestamp';
import bcrypt from 'bcryptjs';
const Schema = mongoose.Schema;
const SALT_ROUNDS = 10;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: validator.isEmail
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        bcrypt: true
    },
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }]
});

UserSchema.virtual('fullName').get(function () { return `${this.firstName} ${this.lastName}`; });

UserSchema.plugin(mongooseBcrypt), { rounds: SALT_ROUNDS };
UserSchema.plugin(mongooseTimestamps);

UserSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

export const User = mongoose.model('User', UserSchema);