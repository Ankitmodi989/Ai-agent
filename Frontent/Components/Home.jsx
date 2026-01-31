import React from 'react'
import Sidebar from './Sidebar'
import Prompt from './Prompt'

const Home = () => {
  return (
    <div className='flex  h-screen bg-black text-white' >
        {/* sidebar */}
        <div className="w-64 bg-[#232322]">
            <Sidebar></Sidebar>
        </div>

        {/* prompt */}
        <div className="flex-1 flex flex-col w-full">
            <div className="flex-1 flex items-center justify-center px-6">
            <Prompt></Prompt>
            </div>
        </div>
    </div>

  )
}

export default Home