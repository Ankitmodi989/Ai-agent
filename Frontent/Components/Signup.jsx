import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'


const Signup = () => {

    const[formData,setFormData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:""
    })
    const[error,setError] = useState("");
    const[loading,setLoading] = useState(false);
    const navigate = useNavigate()

    const handleChange = (e)=>{
        const value = e.target.value
        const name = e.target.name

        setFormData({
            ...formData,
            [name]:value,
        })
    }

    const handleSignup = async()=>{
        setLoading(true)
        setError("")
        try{
            const {data}=await axios.post("http://localhost:3000/api/v1/user/signup",
                {
                firstName : formData.firstName,
                lastName:formData.lastName,
                email:formData.email,
                password:formData.password,
            },
            {
                withCredentials:true
            })
            alert(data.message || "Signup Successfully")
            navigate("/login")
        }
        catch(error){
          const message =   error?.response?.data?.errors || "Signup failed"
          setError(message);
        }
        finally{
            setLoading(false)
        }
    };
  return (
    <div className="bg-black flex   items-center justify-center w-full h-screen text-white">
        <div className="flex flex-col items-center bg-gray-900 rounded-xl h-100 w-90">
            <h1 className='mt-6  font-medium '>Signup</h1>
            <input
             className='border-solid border-white w-80 p-2 mt-2' 
             type="text" 
             placeholder='firstName'
             name='firstName'
             value={formData.firstName}
             onChange={handleChange}
              />
             <input
              className='border-solid border-white w-80 p-2 mt-2'
               type="text" 
               placeholder='lastName'
                name='lastName'
                value={formData.lastName}
                onChange={handleChange}
                />
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
                {error && <span className='text-red-600 text-sm mb-4'>{error}</span>}
               <p className='text-sm mt-5'>By signing or logging in, your concert to AiAgent</p>
                <button onClick={handleSignup} className='bg-blue-700 rounded-2xl p-3 w-50 mt-5 hover:bg-blue-600 cursor-pointer'>{loading?"Signup...":"Signup"}</button>
            <div className="flex items-center justify-between w-80 mt-3">
                <button className=''>Forgot password?</button>
                <Link to="/login">Login</Link>
            </div>
        </div>
    </div>
  )
}

export default Signup