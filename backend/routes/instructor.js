const router = require('express').Router();
let Course = require('../models/course.model');

router.route('/').get((req, res) => {
  Course.find()
    .then(courses => res.json(courses))
    .catch(err => res.status(500).json('Error: ' + err));
});

router.route('/add-course').post((req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const duration = Number(req.body.duration);
//   const dateAdded = Date.parse(req.body.date)
  const dateAdded = Date.now();
  const instructorUsername = req.body.username;
  const subject = req.body.subject;

  const newCourse = new Course({
    title,
    description,
    duration,
    dateAdded,
    instructorUsername,
    subject
  });

  newCourse.save()
  .then(() => res.json('Course added!'))
  .catch(err => res.status(500).json('Error: ' + err));
});

// router.route('/:id').get((req, res) => {
//   Course.findById(req.params.id)
//     .then(course => res.json(course))
//     .catch(err => res.status(500).json('Error: ' + err));
// });

// router.route('/:id').delete((req, res) => {
//   Course.findByIdAndDelete(req.params.id)
//     .then(() => res.json('Course deleted.'))
//     .catch(err => res.status(500).json('Error: ' + err));
// });


module.exports = router;