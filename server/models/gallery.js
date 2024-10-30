const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const fontSchema = new Schema({
  name: {type: String, required: true }
});

fontSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Font', fontSchema);