const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    role: String,
    status: String,
    mobile: String
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
