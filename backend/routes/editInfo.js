const router = require('express').Router();
let User = require('../models/user.model');
const jwt = require ('jsonwebtoken');
const JWT_SECRET='Secret';
const nodemailer= require('nodemailer');

//const projection = {__v: 0, createdAt: 0, updatedAt: 0, dateAdded: 0, username:0,userType:0,   password:0,country:0};
const projection = {_id:1};


router.route('/').post(async (req,res)=>{
    const useremail = req.body.useremail;
     User.exists({useremail:useremail}, async function (err, doc) {
        if (err){
            console.log(err);
        }else{
            if (doc){
               const userid= await User.find({useremail:useremail})
                .select(projection)
                .catch(err => res.status(500).json('Error: ' + err));
                   const secret = JWT_SECRET + userid;                    
                  const payload = {
                    
                    id: userid

                  }
                const token = jwt.sign(payload,secret,{expiresIn:'15m'});
                const link=`http://localhost:3000/reset-passwrod/${userid}${token} `;
                
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
              const payload= jwt.verify(token,secret);
              res.json("Verified")
           }
           catch(error){
            res.send(error.message);
                
           }
                                  
              
              }}

 });
});
router.route('/reset-password/:id/:token').post(async(req,res)=>{
  const new_password = req.body.new_password;
  const user_id= req.params.id;
  const confirm_new_password= req.body.confirm_new_password;
  if (new_password != confirm_new_password){
    res.json("PASSWORDS NOT MATCHED");

  }
  else{
    var doc = await User.findOneAndUpdate({_id:user_id}, {password:new_password}, {
      new: true
    });
    res.json("Password updated successfully");
  }

});
 module.exports = router;