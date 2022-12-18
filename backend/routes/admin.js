const router = require('express').Router();
const cookieParser = require('cookie-parser');
app.use(cookieParser());
let User = require('../models/user.model');
const requireAuthadmin = require('../Middleware/Autho')
router.use(
    requireAuthadmin
  );

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(500).json('Error: ' + err));
});

router.route('/addadmin').post( requireAuthadmin,async( req,res) => {// addadmin?
  var count = await User.countDocuments({userType: "admin"});
  var username = "admin"+count++;// takes username from the body
  const password = "admin123";
  const newUser = new User({username,userType:'admin',password, rating: undefined, country:"Egypt"});// creates a new user

  newUser.save() 
    .then(() => res.json(newUser))
    .catch(err => res.json('Error: ' + err)); //adds it to db and if it fails it throws an error
});

//add another instructor
router.route('/addinst').post(requireAuthadmin, (req, res) => {
  const username = req.body.username;// takes username from the body
  const password = req.body.password;
  const newUser = new User({username,firstlog:true,userType:'instructor', useremail:"beedoz377@gmail.com",userbiography:"" ,password, country:"Egypt"});// creates a new user

  newUser.save() 
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err)); //adds it to db and if it fails it throws an error
});

//add a corporate tranees
router.route('/addcorp').post(requireAuthadmin,(req, res) => {
  const username = req.body.username;// takes username from the body
  const password = req.body.password;
  const newUser = new User({username,firstlog:true,userType:'corpTrainee', password, rating: undefined, country:"Egypt"});// creates a new user

  newUser.save() 
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err)); //adds it to db and if it fails it throws an error
});

module.exports = router;