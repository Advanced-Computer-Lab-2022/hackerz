const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reportSchema = new Schema({
  repType: { type: String, required: true },
  description: { type: String, required: true },
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

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
