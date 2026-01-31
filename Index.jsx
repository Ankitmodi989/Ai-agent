import React from "react";
import ReactDOM from 'react-dom/client';
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { Buffer } from "buffer";
import { AuthProvider } from "./Frontent/Components/AuthProvider.jsx";
window.Buffer = Buffer;


function Index(){
    
    return (
    <>
    <App></App>
    </>
    )
 
}

ReactDOM.createRoot(document.getElementById('root')).render(
<AuthProvider>
<BrowserRouter>
<Index/>
</BrowserRouter>
</AuthProvider>
)