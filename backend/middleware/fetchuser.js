var jwt = require('jsonwebtoken');
const JWT_SECTRT = 'amitisaplayer';

const fetchuser = (req, res, next)=>{
    // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    // let token = JSON.parse(sessionStorage.getItem('token'));
    if(!token){
        res.status(401).send({error: "Please authenticate using a valid token"})
    }
    try{
        const data = jwt.verify(token, JWT_SECTRT);
        req.user = data.user;
        next();
     }catch(error){
       res.status(401).send({error: "internal server Error occured"});
     }
}

module.exports = fetchuser