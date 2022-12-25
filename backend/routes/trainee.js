const router = require('express').Router();
let User = require('../models/user.model');
const cookieParser = require('cookie-parser');
//app.use(cookieParser());
const { requireAuthadmin ,requireAuthinstructor, requireAuthindividualTrainee , requireAuthcorpTrainee }= require('../Middleware/Autho')
//router.use(
  //  requireAuthindividualTrainee
  //);

router.route('/').get((req, res) => {
  User.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(500).json('Error: ' + err));
});

router.route('/:user/:course/enroll').post(requireAuthindividualTrainee, async (req, res) => {
    const user = req.params.user;
    const course = req.params.course;
    const currentUser = await User.findOne({username: user});
    
    currentUser.enrolledCourses.push(course);
    
    currentUser.save()
    .then(() => res.json('Enrolled in course!'))
    .catch(err => res.status(500).json('Error: ' + err));
});

router.route('/:user/:course/isEnrolled').get( async (req,res) => {
    const user = req.params.user;
    const course = req.params.course;
    const currentUser = await User.findOne({username: user});
    if(currentUser) res.json(currentUser.enrolledCourses.includes(course));
    else res.json(false);
   
});
router.route('/:user/:exercise/save-score').post(requireAuthindividualTrainee, async (req, res) => {
    
    const user = req.params.user;
    const id = req.params.exercise;
    const score = Number(req.body.score);
    const maxScore = req.body.maxScore;
    const currentUser = await User.findOne({username: user});
    var exists = false; var i = 0;

    for(i; i < currentUser.exercises.length; i++){
        if(currentUser.exercises[i].exerciseID === id){
            exists = true;
            break;
        }
    }
    
    //handle improving score by replacing old score
    if(exists){
        if (currentUser.exercises[i].score < score) {
            currentUser.exercises[i].score = score;
        }
    }
    //handle saving score for the first time
    else currentUser.exercises.push({ exerciseID: id, score, maxScore });
    
    currentUser.save()
    .then(res.json("Score updated!"));

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