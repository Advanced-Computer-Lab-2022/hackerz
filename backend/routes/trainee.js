const router = require('express').Router();
let User = require('../models/user.model');
const cookieParser = require('cookie-parser');
//app.use(cookieParser());
const { requireAuthadmin ,requireAuthinstructor, requireAuthindividualTrainee , requireAuthcorpTrainee }= require('../Middleware/Autho')
//router.use(
  //  requireAuthindividualTrainee
  //);
let Course = require('../models/course.model');

router.route('/').get((req, res) => {
  User.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(500).json('Error: ' + err));
});

router.route('/:user/:course/enroll').post( async (req, res) => {
    const user = req.params.user;
    const course = req.params.course;
    const currentUser = await User.findOne({username: user});
    await Course.findByIdAndUpdate(course, {$inc: {counter: 1}}) //increments counter in course by 1
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

router.route('/:user/myCourses').get( async (req,res) => {
    const user = req.params.user;
    var courses = [];
    const currentUser = await User.findOne({username: user});
    
    for (const courseID in currentUser?.enrolledCourses){
        const course = await Course.findOne({_id: currentUser.enrolledCourses[courseID]});
        courses.push(course);
    }

    if(currentUser) res.json(courses);
    else res.json(false);
});
router.route('/:user/:exercise/save-score').post( async (req, res) => {
    
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

// router.route('/receive-certificate').post(async (req,res)=>{
//     const email= req.body.useremail;
    
//     const transporter = nodemailer.createTransport({
//         service: 'hotmail',
//         auth: {
//           user: 'hackerz2001@outlook.com',
//           pass: 'hackerzSalma'
//         }
//       }); 
//     transporter.sendMail({
//         from:'hackerz2001@outlook.com',
//         to: email,
//         subject: 'Certificate of completance',
//         text: 'Dear Candidate,You will find your certificate attached in this e-mail',
//         attachments: [{
//           filename: 'Certifcate.pdf',
//           path: 'C:\Users\Lenovo\OneDrive\Desktop\project_marwan',
//           contentType: 'application/pdf'
//         }],
//         function(err, info) {
//           if (err) {
//             console.error(err);
//           } else {
//             console.log(info);
//           }
//         }
//       });
// })
router.route('/download-certificate').get(async(req,res)=>{
    res.download("C:\Users\Lenovo\OneDrive\Desktop\project_marwan");
 
})






router.route('/:user/:subtitle/complete').post( async (req, res) => {
    const user = req.params.user;
    const subtitle = req.params.subtitle;
    const currentUser = await User.findOne({username: user});
    currentUser.completedSubtitles.push(subtitle);
    currentUser.save()
    .then(() => res.json('Completed Subtitle!'))
    .catch(err => res.status(500).json('Error: ' + err));
});

router.route('/:user/:subtitle/isCompleted').get( async (req,res) => {
    const user = req.params.user;
    const subtitle = req.params.subtitle;
    const currentUser = await User.findOne({username: user});
    if(currentUser?.completedSubtitles) res.json(currentUser.completedSubtitles.includes(subtitle));
    else res.json(false);
});

router.route('/:user/:course/progress').get( async (req,res) => {
    const user = req.params.user;
    const course = req.params.course;
    const currentUser = await User.findOne({username: user});
    const currentCourse = await Course.findOne({_id: course});
    var subtitle; var maxDuration = 0; var duration = 0;
    for(subtitle in currentCourse.subtitles){
        var id = currentCourse.subtitles[subtitle]._id;
        maxDuration += currentCourse.subtitles[subtitle].duration
        if (currentUser.completedSubtitles.includes(id))
            duration += currentCourse.subtitles[subtitle].duration;
    }
    res.json(Math.round(duration/maxDuration*100))
});

router.route('/:user/:course/add-review').post( async (req, res) => {
    const user = req.params.user;
    const course = req.params.course;
    const review = req.body.review;
    const currentCourse = await Course.findOne({_id: course});
    currentCourse.reviews.push({username: user, review});
    currentCourse.save()
    .then(() => res.json('Review Added!'))
    .catch(err => res.status(500).json('Error: ' + err));
});

router.route('/:course/reviews').get( async (req, res) => {
    const course = req.params.course;
    const currentCourse = await Course.findOne({_id: course});
    res.json(currentCourse.reviews);
});

module.exports = router;