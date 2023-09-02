const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = 3000;

app.use(express.json());

// const uri = process.env.ATLAS_URI; //uri is defined from .env file as var "ATLAS_URI"
// mongoose.connect(uri); 
// const connection = mongoose.connection;
// connection.once('open', () => {
//   console.log('MongoDB database connection established successfully!');
// });

// const usersRouter = require('./routes/users'); //place future routers here
// app.use('/api/users', usersRouter) //access routers here


app.listen(port, () => {
  console.log(`listening on port ${port}.`);
});