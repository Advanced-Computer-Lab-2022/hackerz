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

  router.route('/:user/my-courses').get( async (req, res) => {
    const searchString = req.query.query;
    const user = req.params.user;
    const regExp = new RegExp(searchString,'i');  //case-insensitive regular expression
    const minPrice = req.query.minPrice ? parseInt(req.query.minPrice) : undefined;
    const maxPrice = req.query.maxPrice ? parseInt(req.query.maxPrice) : undefined;
    const subject = req.query.subject;
    var docs; var newDocs; var filteredDocs;

    if (searchString){
        docs = await Course.find({instructorUsername: user})
        .or([{title: {$regex: regExp}},{subject:{$regex: regExp}}]).limit(10)
        .select(projection)
        .catch(err => res.status(500).json('Error: ' + err));} 
    else {
        docs = await Course.find({instructorUsername: user}).limit(10)
        .select(projection)
        .catch(err => res.status(500).json('Error: ' + err));
    }

    if (subject) newDocs = docs.filter(course => course.subject === subject); //filtering
    else newDocs = docs;

    if (minPrice && maxPrice) filteredDocs = newDocs.filter(course => course.price >= minPrice && course.price <= maxPrice);
    else if (minPrice) filteredDocs = newDocs.filter(course => course.price >= minPrice);
    else if (maxPrice) filteredDocs = newDocs.filter(course => course.price <= maxPrice);
    else filteredDocs = newDocs;
    res.json(filteredDocs);

 });

module.exports = router;