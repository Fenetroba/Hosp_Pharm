import React from 'react'
import CRUD_prescription from './Creating_prescription'
import Sider from './Sider'
import CRUD_Functions from './CRUD_Functions'

const CRUD = () => {
  return (
    <div className='reletive'>
      <Sider/>
      
<div className="grid grid-cols-5 grid-rows-5 gap-4 mt-2">
    <div className="col-span-3 row-span-5">
    
    </div>
    <div className="row-span-5  bg-[var(--one)]">

    </div>
    <div className="row-span-5 col-start-5  bg-[var(--one)]">3</div>
</div>
    
   
     
    </div>
  )
}

export default CRUD