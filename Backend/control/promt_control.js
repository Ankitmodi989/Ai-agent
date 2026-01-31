import { GoogleGenAI } from "@google/genai";
import { Promt } from "../model/promt.js";


const ai = new GoogleGenAI({
  apiKey: "AIzaSyBjsGRutkUtBkELPS_vBAgaRe1Zo9x4YWY"
});
export const Sendpromt = async(req,res)=>{
    const {content} = req.body
    const userId = req.userId

    if(!content ||  content.trim()==="")
        return res.status(400).json({message: "Content not found"})

    try{

        // save user promt
        const userPromt = await Promt.create({
            userId, // jab key or value ke name same ho os case me sig=ngle word me likh skte h 
            role : "user",
            content,
        })

        // send to google gemini
        const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
     contents: [{ role: "user", parts: [{ text: content }] }],
  });

  const result = response.text;

  const aiMessage = await Promt.create({
    userId,
    role:"assistant",
    content:result
  })
  return res.status(200).json({reply : result});
    }catch(error){
        console.log("Error in promt",error);
        return res.status(500).json({error:'something went wrong with ai response'});
    }
};