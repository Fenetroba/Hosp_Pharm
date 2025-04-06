import React from 'react'

const Doctor_main = () => {
  return (
    <div style={{margin:'100px 50px 50px 100px',}}>
<div className='bg-[var(--five)] h-[100px] w-full flex flex-col items-center justify-center rounded-lg shadow-md'>
<p>Name :</p>
<p>Email :</p>
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