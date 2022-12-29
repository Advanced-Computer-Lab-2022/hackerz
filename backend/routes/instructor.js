const router = require('express').Router();
let Course = require('../models/course.model');

const projection = {__v: 0, createdAt: 0, updatedAt: 0, dateAdded: 0};

// router.route('/').get((req, res) => {
//   Course.find()
//     .then(courses => res.json(courses))
//     .catch(err => res.status(500).json('Error: ' + err));
// });
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

router.route('/:user/add-course').post((req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const instructorUsername = req.params.user;
  const subject = req.body.subject;
  const price = req.body.price;
  const subtitles = req.body.subtitles;

  const newCourse = new Course({
    title,rating: 0,
    description,
    instructorUsername,
    subject,
    price,
    subtitles
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


// router.route('/:user/my-courses/report/:user/:coursetitle').post( async (req, res) => {
// const user = req.params.user;
// const course = req.params.coursetitle;//how to get course id

// });


// router.route('/:id').delete((req, res) => {
//   Course.findByIdAndDelete(req.params.id)
//     .then(() => res.json('Course deleted.'))
//     .catch(err => res.status(500).json('Error: ' + err));
// });
module.exports = router;
