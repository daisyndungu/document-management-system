var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
    uniqueValidator = require('mongoose-unique-validator');

Schema = mongoose.Schema;

var documentModel = new Schema({
    name: {
        type: String,
        unique : true,
        required : true,
        dropDups: true
    },
    publish_date: {
        type: Date,
        required : true
    },
    access: {
        type: Array
    }
},
{
    collection: 'documents'
});

documentModel.plugin(uniqueValidator);
module.exports = mongoose.model('Document', documentModel);
