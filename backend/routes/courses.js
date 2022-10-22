const router = require('express').Router();
let Course = require('../models/course.model');

const projection = {_id:0, __v: 0, createdAt: 0, updatedAt: 0, dateAdded: 0};

router.route('/').get( async (req, res) => {
    const searchString = req.query.query;
    const subject = req.query.subject;
    const regexp_subject =new RegExp(subject,'i'); 
    const rating = req.query.rating;
    const price = req.query.price;

    const regExp = new RegExp(searchString,'i');  //case-insensitive regular expression
    var docs;
    if (searchString){
       docs = await Course.find()
        .or([{title: {$regex: regExp}},{instructor:{$regex: regExp}},{subject:{$regex: regExp}}]).limit(10)
        .select(projection)
    
        .catch(err => res.status(500).json('Error: ' + err));} 
    else {
      docs= await  Course.find().limit(10)
        .select(projection)
        
        .catch(err => res.status(500).json('Error: ' + err));
    }
    if (subject && rating){
      docs= await Course.find({subject:subject,rating:rating}).limit(10).select(projection).catch(err => res.status(500).json('Error: ' + err));
    }
    else if (subject) {
        docs= await Course.find({subject:subject}).limit(10).select(projection).catch(err => res.status(500).json('Error: ' + err));
    }
    
    else if (rating){
      
        docs= await Course.find({rating:rating}).limit(10).select(projection).catch(err => res.status(500).json('Error: ' + err));
    }
          //docs= Course.find({rating:rating}).select(projection).limit(10).then( res.json(docs.map(doc=> doc.rating).sort())).catch(err => res.status(500).json('Error: ' + err));
        
         // res.json(docs);
      
     if (price){
        if (price=="asc"){
            docs.sort({price:1});
        }
        else
        docs.sort({price:-1});
     }
     res.json(docs);
});

router.route('/:id').get((req, res) => {
    Course.findById(req.params.id).select(projection)
      .then(course => res.json(course))
      .catch(err => res.status(500).json('Error: ' + err));
  });

module.exports = router;