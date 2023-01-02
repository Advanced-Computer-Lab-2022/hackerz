const router = require('express').Router();
let User = require('../models/user.model');
const cookieParser = require('cookie-parser');
const nodemailer= require('nodemailer');
const path = require('path');
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
          path: 'C:/Users/Lenovo/OneDrive/Desktop/project_marwan/Certificate.pdf',
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
      res.json("E-mail  send"); 
})
router.route('/download-certificate').get(async(req,res)=>{
   //res.download('C:/Users/Lenovo/OneDrive/Desktop/project_marwan/hackerz/Certificate.pdf','Certificate.pdf');
    //res.download(path.resolve('..../Certificate.pdf'))
    //res.attachment(path.resolve('..../Certificate.pdf'))
    //res.send();
   // res.json("successful download"); 
   res.download('C:/Users/Lenovo/OneDrive/Desktop/project_marwan/hackerz/Certificate.pdf', 'report.pdf', function (err) {
    if (err) {
      // Handle error, but keep in mind the response may be partially-sent
      // so check res.headersSent
      res.json(err);
    } else {
      console.log("success");
    }})
})






module.exports = router;