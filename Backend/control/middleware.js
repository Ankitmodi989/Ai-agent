import jwt from 'jsonwebtoken'
import config from '../Route/config.js'

function userMiddleware(req,res,next){
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer")){
        return res.status(401).json({errors : "No token provided"});
    }

    const token = authHeader.split(" ")[1];

    try{
        const decoded =  jwt.verify(token,config.jwt_password);
        console.log(decoded)
        req.userId = decoded.id;

        next();
    }
    catch(error){
        console.log("Message ",error);
        return res.status(500).json({error:"Unauthorizised user"})
    }
}

export default userMiddleware;