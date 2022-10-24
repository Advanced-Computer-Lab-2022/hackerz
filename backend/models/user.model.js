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
  country: {
    type: String,
    enum : ['Egypt', 'USA', 'Europe']
  }
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;