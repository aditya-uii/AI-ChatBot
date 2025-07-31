import React from 'react'
import bg from '../assets/authBg.png';
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useContext } from 'react';
import { userContextData } from '../context/UserContext';


const SignUp = () => {

    const { url } = useContext(userContextData)

   const[showPassword,setShowPassword] = useState(true);
   const[name,setName] = useState('');
   const[email,setEmail] = useState('');
   const[password,setPassword] = useState('');
   const[error,setError] = useState('');

   const navigate = useNavigate();

   const handleSignUp = async (e) =>{
    e.preventDefault();
     setError("");
try {
    let response = await axios.post(`${url}/api/auth/signup`,{
        name,email,password
    },{withCredentials:true})
    console.log(response);

     // Clear inputs after success
    setName("");
    setEmail("");
    setPassword("");
   

} catch (error) {
    console.log(error);
 setError(error.response?.data?.error || "Something went wrong");
}
   }

  return (
    <div className='w-full h-[100vh] bg-cover flex justify-center items-center' style={{
        backgroundImage:`url(${bg})`
    }}>
<form
onSubmit={handleSignUp}
className='w-[90%] h-[600px] max-w-[500px] bg-[#0000005e] backdrop-blur shadow-lg shadow-blue-800 flex flex-col items-center justify-center gap-[20px] px-[20px]'>

<h1 className='text-white text-[30px] font-semibold mb-20'>Register to <span className='text-blue-500'>Virtual Assistant</span></h1>

{/* Name of the user here */}
<input type="text" placeholder='Enter your name' 
required
onChange={(e)=>{setName(e.target.value)}}
value={name}
className='w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full'/>

{/* Email of the user here  */}
<input type="text" placeholder='email'
required
onChange={(e)=>{setEmail(e.target.value)}}
value={email}
className='w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full'/>


{/* password of the user here  */}
<div className='w-full h-[60px] border-2 border-white bg-transparent text-white rounded-full text-[18px] relative'>

<input type={showPassword?'text':'password'} placeholder='password' 
required
onChange={(e)=>{setPassword(e.target.value)}}
value={password}
className='w-full h-full outline-none placeholder-gray-300  bg-transparent  px-[20px] py-[10px]' />

{!showPassword && <IoEye className='absolute top-[18px] right-[20px] text-[white] w-[25px] h-[25px]' 
onClick={() => setShowPassword(true)}

/>}


{showPassword && <IoEyeOff className='absolute top-[18px] right-[20px] text-[white] w-[25px] h-[25px]'
onClick={() => setShowPassword(false)}

/>}

</div>

{error.length>0 && <p className='text-red-500'>{error}</p>}

<button 
className='min-w-[150px] h-[60px] bg-white rounded-full text-black font-semibold  text-[19px]'>SignUp</button>

<p onClick={()=>{navigate('/signin')}} className='text-white text-[18px] cursor-pointer'>Already have an account? <span className='text-blue-400 '>Sign In</span></p>
</form>
    </div>
  )
}

export default SignUp