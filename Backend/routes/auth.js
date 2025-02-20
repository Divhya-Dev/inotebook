import express from 'express';
import User from '../models/User.js';
import expValidator from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const router = express.Router();
const {body, validationResult } = expValidator;

const JWT_SECRET = 'katisthegod'; 

//ROUTE 1: Create a new user using POST, Path-/auth/createUser
router.post('/createUser',[body('name').notEmpty(), body('email').isEmail()], async(req, res) => {
    const errors = validationResult (req);
    //Any validation errors found will be shown in response
    if(!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
       
    try
    {
        //Find if request email matches already existing mail in db
        let user = await User.findOne({email: req.body.email});
        if(user)
            return res.status(400).json('User already exists please try again.');  

        const salt = await bcrypt.genSalt(10);
        const secretPassword = await bcrypt.hash(req.body.password, salt);
        //Create new user in db
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secretPassword
        });

        const data = { 
            user: {
                id: user.id
            }}
        const authToken = jwt.sign(data, JWT_SECRET);
        console.log(req.body);
        return res.status(200).json({authToken});   

    }
    catch(err){
        res.status(500).json({error: 'Some unexpected error has occured.', message: err.message}); 
        console.log(err);
    }
   
})


//ROUTE 2: Login User, Path-/auth/login
router.post('/login',[body('email').isEmail()], async(req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty())
        return res.status(400).json({errors: errors.array()});

    try
    {
        const {email, password} = req.body;
        let user = await User.findOne({email});
        //console.log('entered try')
        if(!user)
            return res.status(400).json({error: 'User not found please enter a registered Email ID.'});
    
        const passwordCompare = bcrypt.compareSync(password, user.password);
        if(!passwordCompare)
            return res.status(400).json({error: 'Please enter the correct password.'});

        const data = {
            user: {
                id: user.id
            }
        };
        const authToken = jwt.sign(data, JWT_SECRET);
        res.status(200).json({authToken: authToken});
    }
    catch(err){
        res.status(500).json({error:'An unexpcted error has occured.', message: err.message})
        console.log(err);
    }
   
})



export default router;