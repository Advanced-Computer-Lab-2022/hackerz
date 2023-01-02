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
  firstlog:{type: Boolean},
  firstlog:{
    type:Boolean
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
  },
  enrolledCourses: [{type:String}],
  exercises: [{ 
    exerciseID: { type: String } , score: { type: Number }, maxScore: { type: Number }
    }],
  completedSubtitles: [{type: String}]
},
 {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;