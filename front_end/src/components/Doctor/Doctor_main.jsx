import React from 'react'
import { useSelector } from 'react-redux'

const Doctor_main = () => {
  const {user}=useSelector(state=>state.Auth)

  return (
    <div style={{margin:'100px 50px 50px 100px',}}>
<div className='bg-[var(--five)] h-[100px] w-full flex flex-col items-center justify-center rounded-lg shadow-md'>
<div className="header-profile bg-amber-100 px-6.5 py-1 rounded-2xl">
        <p> <span className="text-2xl text-blue-950 font-bold ">Dr  </span>{user.username || user.name}</p>
      </div>
      <div className='mt-2'>
        {user.useremail || user.email}
      </div>

</div>
     
<div className="grid sm:grid-cols-5 grid-rows-5 gap-4">
    <div className="row-span-5 bg-[var(--one)]">1</div>
    <div className="col-span-4 row-span-4 bg-[var(--one)]">4</div>
    <div className="col-span-4 col-start-2 row-start-5  bg-[var(--one)]">5</div>
</div>
    
    </div>
  )
}

export default Doctor_main