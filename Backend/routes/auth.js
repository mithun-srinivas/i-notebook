const express = require('express');
const router = express.Router();
const User = require('../models/Users')
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser')

const jwt_secret = 'Mithun_Secret'

const { body, validationResult } = require('express-validator');

//Route 01 : Create user ; No Login Required

router.post('/createUser',[
    
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
    
] ,async (req, res) => {
    //If Errors Encountered
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //If No Errors 
    //Checking if user exists
    try {
        let user = await User.findOne({email: req.body.email});
        console.log(user);
        if(user){
            return res.status(400).json({error: 'User with this mail already exists'})
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt) ;
        //Create New User
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data,jwt_secret)
        // console.log(jwtdata);
        res.json({'authToken': authtoken})  
    } catch (error) {
        console.error(error);
        res.status('500').send('Internal Server Error')
    } 
})




//Route 02 : login ; Autheticate a User 'api/auth/login

router.post('/login',[

    body('email').isEmail(),
    body('password').exists(),
    
] ,async (req, res) => { 

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email,password} = req.body;

    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error: "Please Login with Proper Credentials"});
        }


        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            return res.status(400).json({error: "Please Login with Proper Credentials"}); 
        }
        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data,jwt_secret)
        // console.log(jwtdata);
        res.json({'authToken': authtoken})  

    } catch (error) {
        console.error(error);
        res.status('500').send('Internal Server Error')
        
    }

})

//Route 03 : Get Logged In User Details; Logi Required

router.post('/getUser',fetchUser,async (req, res) => { 

     try {
        const UID = req.user.id;
        const user = await User.findById(UID).select('-password')
        res.send(user)
     } catch (error) {
        console.error(error);
        res.status('500').send('Internal Server Error')
     }

})



module.exports = router;