import React from 'react'
import './Style/heroSection.css'
import DoctorHand from '../assets/DoctorHand.jpg'
import { motion } from 'framer-motion'
const HeroSection = () => {
  return (
     <section className="hero" id="home">
     <div className="hero-content">
         <h1 className='font-bold text-4xl'>Welcome to the HospiPharma  System</h1>
         {/* <p className='text-2xl'>Streamline your prescriptions and medication management with ease.</p> */}
     </div>
     <motion.div className="hero-image"
       initial={{ opacity: 0, x: "100%" }}
       animate={{ opacity: 1, x: 0 }}
       transition={{ duration: 1}}>
       
         <img src={DoctorHand} alt="Pharmacy Collaboration"/>
         
     </motion.div>
 </section>
  )
}

export default HeroSection