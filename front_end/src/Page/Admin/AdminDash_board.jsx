import React, { useState } from 'react'
import AdminHeader from '../../components/Admin/Header'
import AdminSlider from '../../components/Admin/Sider'
import Admin_main from '../../components/Admin/Admin_main'



const AdminDash_board = ({user}) => {


  return (

    <div>
      <AdminHeader user={user}/>
      <AdminSlider />
      <Admin_main/>
      </div>
   
  )
}

export default AdminDash_board