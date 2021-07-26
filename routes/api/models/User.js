const mongoose = require('mongoose');
//schema is within mongoose library
// scheema is template of data
const Schema = mongoose.Schema;
const UserSchema = new Schema ({
    name : {
        type : String, 
        required : true
    }, 

    email : {
        type : String, 
        required : true
    }, 

    password : {
        type : String, 
        required : true
    },

    avatar : {
        type : String
    },

    date : {
        type : Date, 
        default : Date.now
    }
});

// ask mongoose to create a model in db
//const User = mongoose.model('users', UserSchema); // model is equivalent to table. 

module.exports = User = mongoose.model('users', UserSchema)  ; // exporting variable is more useful than just exporting schema
// users is the name of the table in db