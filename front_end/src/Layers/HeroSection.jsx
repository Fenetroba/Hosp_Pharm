import React from 'react'
import './Style/heroSection.css'
import DoctorHand from '../assets/DoctorHand.jpg'
import { motion } from 'framer-motion'
const HeroSection = () => {
  return (
     <section className="hero" id="home">
     <div className="hero-content">
         <h1 className='font-bold text-4xl text-center shadow-lg rounded-2xl'>Welcome to the HospiPharma  System</h1>
      
      </div> 
     <motion.div className="hero-image "
       initial={{ opacity: 0,  }}
       animate={{ opacity: 1, }}
       transition={{ duration: 1}}>
       
         <img src={DoctorHand} alt="Pharmacy Collaboration" className='h-5'/>
         
     </motion.div>
 </section>
  )
}

export default HeroSection