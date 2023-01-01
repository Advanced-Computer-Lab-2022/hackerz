const router = require('express').Router();
let User = require('../models/user.model');
let Course = require('../models/course.model');
let CorpRequest = require('../models/corpRequests.model');
const stripe = require('stripe')('sk_test_51MG618CkQfuK4spKVdeLx28yfR0NiDMESliP9knQuLke9NTavPIzWUJIKyLjoi8239EYHYAR0M99P38WbCXXMwWG00Vx7ZRKqq');


router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(500).json('Error: ' + err));
});

router.route('/get-user/:username').get((req, res) => {
  User.findOne({username: req.params.username})
    .then(users => res.json(users))
    .catch(err => res.status(500).json('Error: ' + err));
});

router.route('/addadmin').post(async( req,res) => {// addadmin?
  var count = await User.countDocuments({userType: "admin"});
  var username = "admin"+count++;// takes username from the body
  var email = username + "@gmail.com"
  const password = "admin123";
  const newUser = new User({username,userType:'admin',firstlog: true,password,useremail: email, rating: undefined, country:"Egypt"});// creates a new user

  newUser.save() 
    .then(() => res.json(newUser))
    .catch(err => res.json('Error: ' + err)); //adds it to db and if it fails it throws an error
});

//add another instructor
router.route('/addinst').post((req, res) => {
  const username = req.body.username;// takes username from the body
  const password = req.body.password;
  const newUser = new User({username,userType:'instructor',firstlog: true, useremail:"beedoz377@gmail.com",userbiography:"" ,password, country:"Egypt"});// creates a new user

  newUser.save() 
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err)); //adds it to db and if it fails it throws an error
});

//add a corporate tranees
router.route('/addcorp').post((req, res) => {
  const username = req.body.username;// takes username from the body
  const password = req.body.password;
  const newUser = new User({username,firstlog: true,userType:'corpTrainee',useremail:"test1@hotmail.com", password, rating: 0, country:"Egypt"});// creates a new user

  newUser.save() 
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err)); //adds it to db and if it fails it throws an error
});
router.route('/addindiv').post((req, res) => {
  const username = req.body.username;// takes username from the body
  const password = req.body.password;
  const newUser = new User({username,firstlog: true,userType:'individualTrainee',useremail:"random1@hotmail.com", password, rating: 0, country:"Egypt"});// creates a new user

  newUser.save() 
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err)); //adds it to db and if it fails it throws an error
});

router.route('/getSecret').get(async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: 'usd',
    payment_method_types: ['card'],
  });
  console.log(paymentIntent.client_secret)
  res.json(paymentIntent.client_secret);
});

router.route('/corp-requests').get((req, res) => {
  CorpRequest.find()
    .then(requests => res.json(requests))
    .catch(err => res.status(500).json('Error: ' + err));
});

router.route('/:id/accept').post( async (req, res) => {
  const id = req.params.id;
  const corpReq = await CorpRequest.findById(id);
  const user = corpReq.corpUser;
  const course = corpReq.courseID;
  const currentUser = await User.findOne({username: user});
  await Course.findByIdAndUpdate(course, {$inc: {counter: 1}}) //increments counter in course by 1
  currentUser.enrolledCourses.push(course);
  await CorpRequest.deleteOne({_id: id})
  currentUser.save()
  .then(() => res.json('Enrolled in course!'))
  .catch(err => res.status(500).json('Error: ' + err));
});

router.route('/:id/reject').post( async (req, res) => {
  const id = req.params.id;

  await CorpRequest.deleteOne({_id: id})
  res.json("Request Rejected")
});

module.exports = router;