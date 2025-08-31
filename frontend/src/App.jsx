import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Customize from './pages/Customize'
import Home from './pages/Home'
import { useContext } from 'react'
import { userContextData } from './context/UserContext'
import Customize2 from './pages/Customize2'

const App = () => {

  const{userData,setUserdata} = useContext(userContextData);

  return (
    <Routes>
      <Route path='/signup' element={!userData?<SignUp/>:<Navigate to={'/'}/>}/>
      <Route path='/signin' element={!userData?<SignIn/>: <Navigate to={'/'}/>}/>
      <Route path='/customize' element={userData?<Customize/>:<Navigate to={'/signin'}/>}/>
      <Route path='/customize2' element={userData?<Customize2/>:<Navigate to={'/signin'}/>}/>
      <Route path='/' element={(userData?.assistantImage && userData?.assistantName)? <Home/> : <Navigate to={'/customize'}/>}/>
    </Routes>
  )
}

export default App