import React,{useState,useEffect} from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext'

const RequireAuth2 = ({children}) => {

    const {state} = useAuth()
    const [loading, setLoading] = useState(true); // Initialize loading state to true

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 5000)
  }, []);
  if(state.isAuthenticated){
    return <Navigate to='/owner'/>
  }
  if (loading) {
    // Display a loading indicator while waiting for the authentication check
    return <p>Loading...</p>;
  }
    if(!state.isAuthenticated){
        return children
    }
  
}
export default RequireAuth2
