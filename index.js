const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const path = require('path');
const mongoose = require('mongoose');

const People = require('./controllers/PeopleController');

// Create connection to Mongo DB via Mongoose
mongoose.connect(process.env.MONGO_URL);
mongoose.connection.once('open', () => console.log('Hello from brittanyaddressbook-db!'));
mongoose.Promise = global.Promise;

// Configure Express Application Server
const app = express();
const PORT = process.env.PORT || 8080;

// Set up body-parser for processing form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
  //res.send('Hello Brit');
});

app.get('/style.css', function(req, res) {
  res.sendFile(__dirname + "/" + "style.css");
});

// Get all people
app.get('/getAllPeople', People.getAllPeople, (req, res) => {
  // res.json(people);
});

// Create person
app.post('/createPerson', People.createPerson, (req, res) => {
  // res.json(person);
});

// Get person info
app.get('/getPersonInfo/:firstname', People.getPersonInfo, (req, res) => {

});

// Find person and delete
app.delete('/deletePerson/:firstname', People.deletePerson, (req, res) => {

});

// Find person and edit
app.put('/editPerson/:firstname', People.editPerson, (req, res) => {

});

// Start server
app.listen(PORT, () => console.log('Server started on port', PORT));