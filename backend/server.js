require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });

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

app.use('/admin', adminRouter);
app.use('/instructor', instructorRouter);
app.use('/courses', coursesRouter);
app.use('/corp', corpRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });