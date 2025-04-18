import Doctor_main from '@/components/Doctor/Doctor_main'
import Header from '@/components/Doctor/Header'
import Sider from '@/components/Doctor/Sider'
import React from 'react'

const DoctorDash_board = ({user}) => {
  
  return (
    <div>
      <Header user={user}/>
    
      <Sider/>
      <Doctor_main/>
      
    </div>
  )
}

export default DoctorDash_board