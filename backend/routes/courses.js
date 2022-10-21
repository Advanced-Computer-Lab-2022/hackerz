const router = require('express').Router();
let Course = require('../models/course.model');

const projection = {_id:0, __v: 0, createdAt: 0, updatedAt: 0, dateAdded: 0};

router.route('/').get((req, res) => {
    const searchString = req.query.query;
    const regExp = new RegExp(searchString,'i');  //case-insensitive regular expression
    if (searchString){
        Course.find().or([{title: {$regex: regExp}},{instructor:{$regex: regExp}},{subject:{$regex: regExp}}]).limit(10)
        .select(projection)
        .then(courses => res.json(courses))
        .catch(err => res.status(500).json('Error: ' + err));} 
    else {
        Course.find().limit(10)
        .select(projection)
        .then(courses => res.json(courses))
        .catch(err => res.status(500).json('Error: ' + err));
    }
});

router.route('/:id').get((req, res) => {
    Course.findById(req.params.id).select(projection)
      .then(course => res.json(course))
      .catch(err => res.status(500).json('Error: ' + err));
  });

module.exports = router;