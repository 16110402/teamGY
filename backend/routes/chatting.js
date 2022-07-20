const express = require('express');
const User = require('../models/User');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');

const JWT_SECTRT = 'amitisaplayer';

// ROUTE1:-Create a User using: POST "api/auth". Does not require Auth
router.post('/createuser', [
    body('name','Enter a valid name').isLength({min: 3}),  
    
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
