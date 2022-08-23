const mongoose = require('../db/connection');

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            // unique: true,
        },
        password: {
            type: String,
        },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: (_doc, ret) => {
                delete ret.password;
                return ret;
            },
        },
    }
);

const Users = mongoose.model('Users', UserSchema);

module.exports = Users;