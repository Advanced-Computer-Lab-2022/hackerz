const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  title: { type: String, required: true },
  questions : [{ questionText: { type: String }, 
    answerOptions : [{ 
        answerText: { type: String } , isCorrect: { type: Boolean }
        }]
    }]
}, {
  timestamps: true,
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;