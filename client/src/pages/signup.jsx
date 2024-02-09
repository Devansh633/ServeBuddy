import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
const Signup = () => {

    const navigate = useNavigate()
    const [user,setUser] = useState({
        name:'', email:'',password:'',cpassword:'', phone:'',cafename:'',tables:'' 
    });

    let name,value;
    const handleInputs = (e) => {
        console.log(e)
        name = e.target.name;
        value = e.target.value;
        setUser({...user,[name]:value});
    }

    const Postdata = async(e) =>{
        e.preventDefault();
        const { name,email,password,cpassword,phone,cafename} = user;

        const res = await fetch("/signup",{
            method:"POST",
            headers:{
                "Content-type" : "application/json"
            },
            body: JSON.stringify({
                name,email,password,cpassword,phone,cafename
            })
        });

        const data = await res.json();
        if(res.status === 422 || !data){
            window.alert("Invalid Registration");
            console.log("Invalid Registration");
        }
        else{
            window.alert("Registration Successfull");
            console.log("Registration Successfull");

            navigate("/login")
        }
    }

  return (
    <div className='relative w-full h-full bg-zinc-900/90'>
    <div className='flex  items-center'>
        <form className=' flex flex-wrap justify-around gap-[2rem] max-w-[1000px]  mx-auto bg-white p-8 mt-[4rem]' method='POST'>
          
            <h2 className='text-4xl font-bold text-center py-1 w-screen'>CAFE</h2>
            {/* <div className='flex justify-between py-8'>
                <p className='border shadow-lg hover:shadow-xl px-6 py-2 relative flex items-center'><AiFillFacebook className='mr-2' /> Facebook</p>
                <p className='border shadow-lg hover:shadow-xl px-6 py-2 relative flex items-center'><FcGoogle className='mr-2' /> Google</p>
            </div> */}
            <div className='flex flex-col mb-4 pt-1  w-[400px]'>
                <label>Name</label>
                <input className='border relative bg-gray-100 p-2' type="text" id='name' name='name' value={user.name} onChange={handleInputs} placeholder='Name'/>
            </div>
            <div className='flex flex-col mb-4 pt-1 w-[400px]'>
                <label>Email</label>
                <input className='border relative bg-gray-100 p-2' type="email" id='email' name='email' value={user.email} onChange={handleInputs} placeholder='Email'/>
            </div>
            <div className='flex flex-col mb-4 pt-1 w-[400px]'>
                <label>Password</label>
                <input className='border relative bg-gray-100 p-2' type="password" id='password' name='password' value={user.password} onChange={handleInputs} placeholder='Password'/>
            </div>
            <div className='flex flex-col mb-4 pt-1] w-[400px]'>
                <label>Confirm Password</label>
                <input className='border relative bg-gray-100 p-2' type="password" id='cpassword' name='cpassword' value={user.cpassword} onChange={handleInputs} placeholder='Confirm Password'/>
            </div>
            <div className='flex flex-col pt-1 w-[400px]'>
                <label>Phone</label>
                <input className='border relative bg-gray-100 p-2' type="number" id='phone' name='phone' value={user.phone} onChange={handleInputs} placeholder='Phone Number'/>
            </div>
            <div className='flex flex-col mb-4 pt-1 w-[400px]'>
                <label>Cafe Name</label>
                <input className='border relative bg-gray-100 p-2' type="text" id='cafename' name='cafename' value={user.cafename} onChange={handleInputs} placeholder='Cafe Name'/>
            </div>
            <button className='w-full py-3 mt-4 bg-indigo-600 hover:bg-indigo-500 relative text-white' onClick={Postdata}>Signup</button>
            <div className='flex gap-4 justify-center'>
                <p className='text-center mt-2'>Already a member?</p> 
                <a className='text-center mt-2 text-[#00BFFF]' href='/login'>Login</a>
            </div>
         
        </form>
    </div>
    </div>
  )
}

export default Signup