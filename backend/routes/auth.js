const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fetchuser = require('../middleware/fetchuser');


const JWT_SECTRT = 'amitisaplayer';

// ROUTE1:-Create a User using: POST "api/auth". Does not require Auth
router.post('/createuser', [
    body('name','Enter a valid name').isLength({min: 3}),
    body('signupEmail','Enter a valid email').isLength({min: 3}),
    body('district','Enter a valid district').isLength({min: 3}),
    body('nearground','Enter a valid nearground').isLength({min: 3}),
    body('place','Enter a valid place').isLength({min: 3}),
    body('distance','Enter a valid distance').isLength({min: 1}),
    body('password').isLength({ min: 5 }),  
    body('confirmpassword').isLength({ min: 5 }),  
    
] , async (req, res)=>{
   //if there are errors, return Bad request and the errors
   console.log(req)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
    // Check whether the user with this email exists already
    let user = await User.findOne({signupEmail: req.body.signupEmail});
    if(user){
      return res.status(400).json({error: "Sorry a user with this email already exists"});
    }
    if(req.body.password!=req.body.confirmpassword)
    {
        return res.status(400).json({error: "Sorry! Password is not matched"});
    }
    const salt = await bcrypt.genSalt(10);
    secPass = await bcrypt.hash(req.body.password, salt);
    // Create a new user
    user =await User.create({
        name: req.body.name,
        signupEmail: req.body.signupEmail,
        district: req.body.district,
        nearground: req.body.nearground,
        place: req.body.place,
        distance: req.body.distance,
        password: secPass,
      });
      const data = {
        user: {
          id: user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECTRT);
    
      res.json(authtoken);
    }
    catch(error){
      console.error(error.message);
      res.status(500).send("Some Error Occured");
    }
})

//  ROUTE2:-Authenticate a User using: POST "/api/auth/login" . No login required
router.post('/login', [
  body('signupEmail','Enter valid Email').isEmail(),
  body('password','Password cannot be blank').exists(),
  
] , async (req, res)=>{
      let success = false;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

const {signupEmail, password} = req.body;
try{
    let user = await User.findOne({signupEmail});
    if(!user){
      success = false
      return res.status(400).json({success, error: "Please try to login with correct credential"});
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare)
    {
      success = false
      return res.status(400).json({success, error: "Please try to login with correct credential Second"});
    }
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECTRT);
    console.log(user.signupEmail)
    const mail = user.signupEmail;
    console.log("Yes")
    success = true;
    // const mail = data.email;
    res.json({success, authtoken,mail});
    // res.status(success).json(authtoken);
} catch(error){
  console.error(error.message);
  res.status(500).send("internal server Error occured");
}
  })

// Logout Api

// router.get('/logout', (req, res)=>{
//   try{
//   console.log("You are now logout");
//   // const token = req.header('auth-token');
//   if(typeof window != 'undefined'){
//   localStorage.removeItem('auth-token');
//   }
//   res.status(200).send("User Logout");
// }
// catch(error){
//   console.log(error.message);
//   res.status(500).send("internal server Error occured");
// }
// });

//  ROUTE3:- Get logged in user detail "/api/auth/getuser" . login required

router.post('/getuser', fetchuser, async (req, res)=> {
  
  try{
     userId = req.user.id;
     const user = await User.findById(userId).select("-password");
     res.send(user);
  
  }catch(error){
    console.error(error.message);
    res.status(500).send("internal server Error occured");
  }
  })


module.exports = router