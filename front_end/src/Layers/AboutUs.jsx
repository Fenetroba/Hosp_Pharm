import React from "react";
import "./Style/aboutUs.css"; // Import your CSS file
import sample from "../assets/drug.jpg";
const AboutUs = () => {
  return (
    <div className="about-us">
      <h2 className="fade-in">About Us</h2>
      <p className="fade-in">
        Welcome to <strong>HospiPharma</strong>'s Pharmacy Collaboration
        Program!
      </p>
      <p className="fade-in">
        We are dedicated to enhancing patient care through effective
        collaboration between pharmacists and healthcare providers. Our mission
        is to optimize medication management, ensuring safety and improving
        therapeutic outcomes for every patient.
      </p>
      <div className="ourService">
        <h3 className="fade-in">Our Services Include:</h3>
        <div className="services-list fade-in">
          <div className="service-item">
            <img
              src={sample}
              alt="Comprehensive medication reviews"
              className="service-image"
            />
            <p>Comprehensive medication reviews</p>
          </div>
          <div className="service-item">
            <img
              src={sample}
              alt="Pharmacotherapy consultations"
              className="service-image"
            />
            <p>Pharmacotherapy consultations</p>
          </div>
          <div className="service-item">
            <img
              src={sample}
              alt="Patient education and support"
              className="service-image"
            />
            <p>Patient education and support</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AboutUs;
