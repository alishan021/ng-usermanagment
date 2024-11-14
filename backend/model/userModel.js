
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: 'string',
    email: 'string',
    password: 'string',
    isAdmin: {
        type: Boolean,
        default: false
    }
});

const userModel = new mongoose.model('User', UserSchema );
module.exports = userModel;

// {
//     "username": "alishan",
//     "email": "alishan@gmail.com",
//     "password": "password"
// }