const express = require('express');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require ('../../routes/api/models/User');
const keys = require ('../../config/keys')
// @route POST api/users/register
// @desc Register a user
// @access Public

// below column name is email; in post api,  whenever you are sending the data, data is embedded in the body of message

router.post('/register', (req,res) => {
    User.findOne({email : req.body.email}) // req.body.email will inform us of what the user typed in text box and email : will compare it with column in db
    .then(user => {
        if(user ){  
             // then means if the statement completes succefully, we evaluate if we found the record or not
            //user = data returned from req.body.email
            // specify email text box so it is easier to identify to whom the message is addressed
            // include status code, ex 404, 500. By default = 200
            return res.status(400).json({email : 'Email already exists' });
        }
        else {
            const avatar = gravatar.url(req.body.email, {
                s : '200',
                r : 'pg',
                d : 'mm'
            });

            // in order to write record into db, create instance of the model, basically a new row in the user's collection
           // if the user does not exist, then the following data will be encaptured
            const newUser = new User ({
                name : req.body.name, 
                email : req.body.email, 
                password : req.body.password,
                avatar 

            });

            // genSalt is a function; (err,salt) is callback
            // after 10 rounds you will either get an error or salt
            // throw error will get you out of the function immediately no need to write else
            bcrypt.genSalt(10, (err,salt) => {
                if (err) throw error;
                bcrypt.hash(req.body.password,salt,(err,hash)=>{

                    if(err) throw error;
                    newUser.password = hash;
                    newUser.save()     // commiting to db
                    .then(user =>  res.json(user))
                    .catch(err=> console.log(err) )
                });
                
                // give salt to hashing function. This was the main function that we wanted but we needed salt


            });// number of iterations = 10; using callback which means either  you will get error or salt. 
            // two parameters are passed err and salt.
            //.then() and .catch() could have been used as well instead.
            // throw err will halt the function immediately



        }
    }) // need to check if user statement returned something or not
    .catch (err => console.log(err));
});


//@route POST api/users/login
//@desc Login a user and generate a token
// @access Public

router.post('/login', (req, res) => {
    User.findOne({email : req.body.email})
    .then(user =>{
        if(!user){
            return res.status(404).json({email: 'User not found'})
        }

        bcrypt.compare(req.body.password,user.password)
        .then(isMatch => {
            if(isMatch) {

                //Payload
                const payload = {
                    id : user.id,
                    name : user.name,
                    avatar : user.avatar
                };

                // sign token
                // key is the same key that you will use to decrypt

                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {expiresIn: 3600},
                    (err,token) => {
                        return res.json({token : 'Bearer' + token})
                    }
                    
                    
                    )



            } else {

            

            return res.status(400).json({password: 'Incorrect password'});

            }
        })
    })
    .catch(err => console.log(err))
});



// write an export statement
// only exporting routing because that is where all the configuration is being done.

module.exports = router;