import React, { createContext } from 'react';
import { useState } from 'react';

export const userContextData = createContext();

function UserContext({ children }) {
  const url = 'http://localhost:8000';
  const [userData,setUserdata] = useState(null);

  const value = {
    url
  };

  return (
    <userContextData.Provider value={value}>
      {children}
    </userContextData.Provider>
  );
}

export default UserContext;

//somehting