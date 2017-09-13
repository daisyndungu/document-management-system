var express = require('express');

var routes = function(User){
    var userRouter = express.Router();
    
    // register a user
    userRouter.route('/register')
        .post(function(req, res){
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
                    res.status(200).send(users);
            });
        });
    
    // add a middleware to find a user by id
    userRouter.use('/:id', function(req, res, next){
        User.findById(req.params.id, function(err, user){
            if (err) {
                res.status(400).send(err);
            }
            else if (user){
                req.user = user;
                next();
            }
            else {
                res.status(404).send('User not found');
            }
        })
    });

    // enable delete, get and update user details
    userRouter.route('/:id')
        .get(function(req, res){
            res.json(req.user);
        })
        .put(function(req, res){
            req.user._id = req.body._id;
            req.user.username = req.body.username;
            req.user.role = req.body.role;
            req.user.save(function(err, user){
                if (err){
                    res.send('error')
                }
                else {
                    res.status(200).send('User data updated succesfully');
                }
            });
            
        })
        .delete(function(req, res){
            req.user.remove(function(err, success){
                if (err) {
                    res.status(400).send(err);
                }
                else {
                    res.status(200).send('Deleted successfully');
                }
            });

        });

    return userRouter;
};

module.exports = routes;