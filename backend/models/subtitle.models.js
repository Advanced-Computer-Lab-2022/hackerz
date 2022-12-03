const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const subtitleSchema = new Schema({
  title: { type: String, required: true, unique: true},
  description: { type: String, required: true },
  link:{type: String, required:true }
}, {
  timestamps: true,
});

courseSchema.index({name: 'text', instructorUsername: 'text', subject: 'text'});

const subtitle = mongoose.model('Subtitle', subtitleSchema);

module.exports = subtitle;