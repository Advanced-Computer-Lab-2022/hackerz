const router = require('express').Router();
let User = require('../models/user.model');
const jwt = require ('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');

const JWT_SECRET='Secret';
const projection = {password:1};
router.route('/register').post( async (req, res) => {
const {name,password,confirmpass,country,email}= req.body;
if (password != confirmpass){
  res.json("passwords do not match");
}
User.exists({useremail:email}, async function (err, doc) {
  if (err){
      console.log(err);
  }else{
      if (doc){
        res.json("Already registered");
      }
     else{
   const salt = await bcrypt.genSalt();
   const hashedPassword = await bcrypt.hash(password, salt);
   const newUser = new User({username:name,firstlog:false,userType:'individualTrainee', password:hashedPassword, rating: undefined, country:country, userbiography:"",useremail:email,enrolledCourses:[],exercises:[]});// creates a new user

    newUser.save() 
    .then(() => res.json('Successful register!'))
   .catch(err => res.status(400).json('Error: ' + err)); //adds it to db and if it fails it throws an error
   const userinfo = { useremail:email,
   usertype:type}
  /*jwt.sign(
   userinfo,
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:"30s"
    }
)
const refreshtoken=   jwt.sign(
   userinfo,
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn:"7d"}
)
res.cookie("jwt",refreshtoken,{httpOnly:true,maxAge:maxAge*1000})*/
res.redirect('/home');}}})


});

router.route('/').post( async (req, res) => {
    var useremail = req.body.useremail;
    var password = req.body.password;
    
    const user= User.findOne({useremail:useremail});
    const userinfo = { useremail: user.useremail,
      usertype:user.userType}
    
  const samepassword = await bcrypt.compare(password,user.password);
  if (!samepassword){
    res.status.json(401).json("invalid credetianls");

  }
  else{
    //const token = req.cookies.jwt;
    
    jwt.sign(
       userinfo,
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:"30s"
        }
    )
 const refreshtoken=   jwt.sign(
       userinfo,
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn:"7d"}
    )
    res.cookie("jwt",refreshtoken,{httpOnly:false,maxAge:maxAge*100,sameSite:'strict'})
    if (user.firstlog==true){
     // var doc2 = await User.findOneAndUpdate({useremail:useremail}, {firstlog:false}, {
       // new: true
      //}); 
      res.redirect('/editInfo/forget-password')
    }else{
      if(user.userType=='admin'){
              res.redirect('./admin');
      }
      else if(user.userType=='instructor'){
        res.redirect('./instructor');
      }
      else if(user.userType=='individualTrainee'){
        res.redirect('./trainee');
      }
      else if(user.userType=='corpTrainee'){
        res.redirect('./corp');
      }
   // res.json(user.userType);
  }
  
  }
     
});
router.route("/logout").get (async(req,res)=>{
    const cookies = req.cookies;
    if (!cookies?.jwt){
        res.status(204).json("no cookies");
    }
    else{
    res.clearCookie('jwt',{httpOnly:true, maxAge:maxAge*1000})
    res.redirect('/home');
    res.json("logged out successfully");}
})


module.exports = router;