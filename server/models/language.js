const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const languageSchema = new Schema({
  name: {type: String, required: true, unique: true }
});

languageSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Language', languageSchema);