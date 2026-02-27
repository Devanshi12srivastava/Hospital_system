
import React from 'react'
import Login from './pages/login'
import { useContext } from 'react'
import { AppContext } from './context/AppContext'
import { AdminContext } from './context/AdminContext'

const App = () => {
  const {adminToken}= useContext(AdminContext)
  return adminToken ?(
    <div>
    
      
    </div>
  ):(
    <>
    <Login/>
    </>
  )
}

export default App
