const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  reviewed: { id: {type: String} },
  description: {type: String, required: true },
  reviewer: { id: {type: String} }
}, {
  timestamps: true,
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;