const router = require('express').Router();
let report = require('../models/report.model');

router.route('/:user/:coursetitle').post( async (req, res) => {
    const user = req.params.user; //get from props
    const course = req.params.coursetitle;  //how to get course id
  
    const type = req.body.repType;
    const description = req.body.description;
  
    // if the user didn't fill all fields
    if(!req.body.repType || !req.body.description){
      res.status(400)
      throw new Error('Please fill all fields.')
    }
  
    // Add new report in the database
    const report = await Report.create({
      repType: req.body.repType,
      description: req.body.description,
      user: req.params.user, //username
      course: req.params.course, // course id
  })
  
  res.status(200).json(report)
  
});

 module.exports = router;
  