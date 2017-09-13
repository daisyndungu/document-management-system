var express = require('express'),
    mongoose = require('mongoose');

// connect to DocumentMngmntDB database
var app = mongoose.connect('mongodb://localhost/DocumentMngmntDB')

// initiallize app with express
var app = express();

// set port
var port = process.env.PORT || 3000;

// Add models
var User = require('./server/models/userModel');

var userRouter = express.Router();

userRouter.route('/users/login')
    .get(function(req, res){
        User.find(function(err, users){
            if (err)
                res.send(err);
            else
                res.send(users);
        });
    });

app.listen(port, function(){
    console.log('we are listenning to port ' + port)
});

// routes
app.use('/api/v1', userRouter);