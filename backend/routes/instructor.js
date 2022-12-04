const router = require('express').Router();
let Course = require('../models/course.model');
let Instructor = require('../models/user.model');

const projection = { __v: 0, createdAt: 0, updatedAt: 0, dateAdded: 0 };

router.route('/').get(async (req, res) => {
  var docs = await Instructor.find()
    .select(projection)
    .catch(err => res.status(500).json('Error: ' + err));
  var new_docs = docs.filter(instructor => instructor.userType === 'instructor');
  console.log(new_docs);
  res.json(new_docs);
});

router.route('/:user').put(async(req, res) => {
  await Instructor.updateOne({username: req.params.user}, {rating : req.query.rating})
  res.json({text: 'successful'})
});

router.route('/:user').get(async(req, res) => {
  var user = await Instructor.findOne({username: req.params.user})
  .select(projection)
  .catch(err => res.status(500).json('Error: ' + err));
  res.json(user)
});

router.route('/:user/my-courses').get(async (req, res) => {
  const searchString = req.query.query;
  const user = req.params.user;
  const regExp = new RegExp(searchString, 'i');  //case-insensitive regular expression
  const minPrice = req.query.minPrice ? parseInt(req.query.minPrice) : undefined;
  const maxPrice = req.query.maxPrice ? parseInt(req.query.maxPrice) : undefined;
  const subject = req.query.subject;
  var docs; var newDocs; var filteredDocs;

  if (searchString) {
    docs = await Course.find({ instructorUsername: user })
      .or([{ title: { $regex: regExp } }, { subject: { $regex: regExp } }]).limit(10)
      .select(projection)
      .catch(err => res.status(500).json('Error: ' + err));
  }
  else {
    docs = await Course.find({ instructorUsername: user }).limit(10)
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

router.route('/:user/add-course').post((req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const instructorUsername = req.params.user;
  const subject = req.body.subject;
  const price = req.body.price;
  const subtitles = req.body.subtitles;

  const newCourse = new Course({
    title,
    rating: 0,
    description,
    instructorUsername,
    subject,
    price,
    subtitles,
    exercises: []
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