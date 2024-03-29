import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'

export default function Login() {

    const navigate = useNavigate()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const loginUser = async(e) => {
        e.preventDefault();
        localStorage.setItem("email",email)
        const res = await fetch('/login',{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,password
            })
    });
    const data = await res.json();
    if(res.status === 400 || !data){
        window.alert("Invalid Credentials");
    }
    else{
        window.alert("Registration Successfull");
        navigate("/owner")
    }
}

  return (
    <div className='relative w-full h-screen bg-zinc-900/90'>
    <div className='flex justify-center items-center h-full'>
        <form method='POST' className='max-w-[400px] w-full mx-auto bg-white p-8'>
            <h2 className='text-4xl font-bold text-center py-4'>CAFE</h2>
            {/* <div className='flex justify-between py-8'>
                <p className='border shadow-lg hover:shadow-xl px-6 py-2 relative flex items-center'><AiFillFacebook className='mr-2' /> Facebook</p>
                <p className='border shadow-lg hover:shadow-xl px-6 py-2 relative flex items-center'><FcGoogle className='mr-2' /> Google</p>
            </div> */}
            <div className='flex flex-col mb-4 pt-[1rem]'>
                <label>Email</label>
                <input className='border relative bg-gray-100 p-2' type="text" name='email' id='email'
                 value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
            </div>
            <div className='flex flex-col py-[1rem]'>
                <label>Password</label>
                <input className='border relative bg-gray-100 p-2' type="password" name='password' id='password'
                 value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password'/>
            </div>
            <button className='w-full py-3 mt-8 bg-indigo-600 hover:bg-indigo-500 relative text-white' onClick={loginUser}>Login</button>
            <div className='flex gap-4 justify-center'>
                <p className='text-center mt-8'>Not a member?</p> 
                <a className='text-center mt-8 text-[#00BFFF]' href='/signup'>Sign up now</a>
            </div>
        </form>
    </div>
    </div>
  )
}