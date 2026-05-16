import axios from 'axios';
import { ArrowUp, Bot, Globe, Paperclip } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { data } from 'react-router';



const Prompt = () => {
    const[input,setInput] = useState("");
    const[typemessage,setType]= useState("");
    const[promt,setPromt] = useState([])
     const[loading,setLoading] = useState(false)

    const hadleSend =async()=>{
        const trimmedvalue = input.trim();
        if(!trimmedvalue)
            return ;
        setType(trimmedvalue);
        setInput("")
        setLoading(true)

        try{
            const token = localStorage.getItem("token")
            const response = await axios.post("https://ai-agent-fr1z.onrender.com/api/v1/user/promt",{
                content:trimmedvalue
            },
            {
                headers:{
                    Authorization:`Bearer ${token}`
                },
                withCredentials:true
            }
        )
        setPromt((prev)=>[
            ...prev,
            {role:"user",content:trimmedvalue},
            {role:"assistant",content:response?.data?.reply}
        ])
        }
        catch(error){
            setPromt(prev=>[
            ...prev,
            {role:"user",content:trimmedvalue},
            {role:"assistant",content:"Something went wrong the AI response."}
        ])
        }
        finally{
            setLoading(false)
            setType(null)
        }
    };
   

    const handlekeydown = (e)=>{
        if(e.key == "Enter" )
            hadleSend();
    }

             useEffect(() => {
                console.log("promt", promt);
            }, [promt])

            useEffect(() => {
                const chatContainer = document.querySelector('.chat-container');
                if (chatContainer) {
                    chatContainer.scrollTop = chatContainer.scrollHeight
                }
            }, [promt])

    return (
    <div>
        {/* Greeting */}
        <div className="flex flex-col items-center ">
        <div className="flex text-2xl font-bold p-2">
            <img src="https://freepnglogo.com/images/all_img/logo-chatgpt-png-c07b.png" alt="image" className='h-7 ' />
            <h1 className='px-2'>Hi, I'm Deepseek.</h1>
        </div>
        <p className='text-sm text-shadow-white'>How can I help you todays?</p>
        </div>

        {/* promt */}
          <div className="w-full max-w-4xl flex-1 overflow-y-auto mt-6 mb-4 space-y-4 max-h-[60vh] px-1 mx-auto chat-container">
                {promt.map((msg, index) => (
                    <div 
                        key={index} 
                        className={`w-full flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                        <div className={`max-w-[90%] rounded-xl px-4 py-2 text-sm whitespace-pre-wrap ${
                            msg.role === "user" 
                                ? "bg-blue-600 text-white" 
                                : "bg-gray-800 text-white"
                        }`}>
                            {msg.content}
                        </div>
                    </div>
                ))}
                
                {/* Loading Indicator */}
                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-gray-700 text-white rounded-xl px-4 py-2">
                            Thinking...
                        </div>
                    </div>
                )}
            </div>

   

        {/* input box */}
        <div className="bg-gray-900 rounded-2xl mt-10 w-full h-28 ">
        <div className="p-3 mx-2">
            <input 
            value={input}
            onChange={(e)=>setInput(e.target.value)}
            onKeyDown={handlekeydown}
            type="text" 
             placeholder='Message Deepseek'
             className='border-none  w-150 outline-none' />
            <div className="flex  justify-between mt-3">
                <div className="flex space-x-2 ">
                <button className='flex bg-gray-800 p-2 mx-2 rounded-2xl hover:bg-gray-700 cursor-pointer'><Bot></Bot>DeepThink</button>
                <button className='flex bg-gray-800 p-2 rounded-2xl hover:bg-gray-700 cursor-pointer'><Globe></Globe>Search</button>
                </div>
            <div className="flex space-x-2">
                <button className='hover:bg-gray-700 p-2 rounded-2xl'><Paperclip></Paperclip></button>
                <button onClick={hadleSend} className='bg-blue-800 hover:bg-blue-700 p-2 rounded-2xl'><ArrowUp></ArrowUp></button>
            </div>
    </div>
        </div>
    </div>
    </div>
  )
}

export default Prompt