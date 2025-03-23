import React from 'react'
import './Style/heroSection.css'
import DoctorHand from '../assets/DoctorHand.jpg'

const HeroSection = () => {
  return (
     <section class="hero">
     <div class="hero-content">
         <h1>Welcome to the HospiPharma  System</h1>
         <p>Streamline your prescriptions and medication management with ease.</p>
         <a href="/dashboard" class="cta-button">Get Started</a>
     </div>
     <div class="hero-image">
       
         <img src={DoctorHand} alt="Pharmacy Collaboration"/>
         
     </div>
 </section>
  )
}

export default HeroSection