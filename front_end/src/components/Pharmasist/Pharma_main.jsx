import React from 'react'

const Pharma_main = () => {
  return (
    <div style={{margin:'100px 50px 50px 100px'}}>
<div className='bg-[var(--fiveP)] h-[100px] w-full flex flex-col items-center justify-center rounded-lg shadow-md'>
<p>Name :</p>
<p>Email :</p>
</div>
     
<div className="grid grid-cols-5 grid-rows-5 gap-4">
    <div className="row-span-5 bg-[var(--oneP)]">1</div>
    <div className="col-span-4 row-span-4 bg-[var(--oneP)]">4</div>
    <div className="col-span-4 col-start-2 row-start-5  bg-[var(--oneP)]">5</div>
</div>
    
    </div>
  )
}

export default Pharma_main