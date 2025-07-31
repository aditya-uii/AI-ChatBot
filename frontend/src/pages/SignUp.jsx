import React from 'react'
import bg from '../assets/authBg.png';
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useState } from 'react';


const SignUp = () => {

   const[showPassword,setShowPassword] = useState(true);

  return (
    <div className='w-full h-[100vh] bg-cover flex justify-center items-center' style={{
        backgroundImage:`url(${bg})`
    }}>
<form className='w-[90%] h-[600px] max-w-[500px] bg-[#0000005e] backdrop-blur shadow-lg shadow-blue-800 flex flex-col items-center justify-center gap-[20px] px-[20px]'>

<h1 className='text-white text-[30px] font-semibold mb-30'>Register to <span className='text-blue-500'>Virtual Assistant</span></h1>

<input type="text" placeholder='Enter your name' className='w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full'/>


<input type="text" placeholder='email' className='w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full'/>

<div className='w-full h-[60px] border-2 border-white bg-transparent text-white rounded-full text-[18px] relative'>

<input type={showPassword?'text':'password'} placeholder='password' className='w-full h-full outline-none placeholder-gray-300  bg-transparent  px-[20px] py-[10px]' />

{!showPassword && <IoEye className='absolute top-[18px] right-[20px] text-[white] w-[25px] h-[25px]' 
onClick={() => setShowPassword(true)}

/>}


{showPassword && <IoEyeOff className='absolute top-[18px] right-[20px] text-[white] w-[25px] h-[25px]'
onClick={() => setShowPassword(false)}

/>}

</div>


</form>
    </div>
  )
}

export default SignUp