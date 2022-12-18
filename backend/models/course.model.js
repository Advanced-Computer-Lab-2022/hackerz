const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courseSchema = new Schema({
  title: { type: String, required: true },
  rating: { type: Number },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  dateAdded: { type: Date, required: true },
  subtitles:[{title:{type:String}, description:{type:String}, duration:{type: Number}, link:{type: String}}],
  previewlink:{type:String}
}, {
  timestamps: true,
});

courseSchema.index({name: 'text', instructorUsername: 'text', subject: 'text'});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
