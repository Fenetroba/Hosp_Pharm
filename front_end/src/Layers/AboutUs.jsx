import React from "react";
import "./Style/aboutUs.css";
import sample from "../assets/some.jpg";
import { motion } from "framer-motion";
import { 
  Pill, 
  Stethoscope, 
  Heart, 
  Users, 
  Shield, 
  Clock 
} from "lucide-react";

const services = [
  {
    icon: <Pill className="w-8 h-8" />,
    title: "Comprehensive Medication Reviews",
    description: "Thorough assessment of all medications to ensure optimal therapy and prevent adverse interactions."
  },
  {
    icon: <Stethoscope className="w-8 h-8" />,
    title: "Pharmacotherapy Consultations",
    description: "Expert guidance on medication management and treatment optimization."
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Patient Education",
    description: "Comprehensive support and education to help patients understand their medications."
  },
 
];

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-20 px-4 sm:px-6 lg:px-8" id="about">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h4 className="text-4xl font-bold  text-[var(--one)] mb-4">About Us</h4>
          <div className="w-24 h-1 bg-blue-900 mx-auto mb-8"></div>
          <p className="text-xl  text-[var(--0ne)] max-w-2xl mx-auto">
            Welcome to <span className="text-blue-600 ">HospiPharma</span>'s 
            Pharmacy Collaboration Program! We are dedicated to enhancing patient care through 
            effective collaboration between pharmacists and healthcare providers.

          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-20 my-36"
        >
          <h3 className="text-2xl   text-[var(--one)] mb-4">Our Mission</h3>
          <p className="text-gray-900 leading-relaxed">
            Our mission is to optimize medication management, ensuring safety and improving 
            therapeutic outcomes for every patient. We believe in a collaborative approach 
            to healthcare that puts patients first.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[var(--one)] rounded-xl shadow-lg p-6 hover:scale-105  duration-300"
            >
              <div className="text-blue-600 mb-4">{service.icon}</div>
              <h3 className="text-xl font text-[var(--six)] mb-2">{service.title}</h3>
              <p className=" text-[var(--six)]">{service.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Image Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 rounded-2xl overflow-hidden shadow-xl"
        >
          <img 
            src={sample} 
            alt="Healthcare Collaboration" 
            className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-500"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
