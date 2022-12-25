const router = require('express').Router();
let Course = require('../models/course.model');
const cookieParser = require('cookie-parser');
//app.use(cookieParser());
const nodemailer= require('nodemailer');
let { requireAuthadmin ,requireAuthinstructor, requireAuthindividualTrainee , requireAuthcorpTrainee } = require('../Middleware/Autho')
//router.use(
  //  requireAuthcorpTrainee
  //);
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
router.route('/receive-certificate').post(async (req,res)=>{
    const email= req.body.useremail;
    
    const transporter = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
          user: 'hackerz2001@outlook.com',
          pass: 'hackerzSalma'
        }
      }); 
    transporter.sendMail({
        from:'hackerz2001@outlook.com',
        to: email,
        subject: 'Certificate of completance',
        text: 'Dear Candidate,You will find your certificate attached in this e-mail',
        attachments: [{
          filename: 'Certifcate.pdf',
          path: 'C:\Users\Lenovo\OneDrive\Desktop\project_marwan',
          contentType: 'application/pdf'
        }],
        function(err, info) {
          if (err) {
            console.error(err);
          } else {
            console.log(info);
          }
        }
      });
})
router.route('/download-certificate').get(async(req,res)=>{
    res.download("C:\Users\Lenovo\OneDrive\Desktop\project_marwan");
 
})
module.exports = router;
/*  const transporter = nodemailer.createTransport({
                  service: 'hotmail',
                  auth: {
                    user: 'hackerz2001@outlook.com',
                    pass: 'hackerzSalma'
                  }
                }); 
                var mailOptions = {
                  from: 'hackerz2001@outlook.com',
                  to: useremail,
                  subject: 'Reset Password Link',
                  text: link
                };  
                transporter.sendMail(mailOptions, function(error, info){
                  if (error) {
                    console.log(error);
                    res.json(error);
                  } else {
                    console.log('Email sent: ' + info.response);
                    res.json('Email sent: ' + info.response);
                  }
                });  */ 