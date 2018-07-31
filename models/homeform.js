const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  llat: { type: String, required: true },
  llong: { type: String, required: true }
});

const Review = mongoose.model('Review', ReviewSchema);
module.exports = Loc;
