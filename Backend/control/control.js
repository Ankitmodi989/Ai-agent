import { User } from "../model/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from "../Route/config.js";


export const  signup =async(req,res)=>{
    const{firstName,lastName,email,password} = req.body;

    try{
        
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
        const user =await User.findOne({email:email})
        if(user){
            return res.status(409).json({message:"User already exist"});
        }
      const hashfun =  await bcrypt.hash(password,10);
    const newUser = new User({
        firstName,lastName,email,password:hashfun,
    });

   await newUser.save();

    return res.status(201).json({message:"User signin successfull"});

    }catch(error){
        console.error("Signup error:  ",error);
        return res.status(500).json({message:"Internal server error during signup"});
    }
};
export const  login =async(req,res)=>{
         const{email,password} = req.body;
    try{
         const user =await User.findOne({email:email});
            if(!user)
            return res.status(201).json({errors:"Invalid Credential"});
         const isPasscorrect =await bcrypt.compare(password,user.password);
         if(!isPasscorrect)
            return res.status(201).json({errors:"Invalid Credential"});

         const token = jwt.sign({id:user._id},config.jwt_password,{
            expiresIn:"1d"
         })
         const cookieOptions ={
            expires:new Date(Date.now()+24*60*60*1000),
            httpOnly:true,
            secure:process.env.NODE_ENV === "development",
            sameSite:"Strict"

         }
         res.cookie("jwt",token,cookieOptions)
         return res.status(201).json({message: "User login succeeded",user,token});
    }
    catch(err){
        console.log("message: ",err);
        return res.status(500).json({errors:"error in login :"});
    }

};
export const  logout =((req,res)=>{
    
    try{
        res.clearCookie("jwt")
        return res.status(200).json({message:"Logout successful"})
    }catch(error){
        console.log("Error in logout : ",error);
        return res.status(500).json({error: "Error in logout"});
    }

});