// Setting in Dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); //parses incoming body parser request
const cors = require('cors'); // allows to put in request for API from diff Domain
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//Connect to database
mongoose.connect(config.database);

//On connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' +config.database);
});

//On error
mongoose.connection.on('error', (err) => {
    console.log('Database error' +err);
});


//Initializing the app with express
const app = express();

const users = require('./routes/users');

//CORS middleware
app.use(cors());

//Set static folder
app.use(express.static(path.join(__dirname, 'client')));

//Body Parser middleware
app.use(bodyParser.json());

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

//Index Route 
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

app.get('*', () =>{
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

//Setting up the port 
const port = 3000;

//Start the server
app.listen(port, () =>{
    console.log('Server started on port ' +port);
});