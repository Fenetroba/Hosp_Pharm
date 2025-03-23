import React from 'react'
import './Style/header.css'
const Header = () => {
  return (
     <header>
     <div class="logo">
         <a href="/">Hospi<span>Pharma</span></a>
     </div>
     <nav>
         <ul>
             <li><a href="/Testimony">Testimony</a></li>
             <li><a href="/Service">Service</a></li>
             <li><a href="/home">Home</a></li>
             <li><a href="/about">About Us</a></li>
             <li><a href="/contact">Contact</a></li>
         </ul>
     </nav>
     <div class="Login">
       <button className='Login'>Login</button>
     </div>
    
 </header>
  )
}

export default Header