import React from 'react'
import './Style/heroSection.css'
import DoctorHand from '../assets/DoctorHand.jpg'

const HeroSection = () => {
  return (
     <section className="hero">
     <div className="hero-content">
         <h1>Welcome to the HospiPharma  System</h1>
         <p>Streamline your prescriptions and medication management with ease.</p>
         <a href="/dashboard" className="cta-button">Get Started</a>
     </div>
     <div className="hero-image">
       
         <img src={DoctorHand} alt="Pharmacy Collaboration"/>
         
     </div>
 </section>
  )
}

export default HeroSection