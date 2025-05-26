import React from "react";
import "./style/hospiPharmColla.css"; // Import your CSS file
import image1 from "../assets/image1 (1).jpg";  
import image2 from "../assets/image1 (1).webp";
import image3 from "../assets/image1 (2).jpg";
import image4 from "../assets/image1 (3).jpg";
import image5 from "../assets/drugs.jpg";
import { motion } from "framer-motion";

const HospiPharmColla = () => {
  return (
    <div className="collaboret p-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Main Featured Image */}
        <motion.div 
          initial={{ opacity: 0, x: "-100%" }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 2 }}
          className="md:col-span-8 md:row-span-2 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 relative group"
        >
          <img 
            src={image1} 
            alt="Featured Hospital" 
            className="w-full h-[500px] object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex flex-col justify-end p-6">
            <div className="transform translate-y-full  p-6 hover:bg-[#c3def765]  group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="text-black  text-2xl font-bold mb-2">Modern Healthcare Facility</h3>
              <p className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                State-of-the-art hospital with advanced medical equipment and expert staff
              </p>
            </div>
          </div>
        </motion.div>

        {/* Secondary Image */}
        <motion.div 
          initial={{ opacity: 0, y: "-100%" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 0.1 }}
          className="md:col-span-4 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 relative group"
        >
          <img 
            src={image2} 
            alt="Pharmacy Services" 
            className="w-full h-[240px] object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex flex-col justify-end p-6">
            <div className="transform translate-y-full p-6 hover:bg-[#c3def765] group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="text-black text-2xl font-bold mb-2">Pharmacy Department</h3>
              <p className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                24/7 pharmacy services with comprehensive medication management
              </p>
            </div>
          </div>
        </motion.div>

        {/* Third Image */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:col-span-6 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 relative group"
        >
          <img 
            src={image3} 
            alt="Medical Care" 
            className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex flex-col justify-end p-6">
            <div className="transform p-6 hover:bg-[#c3def765] translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="text-black text-2xl font-bold mb-2">Patient Care</h3>
              <p className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Dedicated healthcare professionals providing personalized care
              </p>
            </div>
          </div>
        </motion.div>

        {/* Fourth Image */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="md:col-span-3 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 relative group"
        >
          <img 
            src={image4} 
            alt="Healthcare" 
            className="w-full h-[240px] object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex flex-col justify-end p-6">
            <div className="transform translate-y-full p-2 hover:bg-[#c3def765] pt-6 group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="text-black text-2xl font-bold mb-2">Medical Technology</h3>
              <p className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Cutting-edge medical technology for accurate diagnosis and treatment
              </p>
            </div>
          </div>
        </motion.div>

        {/* Fifth Image */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="md:col-span-3 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 relative group"
        >
          <img 
            src={image5} 
            alt="Medical Services" 
            className="w-full h-[240px] object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex flex-col justify-end p-6">
            <div className="transform translate-y-full pt-6 hover:bg-[#c3def765] group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="text-black text-2xl font-bold mb-2">Emergency Services</h3>
              <p className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Round-the-clock emergency care with rapid response teams
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HospiPharmColla;
