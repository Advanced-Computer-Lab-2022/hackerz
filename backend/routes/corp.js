const router = require('express').Router();
let Course = require('../models/course.model');
let CorpRequest = require('../models/corpRequests.model');
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

router.route('/:user/:id/requestAccess').post(async(req, res) => {
    const user = req.params.user;
    const course = req.params.id;
    const currentCourse = await Course.findById(req.params.id);
    const courseName = currentCourse.title;
    let exists = await CorpRequest.exists({corpUser: user, courseID: course, courseName});
    if(exists) res.json("Already Requested")
    else{
        const newRequest = new CorpRequest({corpUser: user, courseID: course, courseName});// creates a new request
        newRequest.save() 
            .then(() => res.json('Request Submitted!'))
            .catch(err => res.status(400).json('Error: ' + err)); //adds it to db and if it fails it throws an error
    }
});

module.exports = router;