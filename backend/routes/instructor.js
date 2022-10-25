const router = require('express').Router();
let Course = require('../models/course.model');

//retrieves all courses in the DB when req = localhost:5000/instructor
//and throws error if none are found
router.route('/').get((req, res) => {
  Course.find()
    .then(courses => res.json(courses))
    .catch(err => res.status(400).json('Error: ' + err));
});

//is the body in json format and we extract data from?
router.route('/add-course').post((req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const dateAdded = Date.parse(req.body.date);

  const newCourse = new Course({
    title,
    description,
    duration,
    dateAdded,
  });

  //adds the new course in the DB and throws an error if something goes wrong
  newCourse.save()
  .then(() => res.json('Course added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});
//gets a certain course with a specific if when req = localhost:5000/instructor/courses/5776
router.route('/courses/:id').get((req, res) => {
  Course.findById(req.params.id)
    .then(course => res.json(course))
    .catch(err => res.status(400).json('Error: ' + err));
});

// get all courses by the instructor
router.route('/:username').get((req, res) => {
    Course.find({instructorUsername: req.params.username})
      .then(courses => res.json(courses))
      .catch(err => res.status(400).json('Error: ' + err));
  });



module.exports = router;