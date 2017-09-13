var express = require('express');

var routes = function(User){
    var userRouter = express.Router();
    
    // register a user
    userRouter.route('/register')
        .post(function(req, res){
            console.log(req.body);
            var newUser = new User(req.body);
            // hash user password
            newUser.password = newUser.generateHash(req.password);
            newUser.save(function(err, user){
                if (err) {
                    res.status(400).send("A error occurred. Please try again");
                }
                else {
                    res.status(201).send(user);
                }
            });
        });
    
    // fetch all users in DB
    userRouter.route('')
        .get(function(req, res){
            User.find(function(err, users){
                if (err)
                    res.send(err);
                else
                    res.send(users);
            });
        });
    return userRouter;
};

module.exports = routes;