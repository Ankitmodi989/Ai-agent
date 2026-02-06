import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authrouter from './Route/route.js';
import promtrouter from './Route/promt_route.js'
import cookieParser  from 'cookie-parser';
import cors from 'cors'

dotenv.config();
const app = express();
const port  = process.env.PORT || 4001;
const uri = process.env.MONGO_URI ;

mongoose.connect(uri).then(()=>console.log("Connected to Mongodb")).catch((error)=>console.log("mongo dp connection error: ",error));

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true,
    methods:["GET","POST","PUT","DELETE"],
    allowedHeaders:["Content-Type","Authorization"],
    })
);

// route
app.use("/api/v1/user",authrouter)
app.use("/api/v1/user",promtrouter)

app.get('/test',(_req,res)=>{
    res.json({message: 'API is working'});
});

app.listen(port,()=>{
    console.log(`listening at port no. ${port}`)
})