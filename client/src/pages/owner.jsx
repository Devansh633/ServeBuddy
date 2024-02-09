import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Orders from '../owner/orders'
import Tables from '../owner/tables'
import Setmenu from '../owner/setmenu'

const Owner = () => {

  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()
  const [toggle,setToggle] = useState(1)
  const [data, setData] = useState([]);


  const toggleTab =(index)=>{
    setToggle(index)
  }

  const logout =async()=>{
    try {
      // Send a request to log the user out on the server
      const response = await fetch('/logout', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Clear the JWT token from cookies
        document.cookie = 'jwtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

        // Redirect to the login page or another appropriate location
        navigate('/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  return (
    <div>
    <div className="navbar  bg-neutral text-neutral-content">
  <div className="navbar-start">
    <a className="btn btn-ghost normal-case text-xl">Hello</a>
  </div>
  <div className="navbar-end">
    <a className="btn" onClick={logout} >Logout</a>
  </div>
</div>
    <div className="tabs">
      <a className={toggle===1? "tab tab-lg tab-lifted tab-active" : "tab tab-lg tab-lifted"} onClick={()=>{toggleTab(1)}}>SetMenu</a> 
      <a className={toggle===2? "tab tab-lg tab-lifted tab-active" : "tab tab-lg tab-lifted"} onClick={()=>{toggleTab(2)}}>Tables QR</a> 
      <a className={toggle===3? "tab tab-lg tab-lifted tab-active" : "tab tab-lg tab-lifted"} onClick={()=>{toggleTab(3)}}>Orders</a>
    </div>
    <div>
      {toggle==1&&<Setmenu/>}
    {toggle==2&&<Tables/>}
    {toggle==3&&<Orders/>}
    </div>
  </div>
  )
}

export default Owner



    