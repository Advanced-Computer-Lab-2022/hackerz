const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reportSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dateAdded: { type: Date, required: true },
  user: {//user id
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
},
course: {//course id
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Course'
},
}, {
  timestamps: true,
});

reportSchema.index({name: 'text', instructorUsername: 'text', subject: 'text'});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
