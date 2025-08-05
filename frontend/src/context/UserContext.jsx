import React, { createContext, useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

export const userContextData = createContext();

function UserContext({ children }) {
  const url = 'http://localhost:8000';
  const [userData,setUserdata] = useState(null);


  const handleCurrentUserData = async () =>{
    try {
      const result = await axios.get(`${url}/api/user/current`,{withCredentials:true});
       setUserdata(result.data);
       console.log(result.data);
    } catch (error) {
    console.log(error.response?.data || error.message);

    }
  }

  useEffect(()=>{
    handleCurrentUserData();
  },[])

  const value = {
  url,
  userData,
  handleCurrentUserData
};

  return (
    <userContextData.Provider value={value}>
      {children}
    </userContextData.Provider>
  );
}

export default UserContext;

