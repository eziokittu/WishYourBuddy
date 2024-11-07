const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

// This is the page Element Schema
const pageElementSchema = new Schema({
  type: { type: String, required: true, default: "text" },
  colour: { type: String, default: "white" },
  content: { type: String, default: "" },
  id: { type: String, required: true }
});

const pageSchema = new Schema({
  name: { type: String, required: true, unique: true, default: "page1" },
  pageElements: [pageElementSchema],
  creationDate: { type: Date, required: true, default: () => Date.now() },
  user: {type: mongoose.Types.ObjectId, ref: 'User' }
});

pageSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Page', pageSchema);
