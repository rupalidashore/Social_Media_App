const express = require('express'); // import express library;  const express is just a variable
const mongoose = require('mongoose');
const keys = require('./config/keys');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const app = express (); // this is an instance of express library; adding a library means you created a reference to library, but to use should create instance.

//Db config
const db = keys.mongoURI // this is a connection string

mongoose
    .connect(db)
    .then (() => console.log('MongoDb connected'))
    .catch(err => console.log(err))


 // create the first route; route is the request coming from the client; url will dictate the request
// get and post are two most common routes;
app.get('/', (req,res) => res.send('Hello world'));
// use routes

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);



const port = 7000;
app.listen(port, () => console.log(`Server is running on port ${port}`));