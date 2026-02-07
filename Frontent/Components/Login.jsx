import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from './AuthProvider.jsx';

const Login = () => {
   const[formData,setFormData] = useState({
        email:"",
        password:""
    })
    const[error,setError] = useState("");
    const[loading,setLoading] = useState(false);
    const navigate = useNavigate();

    const{setAuthUser} = useAuth()

    

    const handleChange = (e)=>{
        const value = e.target.value
        const name = e.target.name

        setFormData({
            ...formData,
            [name]:value,
        })
    }

    const handleLogin = async()=>{

         if (!formData.email.trim() || !formData.password.trim()) {
        setError("Please fill in both email and password");
        return;
    }
        setLoading(true)
        setError("")
        
        try{
            const {data}=await axios.post("https://ai-agent-fr1z.onrender.com/api/v1/user/login",
            {
                email:formData.email,
                password:formData.password,
            },
            {
                withCredentials:true
            }
        );
        console.log(data);

        // console.log("Response status:", response.status);
        // console.log("Response headers:", response.headers);
        // console.log("Response data:", response.data);

            alert(data.message || "Login Successfully");
            localStorage.setItem("user",JSON.stringify(data.user))
            localStorage.setItem("token",data.token);
            setAuthUser(data.token)
            navigate("/")
        }
        catch(error){
          const message =   error?.response?.data?.errors || "Login failed";
          setError(message);
        }
        finally{
            setLoading(false)
        }
    };
  return (
    <div className="bg-black flex   items-center justify-center w-full h-screen text-white">
        <div className="flex flex-col items-center bg-gray-900 rounded-xl h-77 w-90">
            <h1 className='mt-6  font-medium '>Login</h1>
              <input 
              className='border-solid border-white w-80 p-2 mt-2'
               type="email" 
               placeholder='Email address'
                name='email'
                value={formData.email}
                onChange={handleChange}
                />
               <input 
               className='border-solid border-white w-80 p-2 mt-2'
                type="password"
                 placeholder='Password'
                  name='password'
                value={formData.password}
                onChange={handleChange}
                  />
                
                {/* Error Message */}
                {error && <span className='text-red-600 text-sm '>{error}</span>}
               <p className='text-sm mt-3'>By signing or logging in, your concert to AiAgent</p>
                <button onClick={handleLogin} className='bg-blue-700 rounded-2xl p-3 w-50 mt-5 hover:bg-blue-600 cursor-pointer'>{loading?"Login...":"Login"}</button>
            <div className="flex items-center justify-between w-80 mt-3">
                <button >Forgot password?</button>
                <Link to="/signup">Signup</Link>
            </div>
        </div>
    </div>
  )
}

export default Login