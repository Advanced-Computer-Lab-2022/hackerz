require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
app.use(cookieParser());

app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const adminRouter = require('./routes/admin');
const instructorRouter = require('./routes/instructor');
const coursesRouter = require('./routes/courses');
const corpRouter = require('./routes/corp');
const exerciseRouter = require('./routes/exercise');
const traineeRouter = require('./routes/trainee');
const editInfoRouter = require('./routes/editInfo');
const homeRouter = require('./routes/home');
//const editPersonalRouter = require('./routes/editPersonal');

app.use('/admin', adminRouter);
app.use('/instructor', instructorRouter);
app.use('/courses', coursesRouter);
app.use('/corp', corpRouter);
app.use('/exercise', exerciseRouter);
app.use('/trainee', traineeRouter);
app.use('/editInfo', editInfoRouter);
app.use('/home',homeRouter);
//app.use('/editPersonal', editPersonalRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});