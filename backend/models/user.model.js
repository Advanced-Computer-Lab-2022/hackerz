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
  country: {type:String},
  userbiography:{
    type: String,
    required: false,
    unique: false,
    trim: true
  },
  useremail:{
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 11
  }
},
 {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;