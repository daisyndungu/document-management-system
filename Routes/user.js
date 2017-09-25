var express = require('express'),
    jwt = require('jsonwebtoken');

var routes = function(User){
    var userRouter = express.Router();
    
    // register a user
    userRouter.route('/register')
        .post(function(req, res){
            var newUser = new User(req.body);
            // hash user password
            newUser.password = newUser.generateHash(req.body.password);
            newUser.save(function(err, user){
                if (err) {
                    res.status(400).send("User already exists");
                }
                else {
                    res.status(201).send(user);
                }
            });
        });

     // register a user
     userRouter.route('/login')
     .post(function(req, res){
        User.findById(req.body._id, function(err, user){
            if (err) {
                res.status(400).send(err);
            }
            else if (user){
                    if (user.validPassword(req.body.password, user.password)){
                        // var token = jwt.sign(user.password, 'superSecret');
                        res.status(200).json({
                            message: 'Successful login!'
                          });
                    } else {
                        res.status(400).send('Invalid password');
                    }
            }
            else {
                res.status(404).send('User not found');
            }
        })
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