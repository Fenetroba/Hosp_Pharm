import React from 'react'
import './Style/footer.css'
const Footer = () => {

         return (
             <footer className="footer">
                 <section className="semicircle"></section>
                 <div className="footer-content">
                     <div className="footer-info">
                         <h4>Contact Us</h4>
                         <p>Phone: (123) 456-7890</p>
                         <p>Email: info@yourhospital.com</p>
                         <p>Address: 123 Hospital Lane, City, State, ZIP</p>
                     </div>
                     <div className="footer-links">
                         <h4>Quick Links</h4>
                         <ul>
                             <li><a href="#about">About Us</a></li>
                             <li><a href="#services">Services</a></li>
                             <li><a href="#contact">Contact</a></li>
                             <li><a href="#testimonials">Testimonials</a></li>
                         </ul>
                     </div>
                     <div className="footer-social">
                         <h4>Follow Us</h4>
                         <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                         <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                         <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                     </div>
                 </div>
                 <div className="footer-bottom">
                     <p>&copy; {new Date().getFullYear()} Your Hospital Name. All rights reserved.</p>
                 </div>
             </footer>
  )
}

export default Footer