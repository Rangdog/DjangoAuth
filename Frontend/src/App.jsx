import { useState } from 'react'
import './App.css'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Navbar from './components/Navbar'
import About from './components/About'
import { Routes,Route, useLocation } from 'react-router-dom'
import ProtectedRouter from './components/ProtectedRoute'
import PasswordResetRequest from './components/PasswordResetRequest'
import PasswordReset from './components/PasswordReset'


function App() {
  const location = useLocation()
  const noNavbar = location.pathname === "/register" || location.pathname === "/" || location.pathname.includes("password")
  return (
    <>

      {
        noNavbar
        ? 
        <Routes>
            <Route path= "/" element={<Login/>}/>
            <Route path= "/register" element={<Register/>}/>
            <Route path= "/request/password_reset" element={<PasswordResetRequest/>}/>
            <Route path= "/password-reset/:token" element={<PasswordReset/>}/>
        </Routes>
        :
        <Navbar
        content = {
              <Routes>
                  <Route element={<ProtectedRouter/>}>
                    <Route path= "/home" element={<Home/>}/>
                    <Route path= "/about" element={<About/>}/>
                  </Route>
              </Routes>
                }
        />
      }
    </>
  )
}

export default App
