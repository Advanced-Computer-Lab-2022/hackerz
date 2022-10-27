const router = require('express').Router();
let Course = require('../models/course.model');
let User = require('../models/user.model');
let currencies = require('../models/currencies.json');

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

router.route('/:user/add-course').post(async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const dateAdded = Date.now();
  const instructorUsername = req.params.user;
  const subject = req.body.subject;
  const price = req.body.price;

  let course = await Course.find({
    title: title,
    instructorUsername: instructorUsername,
    subject: subject
  });
  const crs = Object.values(course).map((course) =>({
    title: course.title,
    instructorUsername: course.instructorUsername,
    subject: course.subject
  }));
  console.log(crs);

  if(crs.length !== 0){
    res.send("Course already exists!");
  } else {
  const newCourse = new Course({
    title,
    description,
    duration,
    dateAdded,
    instructorUsername,
    subject,
    price
  });
  newCourse.save()
  .then(() => res.send('Course added!'))
  .catch(err => res.status(500).json('Error: ' + err));
  }
});

/*router.route('/:user/:course').get(async (req, res) => {
  let this_course = await Course.find({
    title: req.params.course,
    instructorUsername: req.params.user
  });
  res.redirect('/:user/change-country');
  const courses = Object.values(this_course).map((this_course) =>({
    price: this_course.price
  }));
  let new_price = courses[0].price / currencies[req.body.country];
  res.json(new_price);
});

/*router.route('/:user/change-country').post(async (req, res) => {
  await User.findOneAndUpdate (
    {username: req.params.user},
    {country: req.body.country}
  );
});*/

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