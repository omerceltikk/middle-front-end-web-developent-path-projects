import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Text, Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
function Profile() {
    const navigate = useNavigate()

    const {user,logout} = useAuth()
    const handleLogout = async () => {
        logout(() => {
            navigate("/")
        }); 
    }
  return (
    <div>
        <Text fontSize="22px">Profile</Text>
        <code>{JSON.stringify(user)}</code>
        <br></br>
        <Button mt="20px" colorScheme="pink" variant="solid" onClick={handleLogout}>
            Logout
        </Button>
    </div>
  )
}

export default Profile