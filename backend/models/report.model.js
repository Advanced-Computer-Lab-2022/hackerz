const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reportSchema = new Schema({
  repType: { type: String, required: true },
  description: { type: String, required: true },
  user: {
    type: String,
    required: true,
    ref: 'User'
},
course: {//course id
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Course'
},
status: {
  type: String,
  enum : ['Unseen','Pending','Resloved'],
  default: 'Unseen'
}
}, {
  timestamps: true,
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
