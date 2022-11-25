const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courseSchema = new Schema({
  title: { type: String, required: true },
  rating: { type: Number, required: false },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  dateAdded: { type: Date, required: true },
  instructorUsername: {type: String, required: true },
  subject: { type: String, required: true },
  price: { type: Number, required: true }
}, {
  timestamps: true,
});

courseSchema.index({name: 'text', instructorUsername: 'text', subject: 'text'});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;