var express = require('express'),
    mongoose = require('mongoose');
    bodyParser = require('body-parser');

// connect to DocumentMngmntDB database
var app = mongoose.connect('mongodb://localhost/DocumentMngmntDB')

// initiallize app with express
var app = express();

// set port
var port = process.env.PORT || 3000;

// enable app to read request body
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());

// models
var User = require('./server/models/userModel');

var userRouter = require('./Routes/user')(User);

app.listen(port, function(){
    console.log('we are listenning to port ' + port)
});

// routes
app.use('/api/v1/users', userRouter);