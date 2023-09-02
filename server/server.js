const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = 3000;

app.use(express.json());

const uri = process.env.ATLAS_URI; //uri is defined from .env file as var "ATLAS_URI"
mongoose.connect(uri);
const connection = mongoose.connection;
connection.on('error', (error) => console.error(error))
connection.once('open', () => {
  console.log('MongoDB database connection established successfully!');
});

const usersRouter = require('./routes/users'); 
const vacationsRouter = require('./routes/vacations'); 


app.use('/api/users', usersRouter) 
app.use('/api/vacations', vacationsRouter) 

app.listen(port, () => {
  console.log(`listening on port ${port}.`);
});

//location : string
//name: user name string

//ATLAS USERNAME AND PASSWORDS

//user: Preston
//password: 9tDM0uGw2ay9uBCG

//user: Quinn
//password: TOCkTqry8O79xSHN

//user: Josh
//password: d32LFhqNxHux5ThR

//user: Ayden
//password: JG671QRbQCdJdCwm

//URI: mongodb+srv://<username>:<password>@travelagentllc.ibwyhrl.mongodb.net/?retryWrites=true&w=majority
