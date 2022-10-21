const router = require('express').Router();
let Course = require('../models/course.model');

router.route('/').get((req, res) => {
    const searchString = req.query.query;
    if (searchString){
        Course.find({$text: {$search: searchString}}).limit(10)
        .then(courses => res.json(courses))
        .catch(err => res.status(500).json('Error: ' + err));} 
    else {
        Course.find().limit(10)
        .then(courses => res.json(courses))
        .catch(err => res.status(500).json('Error: ' + err));
    }
});

router.route('/:id').get((req, res) => {
    Course.findById(req.params.id)
      .then(course => res.json(course))
      .catch(err => res.status(500).json('Error: ' + err));
  });

module.exports = router;