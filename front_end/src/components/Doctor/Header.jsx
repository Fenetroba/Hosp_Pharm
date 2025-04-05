import React from 'react'
const Header = () => {
  return (
 
      <div className='fixed top-0 left-0 w-full bg-white shadow-md flex items-center justify-around p-[20px]'>
        <div>
       <h1>Share</h1>
        </div>
        <div className='header-title'>
          <h1 className='text-black'>Doctor Dashboard</h1>
        </div>
        <div className='header-profile'>
          <img src="/images/profile.jpg" alt="Profile" />
        </div>
      </div>

  )
}

export default Header