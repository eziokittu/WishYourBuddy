const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {type: String, required: true, unique: true },
    password: {type: String, required: true },
    isAdmin: {type: Boolean, required: true, default: false },
    isPaid: {type: Boolean, required: true, default: false },
    userName: { type: String, required: true, unique: true },

    pages: [{type: mongoose.Types.ObjectId, ref: 'Page' }]
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);