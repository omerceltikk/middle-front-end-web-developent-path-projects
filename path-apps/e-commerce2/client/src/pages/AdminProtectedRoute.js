import React from 'react'
import { Navigate } from 'react-router-dom'
import Admin from './Admin'
import { useAuth } from '../contexts/AuthContext'

function AdminProtectedRoute() {
    const {user} = useAuth()
  return user.role === "admin" ? <Admin/> : <Navigate to="/"/>
}

export default AdminProtectedRoute