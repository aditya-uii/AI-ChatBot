import React, { useContext } from 'react'
import Card from '../components/Cards'
import image1 from '../assets/image1.png'
import image2 from '../assets/image2.jpg'
import image3 from '../assets/image7.jpeg'
import image4 from '../assets/image4.png'
import image5 from '../assets/image5.png'
import image6 from '../assets/image6.jpeg'
import image7 from '../assets/authBg.png'
import { RiImageAddFill } from "react-icons/ri";
// import { useState } from 'react'
import { useRef } from 'react'
import { userContextData } from '../context/UserContext'


function Customize () {

const { handleCurrentUserData,
  frontendImage,setFrontendImage,
  backendImage,setBackendImage,
  selectedImage,setSelectedImage} = useContext(userContextData);


    const inputImage = useRef(null);

    const handleImage =(e)=>{
        const file= e.target.files[0];
        setBackendImage(file);
        setFrontendImage(URL.createObjectURL(file));
    }

  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-[black] to-[#030353] flex justify-center items-center flex-col overflow-hidden'>

<h1 className='text-white text-[30px] text-center mb-2'>Select your <span>Assistant Image</span></h1>

        <div className='w-[90%] max-w-[900px] flex justify-center items-center flex-wrap gap-10'>
<Card images={image1}/>
<Card images={image2}/>
<Card images={image3}/>
<Card images={image4}/>
<Card images={image5}/>
<Card images={image6}/>
<Card images={image7}/>

 <div className='w-[80px] h-[150px] lg:w-[150px] lg:h-[250px] bg-[#030326] border-4  border-[#0000ff6c] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-700 cursor-pointer hover:border-white flex items-center justify-center text-amber-50 text-2xl'
 onClick={()=>inputImage.current.click()}
 >
    {!frontendImage && <RiImageAddFill />}
    {frontendImage && <img src={frontendImage} className='h-full object-cover'/>}

    </div>

<input type="file" accept='image/*' hidden ref={inputImage} onChange={handleImage}/>
        </div>

<button className='min-w-[150px] h-[60px] bg-white rounded-full text-black font-semibold  text-[19px] mt-2 cursor-pointer'>NEXT</button>

    </div>
  )
}

export default Customize