import React from 'react'
import Home from './Frontent/Components/Home';
import Signup from './Frontent/Components/Signup.jsx';
import Login from './Frontent/Components/Login';
import { Navigate, Route, Routes } from 'react-router';
import { useAuth } from './Frontent/Components/AuthProvider.jsx';

function App(){
    const {authUser} = useAuth()
    console.log(authUser)
    return <>
    <Routes>
        <Route path='/' element={ authUser?<Home></Home>:<Navigate to ={'/login'}></Navigate>}></Route>
        <Route path='/login' element={authUser?<Navigate to ={"/"}/>:<Login></Login>}></Route>
        <Route path='/signup' element={authUser?<Navigate to ={"/"}/>:<Signup></Signup>}></Route>
    </Routes>
    </>
}

export default App;
