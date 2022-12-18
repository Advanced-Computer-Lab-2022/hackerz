const router = require('express').Router();
let Course = require('../models/course.model');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const requireAuthcorpTrainee = require('../Middleware/Autho')
router.use(
    requireAuthcorpTrainee
  );
const projection = {__v: 0, createdAt: 0, updatedAt: 0, dateAdded: 0, price: 0};


router.route('/courses').get( async (req, res) => {
    const searchString = req.query.query;
    const regExp = new RegExp(searchString,'i');  //case-insensitive regular expression
    const rating = req.query.rating ? parseInt(req.query.rating) : undefined;
    const subject = req.query.subject;
    var docs; var newDocs;
    
    if (searchString){
        docs = await Course.find()
        .or([{title: {$regex: regExp}},{instructorUsername:{$regex: regExp}},{subject:{$regex: regExp}}]).limit(10)
        .select(projection)
        .catch(err => res.status(500).json('Error: ' + err));} 
    else {
        docs = await Course.find().limit(10)
        .select(projection)
        .catch(err => res.status(500).json('Error: ' + err));
    }
    

    if (subject && rating) newDocs = docs.filter(course => course.subject === subject && course.rating === rating); //filtering
    else if (subject) newDocs = docs.filter(course => course.subject === subject);
    else if (rating) newDocs = docs.filter(course => course.rating === rating);
    else newDocs = docs;

    res.json(newDocs);

});

router.route('/courses/:id').get((req, res) => {
    Course.findById(req.params.id).select(projection)
      .then(course => res.json(course))
      .catch(err => res.status(500).json('Error: ' + err));
});

module.exports = router;