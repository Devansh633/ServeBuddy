import React from 'react'

const HomePage = () => {
  return (
    <div>
      <div className='top-0 bg-slate-300  drop-shadow-md '>
      <div className='max-w-6xl ml-auto mr-auto'>
        <nav className='p-1 flex flex-wrap justify-between items-center gap-2'>
          <h1 className='text-[2.5rem]'>CAFE</h1>
          <div className='flex flex-wrap justify-between gap-[5rem] py-auto'>
            <a href='/signup' className='text-[1.5rem]'>Signup</a>
            <a href='/login' className='text-[1.5rem]'>Login</a>
          </div>
        </nav>
      </div>
    </div>
    <img className='z-0' src='https://muffingroup.com/blog/wp-content/uploads/2021/07/photo-1507133750040-4a8f57021571-1.jpg'/>
    <h1 className='absolute top-[18rem] right-[17rem] text-slate-300 z-10 text-[4rem]'>Get Access to Your Own Virtual Menu</h1>
    </div>
  )
}



export default HomePage