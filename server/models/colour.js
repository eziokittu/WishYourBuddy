const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const colourSchema = new Schema({
  name: {type: String, required: true, unique: true }
});

colourSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Colour', colourSchema);