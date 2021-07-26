const express = require('express'); // import express library;  const express is just a variable
const mongoose = require('mongoose');
const passport = require('passport');
const keys = require('./config/keys');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const app = express (); // this is an instance of express library; adding a library means you created a reference to library, but to use should create instance.


// body parser config
app.use(express.urlencoded({ extended: true })) // if a user has special characters in the name. express will convert them to json.
//app.use(bodyParser.json())
// by asking express to parse body at server level into json, no need to do it in each api. When request
//comes into apis, data will be in json format so it will be easy to read it.

app.use(express.json());

//Db config
const db = keys.mongoURI // this is a connection string

mongoose
    .connect(db)
    .then (() => console.log('MongoDb connected'))
    .catch(err => console.log(err))
//passport config
app.use(passport.initialize()); // asking express to use passport to authenticate the token; it will look for token in the request
require ('./config/passport')(passport);
 // create the first route; route is the request coming from the client; url will dictate the request
// get and post are two most common routes;
app.get('/', (req,res) => res.send('Hello world I am listening'));
// use routes
// routing from server to other files;
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);



const port = 6700;
app.listen(port, () => console.log(`Server is running on port ${port}`));