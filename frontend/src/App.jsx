import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Customize from './pages/Customize'
import Home from './pages/Home'
import { useContext } from 'react'
import { userContextData } from './context/UserContext'

const App = () => {

  const[userData,setUserdata] = useContext(userContextData);

  return (
    <Routes>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/signin' element={<SignIn/>}/>
      <Route path='/customize' element={<Customize/>}/>
      <Route path='/' element={<Home/>}/>
    </Routes>
  )
}

export default App