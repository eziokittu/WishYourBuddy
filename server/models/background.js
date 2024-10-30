const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const backgroundSchema = new Schema({
  name: {type: String, required: true },
  colour: {type: mongoose.Types.ObjectId, required: true, ref: 'Colour' }
});

backgroundSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Background', backgroundSchema);