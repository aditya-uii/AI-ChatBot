import React, { useContext, useState } from 'react'
import { userContextData } from '../context/UserContext';

const Customize2 = () => {
  const {userdata} = useContext(userContextData)
   const[assistantName,setAssistantName]  = useState(userdata?.assistantName || "");

  return (
       <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353] flex justify-center items-center flex-col overflow-hidden'>

<h1 className='text-white text-[30px] text-center mb-2'>Enter your <span>Assistant Name</span></h1>

<input type="text" placeholder='your name'
required
onChange={(e)=>setAssistantName(e.target.value)}
value={assistantName}
className='w-full max-w-[600px] h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full'/>

{assistantName && 
<button 
className='min-w-[300px] h-[60px] bg-white rounded-full text-black font-semibold  text-[19px] mt-5'>Create your assistant</button>
}


        </div>
  )
}

export default Customize2