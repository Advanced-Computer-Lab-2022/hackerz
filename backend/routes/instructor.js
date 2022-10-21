const router = require('express').Router();
let Course = require('../models/course.model');

const projection = {_id:0, __v: 0, createdAt: 0, updatedAt: 0, dateAdded: 0};

// router.route('/').get((req, res) => {
//   Course.find()
//     .then(courses => res.json(courses))
//     .catch(err => res.status(500).json('Error: ' + err));
// });
router.route('/:user/my-courses').get((req, res) => {
    const searchString = req.query.query;
    const user = req.params.user;
    const regExp = new RegExp(searchString,'i');  //case-insensitive regular expression
    if (searchString){
        Course.find({instructorUsername: user})
        .or([{title: {$regex: regExp}},{subject:{$regex: regExp}}]).limit(10)
        .select(projection)
        .then(courses => res.json(courses))
        .catch(err => res.status(500).json('Error: ' + err));} 
    else {
        Course.find({instructorUsername: user}).limit(10)
        .select(projection)
        .then(courses => res.json(courses))
        .catch(err => res.status(500).json('Error: ' + err));
    }
 });

router.route('/:user/add-course').post((req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const duration = Number(req.body.duration);
//   const dateAdded = Date.parse(req.body.date)
  const dateAdded = Date.now();
  const instructorUsername = req.params.user;
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