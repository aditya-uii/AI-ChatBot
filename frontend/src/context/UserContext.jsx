import React, { createContext, useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

export const userContextData = createContext();

function UserContext({ children }) {
  const url = 'https://ai-chatbot-backend-zc90.onrender.com';
  const [userData,setUserdata] = useState(null);
      const [frontendImage,setFrontendImage] = useState(null);
      const [backendImage,setBackendImage] = useState(null);
      const [selectedImage,setSelectedImage] = useState(null);


  const handleCurrentUserData = async () =>{
    try {
      const result = await axios.get(`${url}/api/user/current`,{withCredentials:true});
       setUserdata(result.data);
       console.log(result.data);
    } catch (error) {
    console.log(error.response?.data || error.message);

    }
  }

  const geminiResponse = async (command)=>{
    try {
      const result = await axios.post(`${url}/api/user/asktoassistant`,{command},{withCredentials:true});
      return result.data;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    handleCurrentUserData();
  },[])

  const value = {
  url,
  userData,
  setUserdata,
  handleCurrentUserData,
  frontendImage,setFrontendImage,
  backendImage,setBackendImage,
  selectedImage,setSelectedImage,
  geminiResponse
};

  return (
    <userContextData.Provider value={value}>
      {children}
    </userContextData.Provider>
  );
}

export default UserContext;

