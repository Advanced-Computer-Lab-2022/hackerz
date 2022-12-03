const router = require('express').Router();
let Course = require('../models/course.model');

router.route('/').get((req, res) => {
  Course.find()
    .then(courses => res.json(courses))
    .catch(err => res.status(400).json('Error: ' + err));
});

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

  newCourse.save()
  .then(() => res.json('Course added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/courses/:id').get((req, res) => {
  Course.findById(req.params.id)
    .then(course => res.json(course))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/addsubtitle/:coursetitle/:subtitle').post(async(req, res) => {
  const link = req.body.link;
  const description = req.body.description;
  const subtitle=req.params.subtitle;
  var docs= await Course.find({title:req.params.coursetitle}).subtitles; 
 
    objIndex=docs.findindex((obj=>obj.subtitle== subtitle));
    docs[objIndex].link = link;
    docs[objIndex].description = description;
    res.json("link added");
    
   //console.log("Before update: ", myArray[objIndex]);//log obj to console
   //Update object's name property.(how to add youtube link)
   //Log object to console again.
});
router.route('/addpreview/:coursetitle').post(async(req, res) => {
  const link = req.body.link;
  const title= req.params.coursetitle;
let doc = await Course.findOneAndUpdate({title:title}, {previewlink:link});
res.json("preview link added");
});
router.route('/watchLink/:coursetitle/:subtitle').get(async(req, res) => {
  const subtitle=req.params.subtitle;
  var docs= await Course.find({title:req.params.coursetitle}).subtitles; 
 
    objIndex=docs.findindex((obj=>obj.subtitle== subtitle));
    res.json(docs[objIndex].link);
    //watch link frontend
});

// router.route('/:id').delete((req, res) => {
//   Course.findByIdAndDelete(req.params.id)
//     .then(() => res.json('Course deleted.'))
//     .catch(err => res.status(400).json('Error: ' + err));
// });
module.exports = router;
