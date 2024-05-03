import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
    },
});
