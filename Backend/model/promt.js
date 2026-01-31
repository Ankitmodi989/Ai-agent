import mongoose, { Schema } from "mongoose";

const promtSchema = new Schema({
    userId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required:true
       
    },
    role:{
        type : String,
        enum : ["user","assistant"],
        required:true
    },
    content :{
        type : String,
        required: true
    },
    creatAt :{
        type:Date,
        default : Date.now
    }
});

export const Promt = mongoose.model("promt",promtSchema);