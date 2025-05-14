import React from 'react'
import  pharma from '../../assets/pharma.jpg'
import RelatedFinance from './RelatedFinance'
const FrontSide = () => {
  return (
    <div className='sm:flex  space-x-2.5 p-2'>
     <img src={pharma} alt="pharma" className='w-80 p-2'/>
     <RelatedFinance/>
    </div>
  )
}

export default FrontSide