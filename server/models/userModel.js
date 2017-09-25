var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs');

Schema = mongoose.Schema;

var userModel = new Schema({
    _id: {
        type: String
    },
    username: {
        type: String
    },
    
    password: {
        type: String
    },
    role: {
        type: Array
    }

},
{
collection: 'users'
});

// hash the password
userModel.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  };
  
// checking if password is valid
userModel.methods.validPassword = function(password, hash) {
return bcrypt.compareSync(password, hash);
};

module.exports = mongoose.model('User', userModel);
