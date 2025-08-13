import React, { useContext } from 'react'
import { userContextData } from '../context/UserContext';


function Card({images}){


    const { handleCurrentUserData,
      frontendImage,setFrontendImage,
      backendImage,setBackendImage,
      selectedImage,setSelectedImage} = useContext(userContextData);

return(
    <div className={`w-[80px] h-[150px] lg:w-[150px] lg:h-[250px] bg-[#030326] border-4  border-[#0000ff6c] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-700 cursor-pointer hover:border-white
    ${selectedImage==images? 'border-4 border-white shadow-2xl shadow-blue-700':null}
    `}>
<img src={images} alt="" className='h-full object-cover' onClick={()=>{setSelectedImage(images)}}/>
    </div>
)
}

export default Card;