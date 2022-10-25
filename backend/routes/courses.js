const router = require('express').Router();
let Course = require('../models/course.model');

const projection = {_id:0, __v: 0, createdAt: 0, updatedAt: 0, dateAdded: 0};

router.route('/').get(async (req, res) => {
    const searchString = req.query.query;
    const subject = req.query.subject;
    const regexp_subject =new RegExp(subject,'i'); 
    const rating = req.query.rating ? parseInt(req.query.rating) : undefined;
    const minPrice = req.query.minPrice ? parseInt(req.query.minPrice) : undefined;
    const maxPrice = req.query.maxPrice ? parseInt(req.query.maxPrice) : undefined;
    var docs; var newDocs; var filteredDocs;


    const regExp = new RegExp(searchString,'i');  //case-insensitive regular expression
  
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
     /* if (subject) {
         docs= await docs.find({subject:subject}).limit(10).select(projection).catch(err => res.status(500).json('Error: ' + err));
     }
     
     else if (rating){
       
         docs= await docs.find({rating:rating}).limit(10).select(projection).catch(err => res.status(500).json('Error: ' + err));
     }
     else if (min){
      docs= await docs.find({price:{$gte:min,$lte:max}}).limit(10).select(projection).catch(err => res.status(500).json('Error: ' + err));
     }*/  if (subject && rating) newDocs = docs.filter(course => course.subject === subject && course.rating === rating); //filtering
    else if (subject) newDocs = docs.filter(course => course.subject === subject);
    else if (rating) newDocs = docs.filter(course => course.rating === rating);
    else newDocs = docs;

    if (minPrice && maxPrice) filteredDocs = newDocs.filter(course => course.price >= minPrice && course.price <= maxPrice);
    else if (minPrice) filteredDocs = newDocs.filter(course => course.price >= minPrice);
    else if (maxPrice) filteredDocs = newDocs.filter(course => course.price <= maxPrice);
    else filteredDocs = newDocs;

    res.json(filteredDocs);
    /* if (subject && rating&& min){
       docs=  await docs.find({subject:subject,rating:rating, price:{$gte:min,$lte:max}}).limit(10).select(projection).catch(err => res.status(500).json('Error: ' + err));
     }
     else if (subject&& rating ){
      docs=  await docs.find({subject:subject,rating:rating}).limit(10).select(projection).catch(err => res.status(500).json('Error: ' + err));
     }
     else if (subject && min){
      docs=  await docs.find({subject:subject, price:{$gte:min,$lte:max}}).limit(10).select(projection).catch(err => res.status(500).json('Error: ' + err));
    
     }
     else if (rating&&min){
      docs=  await docs.find({rating:rating, price:{$gte:min,$lte:max}}).limit(10).select(projection).catch(err => res.status(500).json('Error: ' + err));
    
     }
     else if (subject) {
         docs= await docs.find({subject:subject}).limit(10).select(projection).catch(err => res.status(500).json('Error: ' + err));
     }
     
     else if (rating){
       
         docs= await docs.find({rating:rating}).limit(10).select(projection).catch(err => res.status(500).json('Error: ' + err));
     }
     else if (min){
      docs= await docs.find({price:{$gte:min,$lte:max}}).limit(10).select(projection).catch(err => res.status(500).json('Error: ' + err));
     }
           //docs= Course.find({rating:rating}).select(projection).limit(10).then( res.json(docs.map(doc=> doc.rating).sort())).catch(err => res.status(500).json('Error: ' + err));
         
          // res.json(docs);*/
       
     // if (price){
       //  if (price=="asc"){
         //    docs.sort({price:1});
        // }
         //else
         //docs.sort({price:-1});
     // }
      /* if (price && rating)
      {
       if(price=="asc"){
         if (rating == "asc"){
           docs.sort({rating:1,price:1})
         }
         else if(rating=="desc")
          docs.sort({rating:-1,price:1})
       }
       else  {
           if (rating == "asc"){
           docs.sort({rating:1,price:-1})
         }
          else if(rating=="desc")
          docs.sort({rating:-1,price:-1})
       }
      }
      else  if (price){
         if (price=="asc"){
             docs.sort({price:1});
         }
         else
         docs.sort({price:-1});
      }
            if (rating){
         if (rating=="asc"){
             docs.sort({rating:1});
         }
         else
         docs.sort({rating:-1});
      }*/  // if (subject shoould only be found with this code ) 
 
 });


router.route('/:id').get((req, res) => {
    Course.findById(req.params.id).select(projection)
      .then(course => res.json(course))
      .catch(err => res.status(500).json('Error: ' + err));
  });


module.exports = router;