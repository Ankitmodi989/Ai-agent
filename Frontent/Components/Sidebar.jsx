import axios from 'axios';
import { LogOut, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { useAuth } from './AuthProvider';



const Sidebar = () => {

    // const user = JSON.parse(localStorage.getItem("user") || "null")
    // console.log(user);
    const [user, setUser] = useState(null);
    const {setAuthUser}=useAuth()
    const navigate = useNavigate()

     useEffect(() => {
        let userData = null;
        try {
            const storedUser = localStorage.getItem("user");
            if (storedUser && storedUser !== "undefined") {
                userData = JSON.parse(storedUser);
            }
        } catch (error) {
            console.error("Error parsing user data:", error);
            localStorage.removeItem("user");
        }
        setUser(userData);
    }, []);

    const handleLogout = async()=>{

      try{
          const {data} = await axios.get("https://ai-agent-fr1z.onrender.com/api/v1/user/logout",{
           withCredentials:true
        })

        localStorage.removeItem("user")
        localStorage.removeItem("token")
        
         setAuthUser(null)
          setUser(null);
         navigate("/login")
      }
      catch(error){
        alert(error?.response?.data?.errors || "Logout Failed")
      }
    }
  return (
    <div className=' flex flex-col h-full bg-[#232327]'>
        {/* Header */}
        <div className=" flex flex-row p-4 border-b border-gray-700 items-center justify-between">
            <div className="text-xl font-bold text-white">deepseek</div>
            <button><X></X></button>
        </div>

        {/* History */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
            <button className='w-full bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl mb-4'>+ New chat</button>
            <div className="text-gray-500 text-sm mt-40 text-center">No chat history yet</div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700">
            <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 cursor-pointer">
                    <img  className='rounded-full w-8 h-8' src="https://freepnglogo.com/images/all_img/logo-chatgpt-png-c07b.png" alt="" />
                    <span className='text-gray-300'>{user?user.firstName:"My Profile"}</span>
                </div> 
                <button onClick={handleLogout} className='flex items-center gap-2 text-white px-4 rounded-lg hover:bg-gray-800 py-3'><LogOut></LogOut>Logout</button>
            </div>
        </div>

    </div>
  )
}

export default Sidebar