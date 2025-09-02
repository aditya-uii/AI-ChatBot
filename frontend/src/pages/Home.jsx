import React, { useContext } from 'react'
import { userContextData } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();

  const {userData,url,setUserdata} =useContext(userContextData);

  const handleLogout = async ()=>{
    try {
      const response = axios.get(`${url}/api/auth/logout`,{withCredentials:true});
      navigate('/signup');
      setUserdata(null);
    } catch (error) {
      setUserdata(null);
      console.log(error);
    }
  }

  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#02023d] flex justify-center items-center flex-col gap-5'>

<button 
className='min-w-[150px] h-[60px] bg-white rounded-full text-black font-semibold  text-[19px] absolute top-[30px] right-[20px] cursor-pointer'
onClick={handleLogout}
>LogOut</button>

<button 
className='min-w-[150px] h-[60px] bg-white rounded-full text-black font-semibold  text-[19px]  absolute top-[100px] right-[20px] p-[10px] cursor-pointer'
onClick={()=>{
  navigate('/customize')
}}
>Customize assistant</button>

<div className='w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-4xl'>
 <img src={userData?.assistantImage} alt=""  className='h-full object-cover '/>
</div>
<h1 className='text-white text-[18px] font-semibold'>Hi I'm {userData?.assistantName}</h1>
    </div>
  )
}

export default Home