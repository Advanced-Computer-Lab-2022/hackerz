const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  userType: {
    type: String,
    // required: true,
    enum : ['admin','instructor','individualTrainee','corpTrainee','guest']
  },
  password: {
    type: String,
    required: true,
    unique: false,
    trim: true,
    minlength: 4
  },
  rating: { type: Number },
  country: { type:String }
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;