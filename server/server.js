require('dotenv').config()
const User = require('./models/user');
// const Role = require('./models/role');
// const HttpError = require('./models/http-error');

// libraries
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

// routes
const userRoutes = require('./routes/user-routes');
const contentRoutes = require('./routes/content-routes');

const app = express();

app.use(bodyParser.json());

// app.use('/uploads/images', express.static(path.join('uploads', 'images')));
// app.use('/uploads/resume', express.static(path.join('uploads', 'resume')));
// app.use('/uploads/certificates', express.static(path.join('uploads', 'certificates')));
// app.use('/uploads/stipends', express.static(path.join('uploads', 'stipends')));
// app.use('/uploads/srs', express.static(path.join('uploads', 'srs')));
// app.use('/uploads/receipts', express.static(path.join('uploads', 'receipts')));

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/content', contentRoutes);

// Default Route
app.use((req, res, next) => {
  const error = new HttpError('Could not find this route. ['+req.body.url+']', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, err => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

const port = process.env.DB_PORT || 5000;
// MongoDB ATLAS
// const uriDB = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.nmjiwwv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`; 

// MongoDB Community Server
const uriDB = `mongodb://127.0.0.1:27017/${process.env.DB_NAME}`; 

mongoose
  .connect(
    uriDB,
    {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(async () => {
    console.log("LOG - MongoDB connected successfully");

    // Start the server
    app.listen(port, () => {
      console.log(`LOG - Server running on port ${port}`);
    });
  })
  .catch(err => {
    console.log(err);
    console.log("LOG - Server failed to connect");
  });
