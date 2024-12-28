const mongoose = require('mongoose');

const houseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('House', houseSchema);