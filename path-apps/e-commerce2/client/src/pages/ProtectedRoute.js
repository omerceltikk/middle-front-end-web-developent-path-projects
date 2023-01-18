import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext'

function ProtectedRoute() {
    const {loggedIn} = useAuth()
  return (
    <div>
        
        {
            loggedIn ? <Outlet/> : <Navigate to="/"/>
        }
    </div>
  )
}

export default ProtectedRoute