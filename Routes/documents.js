var express = require('express');

var routes = function(Document){
    var documentRouter = express.Router();
    
    // add a new document
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
    // add a middleware to find a document by id
    documentRouter.use('/:id', function(req, res, next){
        Document.findById(req.params.id, function(err, document){
            if (err) {
                res.status(400).send(err);
            }
            else if (document){
                req.document = document;
                next();
            }
            else {
                res.status(404).send('Document not found');
            }
        })
    });
    // enable delete, get and update Document details
    documentRouter.route('/:id')
        .get(function(req, res){
            res.json(req.document);
        })
        .put(function(req, res){
            access = [];
            if (req.body.access){

                for (var len=0; len<req.body.access.length; len++){
                    access.push(req.body.access[len].toUpperCase());
                }
            }

            if (access.length > 1 && access.includes('PUBLIC') ||
            access.length > 1 && access.includes('PRIVATE')){
                res.status(400).send('Acces rights should be "Private", "Public" or role(s) eg "Software Dev"');
            }
            else {
                req.document.name = req.body.name;
                req.document.publish_date = req.body.publish_date;
                req.document.access = req.body.access;
                req.document.save(function(err, document){
                    if (err){
                        res.send('error')
                    }
                    else {
                        res.status(200).send('Document details updated succesfully');
                    }
                });
            }
            
        })
        .delete(function(req, res){
            req.document.remove(function(err, success){
                if (err) {
                    res.status(400).send(err);
                }
                else {
                    res.status(200).send('Deleted successfully');
                }
            });

        });
    return documentRouter;
};

module.exports = routes;