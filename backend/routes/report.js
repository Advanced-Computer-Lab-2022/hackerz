const router = require('express').Router();
const projection = {__v: 0, createdAt: 0, updatedAt: 0, dateAdded: 0};
let Report = require('../models/report.model');

router.route('/:coursetitle/:user').post( async (req, res) => {
    const user = req.params.user; //get from props
    console.log(user)
    const course = req.params.coursetitle;  //how to get course id
    console.log(course)

    if(user === ""){
        return res.status(400).json('Must be logged in first')
    }
    const type = req.body.repType;
    const description = req.body.description;
  
    // if the user didn't fill all fields
    console.log(req.body)
    if(!req.body.type || !req.body.description){
      res.status(400)
      throw new Error('Please fill all fields.')
    }
  
    // Add new report in the database
    const report = await Report.create({
      repType: req.body.type,
      description: req.body.description,
      user: user, //username
      course: course, // course id
  })
  
  res.status(200).json(report)
  
});

router.route('/:user').get( async (req, res) => {
    console.log(req.params.user)
    const reports = await Report.find({ 'user': req.params.user }).select(projection)
          .then(report => res.json(report))
          .catch(err => res.status(500).json('Error: ' + err));

    console.log("Rawannn")
    console.log(res)
    console.log(reports.length)
});
 module.exports = router;