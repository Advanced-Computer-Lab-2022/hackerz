const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courseSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  dateAdded: { type: Date, required: true },
  subtitles:[{title:{type:String}, description:{type:String}, duration:{type: Number}, link:{type: String}}],
  previewlink:{type:String}
}, {
  timestamps: true,
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;