const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(500).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;

  const newUser = new User({
    username: username,
    type: 'instructor',
    country: 'Egypt'
  });

  newUser.save()
    .then(() => res.send('User added!'))
    .catch(err => res.status(500).json('Error: ' + err));
});

module.exports = router;