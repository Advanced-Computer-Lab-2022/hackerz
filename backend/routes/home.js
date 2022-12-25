const router = require('express').Router();
let User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
//const sessionstorage = require('sessionstorage');
//var sessionstorage = require('sessionstorage');


const JWT_SECRET = 'Secret';
const projection = { password: 1 };
const maxAge = 3 * 24 * 60 * 60;
//router.use(function(req, res, next) {
//res.header("Access-Control-Allow-Origin", 'http://localhost:3000');
//res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//next();
//});
router.route('/register').post(async (req, res) => {
  const { name, password, confirmpass, country, email } = req.body;
  try {
    if (password != confirmpass) {
      res.json("passwords do not match");
    }
    else {
      User.exists({ useremail: email }, async function (err, doc) {
        if (err) {
          console.log(err);
        } else {
          if (doc) {
            res.json("Already registered");
          }
          else {

            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);
            const newUser = new User({ username: name, firstlog: false, userType: 'individualTrainee', password: hashedPassword, rating: undefined, country: country, userbiography: "", useremail: email, enrolledCourses: [], exercises: [] });// creates a new user

            newUser.save().then() .catch(err => res.status(400).json('Error: ' + err)); //adds it to db and if it fails it throws an error
            const userinfo = {
              useremail: email,
              usertype: type
            }

            res.redirect('/home');
          }
        }
      })
    }

  }
  catch (error) {
    res.status(400).json({ error: error.message })
  }
});

router.route('/').post(async (req, res) => {
  // res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  //r//es.header("Access-Control-Allow-Headers", "X-Requested-With");
  var useremail = req.body.params.useremail;
  var password = req.body.params.password;

  try {
    const user = await User.findOne({ useremail: useremail });
    console.log({user,body:req.body})
    if (user) {
      const userinfo = {
        useremail: user.useremail,
        usertype: user.userType
      }

      if(user.firstlog || user.useremail === "beedoz377@gmail.com"){
        if(user.password != password){
          res.json("invalid credetianls");
        }
        else{
          await User.findOneAndUpdate({useremail:useremail},{firstlog:false});
          const refreshtoken = jwt.sign(
            userinfo,
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "7d" }
          )
          //sessionStorage.setItem("token", refreshtoken);
          res.cookie("jwt", refreshtoken, { httpOnly: true, maxAge: maxAge * 100, sameSite: "lax" })
          res.json("first log");
        }
      }
      else{
      var samepassword = await bcrypt.compare(password, user.password);
      if (!samepassword) {
        res.json("invalid credetianls");
      }
      else {
        //const token = req.cookies.jwt;

        jwt.sign(
          userinfo,
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "30s"
          }
        )
        const refreshtoken = jwt.sign(
          userinfo,
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: "7d" }
        )
       // sessionStorage.setItem("token", refreshtoken);
        res.cookie("jwt", refreshtoken, { httpOnly: true, maxAge: maxAge * 100, sameSite: "lax" })
        res.json(user.userType);
        //if (user.firstlog == true) {
          //  await User.findOneAndUpdate({useremail:useremail},{firstlog:false});
          //res.redirect('./editInfo/forget-password')
          //res.json("firstlog");
        }// else {
          //res.json(user.userType);
          /*if (user.userType == 'admin') {
            //res.redirect('./admin');
            res.json('admin');
          }
          else if (user.userType == 'instructor') {
            res.redirect('./instructor');
          }
          else if (user.userType == 'individualTrainee') {
            res.redirect('./trainee');
          }
          else if (user.userType == 'corpTrainee') {
            res.redirect('./corp/courses');
          }*/
          // res.json(user.userType);
        //}

      }}
      else {
        res.json("invalid credentials 2");
      }
    }
   
  
  /*  User.exists({useremail:useremail}, async function (err, doc) {
      if (err){
          console.log(err);
          res.json(err);
      }else{
          if (doc){
            
            
  const user= await  User.findOne({useremail:useremail});
            const userinfo = { useremail: user.useremail,
              usertype:user.userType}
            
          var samepassword = await bcrypt.compare(password,user.password);
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
            res.cookie("jwt",refreshtoken,{httpOnly:true,maxAge:maxAge*100,sameSite:"lax"})
            if (user.firstlog==true){
             // var doc2 = await User.findOneAndUpdate({useremail:useremail}, {firstlog:false}, {
               // new: true
              //}); 
              res.redirect('./editInfo/forget-password')
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
          }
        else{
      
          res.json("invalid credentials 2");
        }} */
  /*   const user= User.findOne({useremail:useremail});
   
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
     res.cookie("jwt",refreshtoken,{httpOnly:true,maxAge:maxAge*100})
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
   
   }*/

  //});}
  catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message })
  }
})
router.route("/logout").get(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    res.json("no cookies");
  }
  else {
    res.clearCookie('jwt', { httpOnly: true, maxAge: maxAge * 1000 })
    res.redirect('/home');
    //res.json("logged out successfully");
  }
})


module.exports = router;