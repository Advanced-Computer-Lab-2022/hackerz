const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(500).json('Error: ' + err));
});

router.route('/addadmin').post(async( req,res) => {// addadmin?
  var count = await User.countDocuments({userType: "admin"});
  var username = "admin"+count++;// takes username from the body
  const password = "admin123";
  const newUser = new User({username,userType:'admin',password, rating: undefined, country:"Egypt"});// creates a new user

  newUser.save() 
    .then(() => res.json(newUser))
    .catch(err => res.json('Error: ' + err)); //adds it to db and if it fails it throws an error
});

//add another instructor
router.route('/addinst').post((req, res) => {
  const username = req.body.username;// takes username from the body
  const password = req.body.password;
  const newUser = new User({username, userType: 'instructor', password, rating: 0, country: "Egypt"});// creates a new user

  newUser.save() 
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err)); //adds it to db and if it fails it throws an error
});

//add a corporate tranees
router.route('/addcorp').post((req, res) => {
  const username = req.body.username;// takes username from the body
  const password = req.body.password;
  const newUser = new User({username,userType:'corpTrainee', password, rating: undefined, country:"Egypt"});// creates a new user

  newUser.save() 
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err)); //adds it to db and if it fails it throws an error
});

module.exports = router;