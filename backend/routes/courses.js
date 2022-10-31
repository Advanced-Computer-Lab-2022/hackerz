const router = require('express').Router();
let Course = require('../models/course.model');
let countries = require('../../src/countries.json');
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
        .or([{title: {$regex: regExp}},{instructorUsername:{$regex: regExp}},{subject:{$regex: regExp}}]).limit(10)
        .select(projection)
        .catch(err => res.status(500).json('Error: ' + err));} 
    else {
        docs = await Course.find().limit(10)
        .select(projection)
        .catch(err => res.status(500).json('Error: ' + err));
    }

    //const countries = {EG: {ratio: 1, currency: "EGP"}, US: {ratio: 22.5, currency: "USD"}}
    //console.log(req.query.country + '27');
    var country = req.query.country; //just for testing
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

module.exports = router;