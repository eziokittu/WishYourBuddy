const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const pageSchema = new Schema({
  name: {type: String, required: true },
  url: {type: String, required: true, default: 'internship' },
  fonts: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Font' }],
  texts: [{ type: String }],
  images: [{ type: String, required: true, minLength: 4, default: process.env.DB_DEFAULT_IMAGE }],
  date_start: {type: Date, required: true, default: Date.now() },
  date_end: {type: Date, required: true, default: Date.now() + 1000*60*60*24*2 } // 2 days
});

pageSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Page', pageSchema);