const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courseSchema = new Schema({
  title: { type: String, required: true },
  rating: { type: Number },
  description: { type: String, required: true },
  instructorUsername: {type: String, required: true },
  subject: { type: String, required: true },
  price: { type: Number, required: true },
  subtitles : [{ title: { type: String }, description :{ type: String }, duration: { type: Number }}],
  exercises: [{ id: { type: String }}],
  reviews: [{ reviewID: { type: String }}]
}, {
  timestamps: true,
});

courseSchema.index({name: 'text', instructorUsername: 'text', subject: 'text'});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;