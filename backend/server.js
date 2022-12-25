require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
var cookieParser = require('cookie-parser')

const app = express();
const port = process.env.PORT || 5000;
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });

app.use(cookieParser());
// app.use(cors());
app.use(express.json());
//Access-Control-Allow-Origin:' http://localhost:3000';
const allowOrigins = ['http://localhost:3000', 'http://localhost:5000' ]
const corsOptions = {
  credentials: true,
  origin: "http://localhost:3000" 
}

// function(origin, callback) {
//   if (allowOrigins.indexOf(origin) !== -1) {
//     callback(null, true)
//   } else {
//     callback(new Error('Not allowed by CORS'))
//   }
// }

app.use(cors(corsOptions));
//var allowCrossDomain = function(req, res, next) {
  //res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  //res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  //res.header('Access-Control-Allow-Headers', 'Content-Type');
  //next();
//}
//app.configure(function() => {
  //app.use(allowCrossDomain);
  //some other code
//});

const uri = process.env.MONGO_URI;
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });
const adminRouter = require('./routes/admin');
const instructorRouter = require('./routes/instructor');
const coursesRouter = require('./routes/courses');
const corpRouter = require('./routes/corp');
const exerciseRouter = require('./routes/exercise');
const traineeRouter = require('./routes/trainee');
const editInfoRouter = require('./routes/editInfo');
const homeRouter = require('./routes/home');
const certificateRouter = require('./routes/Certificate')
//const editPersonalRouter = require('./routes/editPersonal');

app.use('/admin', adminRouter);
app.use('/instructor', instructorRouter);
app.use('/courses', coursesRouter);
app.use('/corp', corpRouter);
app.use('/exercise', exerciseRouter);
app.use('/trainee', traineeRouter);
app.use('/editInfo', editInfoRouter);
app.use('/home',homeRouter);
app.use('/Certificate',certificateRouter)
//app.use('/editPersonal', editPersonalRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});