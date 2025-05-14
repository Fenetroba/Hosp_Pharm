import React from 'react'
import Sider from './Sider'
import Header from './Header'
import Pharmacist_data from './pharmacist_data'

const User = ({user}) => {
  return (
    <div>
     <Header/>
     <Sider/>
     <Pharmacist_data user={user}/>
    </div>
  )
}

export default User