import mongoose, { Schema } from "mongoose";

const user = new mongoose.Schema({
    firstName :{
        type : String,
        required : true,
    },
    lastName :{
        type: String,
        required: true,
    },
    email :{
        type: String,
        required: true,
        unique:true
    },
    password :{
        type: String,
        required: true,
        unique:true
    }
})
export const User  = mongoose.model("deepseeks",user);