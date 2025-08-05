import React from 'react'

function Card({images}){
return(
    <div className=' w-[80px] h-[150px] lg:w-[150px] lg:h-[250px] bg-[#030326] border-4  border-[#0000ff6c] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-700 cursor-pointer hover:border-white'>
<img src={images} alt="" className='h-full object-cover'/>
    </div>
)
}

export default Card;