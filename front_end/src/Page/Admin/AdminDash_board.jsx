import React, { useState } from 'react'
import AdminHeader from '../../components/Admin/Header'
import AdminSlider from '../../components/Admin/Sider'
import Admin_main from '../../components/Admin/Admin_main'



const AdminDash_board = ({role}) => {
  console.log(role);


  return (

    <div>
      <AdminHeader role={role}/>
      <AdminSlider />
      <Admin_main/>
      </div>
   
  )
}

export default AdminDash_board