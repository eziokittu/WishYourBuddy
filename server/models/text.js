const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const textSchema = new Schema({
  name: {type: String, required: true, unique: true },
  colour: {type: mongoose.Types.ObjectId, required: true, ref: 'Colour' },
  language: {type: mongoose.Types.ObjectId, required: true, ref: 'Language' },
  font: {type: mongoose.Types.ObjectId, required: true, ref: 'Font' },
});

textSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Text', textSchema);