const router = require('express').Router();
let Exercise = require('../models/exercise.model');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const requireAuthinstructor = require('../Middleware/Autho');
router.use(
  requireAuthinstructor
  );

router.route('/:id').get( async (req, res) => {
  const id = req.params.id;
  const response = await Exercise.findOne({_id: id});
  res.json(response);
});

router.route('/:exercise/add-question').post( async (req, res) => {
  const exercise = req.params.exercise;
  const questionText = req.body.text;
  const answer1 = req.body.answer1;
  const answer2 = req.body.answer2;
  const answer3 = req.body.answer3;
  const answer4 = req.body.answer4;
  const correctAnswer = parseInt(req.body.correctAnswer);
  var answer1Bool = false; var answer2Bool = false; var answer3Bool = false; var answer4Bool = false;
 
  switch(correctAnswer){
    case 1: answer1Bool = true; break;
    case 2: answer2Bool = true; break;
    case 3: answer3Bool = true; break;
    case 4: answer4Bool = true; break;
    default:
  }

  const answerOptions = [
    {answerText: answer1, isCorrect: answer1Bool},
    {answerText: answer2, isCorrect: answer2Bool},
    {answerText: answer3, isCorrect: answer3Bool},
    {answerText: answer4, isCorrect: answer4Bool}
  ];
  const newQuestion = { questionText, answerOptions };


  const currentExercise = await Exercise.findOne({_id: exercise});

  
  console.log(currentExercise.exercises);
    
  currentExercise.questions.push(newQuestion);
    
  currentExercise.save()
    .then(() => res.json('Question added!'))
    .catch(err => res.status(500).json('Error: ' + err));
});

module.exports = router;