var express = require('express');

var routes = function(Document){
    var documentRouter = express.Router();
    
    // register a user
    documentRouter.route('')
        .post(function(req, res){
            if (!req.body.access){
                res.status(400).send('No access rights provided');
            }
            access = [];
            for (var len=0; len<req.body.access.length; len++){
                access.push(req.body.access[len].toUpperCase());
            }
            if (access.length > 1 && access.includes('PUBLIC') ||
            access.length > 1 && access.includes('PRIVATE')){
                res.status(400).send('Acces rights should be "Private", "Public" or role(s) eg "Software Dev"');
            }
            else {
                var newDocument = new Document(req.body);
                // res.status(201).send(dd);
                newDocument.save(function(err, document){
                    if (err) {
                        res.status(400).send('An error occurred. Please check document name or Publish Date provided and try again');
                    }
                    else {
                        res.status(201).send(newDocument);
                    }
                });
            }
        }) 
        // fetch all documents
        .get(function(req, res){
            Document.find(function(err, documents){
                if (err){
                    res.status(400).send(err);
                }
                else
                    res.status(200).send(documents);
            });
        });

    return documentRouter;
};

module.exports = routes;