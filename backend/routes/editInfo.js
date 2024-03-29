const router = require('express').Router();
let User = require('../models/user.model');
const jwt = require ('jsonwebtoken');
const JWT_SECRET='Secret';
const nodemailer= require('nodemailer');
const bcrypt= require('bcrypt');

//const projection = {__v: 0, createdAt: 0, updatedAt: 0, dateAdded: 0, username:0,userType:0,   password:0,country:0};
const projection = {_id:1};


router.route('/').post(async (req,res)=>{
    const useremail = req.body.useremail;
     User.exists({useremail:useremail}, async function (err, doc) {
        if (err){
            console.log(err);
        }else{
            if (doc){
               const user = await User.findOne({useremail:useremail})
                .select(projection)
                .catch(err => res.status(500).json('Error: ' + err));
                  const secret = JWT_SECRET + user._id;  
                                  
                  const payload = {
                    id: user._id
                  }
                  

                const token = jwt.sign(payload,secret,{expiresIn:'15m'});
                const link=`http://localhost:3000/reset-password/${user._id}/${token} `;
                
                //res.status(200).send({ auth: true, token: token });
                const transporter = nodemailer.createTransport({
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
                });                                                                 
                                                                                               } 
            else{
                res.json("enter a valid e-mail");
              //  alert("enter a valid e-mail");  
            }
        }
    });
    
    
    
 
 });
 router.route('/reset-password/:id/:token').get(async(req,res)=>{
  const user_id = req.params.id;
  const token= req.params.token;
  User.exists({_id:user_id}, async function (err, doc) {
    if (err){
      console.log(err);
    }else{
      if (doc){
        const secret = JWT_SECRET + user_id; 
        try{
         // console.log(secret)
          const payload= jwt.verify(token,secret);
          
          res.json("Verified")
           }
           catch(error){
            res.json(error.message);    
           }
              }}

 });
});
router.route('/reset-password/:id/:token').post(async(req,res)=>{
  const new_password = req.body.new_password;
  const user_id= req.params.id;
  const confirm_new_password= req.body.confirm_new_password;
  if (new_password !== confirm_new_password){
    res.json("PASSWORDS NOT MATCHED");

  }
  else{
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(new_password, salt);
    var doc = await User.findOneAndUpdate({_id:user_id}, {password:hashedPassword}, {
      new: true
    });
    res.json("Password updated successfully");
  }

});
router.route('/forget-password').post (async (req,res) =>{
  var useremail = req.body.params.usermail;
  var password = req.body.params.oldPass;
  var newpassword= req.body.params.Pass;
  var ConfirmNewPassword = req.body.params.confirmPass;
  
  User.exists({useremail:useremail , password:password}, async function (err, doc) {
    if (err){
      console.log(err);
    }
    if (doc){ 
      console.log(newpassword)
      if(ConfirmNewPassword===newpassword){
        const salt = await bcrypt.genSalt();
        console.log(salt);
        const hashedPassword = await bcrypt.hash(newpassword, salt);
      var doc = await User.findOneAndUpdate({useremail:useremail}, {password:hashedPassword}, {
        new: true
      });
    
      
      res.json("Password updated successfully");}
      else{
        res.json("Passwordsdo not match ");
      }
    }
    else{
      res.json("Invalid credetinals ");
    }
})
});

 module.exports = router;