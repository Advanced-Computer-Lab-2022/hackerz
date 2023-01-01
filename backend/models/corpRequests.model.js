const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const corpReqSchema = new Schema({
  corpUser: {type: String},
  courseID: {type: String},
  courseName: {type: String}
}, {
  timestamps: true,
});

const CorpRequest = mongoose.model('CorpRequests', corpReqSchema);

module.exports = CorpRequest;