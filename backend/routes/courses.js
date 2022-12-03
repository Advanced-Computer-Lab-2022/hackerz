const router = require('express').Router();
let Course = require('../models/course.model');
let countries = require('../../src/countries.json');
const Exercise = require('../models/exercise.model');
const User = require('../models/user.model');
const projection = {__v: 0, createdAt: 0, updatedAt: 0, dateAdded: 0};

router.route('/').get( async (req, res) => {
    const searchString = req.query.query;
    const regExp = new RegExp(searchString,'i');  //case-insensitive regular expression
    const minPrice = req.query.minPrice ? parseInt(req.query.minPrice) : undefined;
    const maxPrice = req.query.maxPrice ? parseInt(req.query.maxPrice) : undefined;
    const rating = req.query.rating ? parseInt(req.query.rating) : undefined;
    const subject = req.query.subject;
    var docs; var newDocs; var filteredDocs;

    if (searchString){
        docs = await Course.find()
        .or([{title: {$regex: regExp}},{instructorUsername:{$regex: regExp}},{subject:{$regex: regExp}}])
        //.limit(10)
        .select(projection)
        .catch(err => res.status(500).json('Error: ' + err));} 
    else {
        docs = await Course.find()
        //.limit(10)
        .select(projection)
        .catch(err => res.status(500).json('Error: ' + err));
    }

    var country = req.query.country;
    for(var doc in docs){
        docs[doc].price = (docs[doc].price/countries[country].ratio).toFixed(2);
    }
    
    if (subject && rating) newDocs = docs.filter(course => course.subject === subject && course.rating === rating); //filtering
    else if (subject) newDocs = docs.filter(course => course.subject === subject);
    else if (rating) newDocs = docs.filter(course => course.rating === rating);
    else newDocs = docs;

    if (minPrice && maxPrice) filteredDocs = newDocs.filter(course => course.price >= minPrice && course.price <= maxPrice);
    else if (minPrice) filteredDocs = newDocs.filter(course => course.price >= minPrice);
    else if (maxPrice) filteredDocs = newDocs.filter(course => course.price <= maxPrice);
    else filteredDocs = newDocs;

    res.json(filteredDocs);
});

router.route('/:id').get((req, res) => {
    Course.findById(req.params.id).select(projection)
      .then(course => res.json(course))
      .catch(err => res.status(500).json('Error: ' + err));
});

router.route('/:course/get-exercises').get( async (req, res) => {
    const course = req.params.course;
    //const user = req.body.user;
    const data = await Course.findOne({_id: course});
    //const currentUser = await User.findOne({username: user});
    var response = [];
    for(const exercise in data.exercises ){
        //GET SCORE FROM USER
        const currentExercise = await Exercise.findOne({_id: data.exercises[exercise]._id});
        const title = currentExercise.title;
        response.push({id: data.exercises[exercise]._id, title});
    }
    res.json(response);
  });

router.route('/:course/add-exercise').post( async (req, res) => {
    const title = req.body.title;
    const questions = req.body.questions;
    const course = req.params.course;

    const currentCourse = await Course.findOne({_id: course});

    const newExercise = new Exercise({ title, questions });
    console.log(currentCourse.exercises);
    currentCourse.exercises.push(newExercise._id);
    await currentCourse.save();
  
    newExercise.save()
    .then(() => res.json('Exercise added!'))
    .catch(err => res.status(500).json('Error: ' + err));
});
  

module.exports = router;