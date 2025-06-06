import React, { useState } from 'react';
import './Style/contactUs.css'; // Import your CSS file
import image4 from "../assets/doctorscolabration.jpg";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here (e.g., send data to an API)
        console.log('Form submitted:', formData);
        // Reset form after submission
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div>
            <h4 className=" text-3xl font-bold text-[var(--one)] text-center ">Contact Us</h4>
    <div className='flex justify-center item-center'>
            
    <div className="md:mx-10 mb-40 mt-10 p-10 " id="contact">
            <div className="contact-info fade-in">
                <h3>Get in Touch</h3>
                <p>If you have any questions or need assistance, feel free to reach out!</p>
                <p><strong>Phone:</strong> (123) 456-7890</p>
                <p><strong>Email:</strong> info@yourhospital.com</p>
            </div>
            <form className="contact-form fade-in" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="submit-button">Send Message</button>
            </form>
      </div>

            <div>
                <img src={image4} className='h-[600px] mt-10' alt="image4"  />
            </div>
    </div>
        </div>
    );
};

export default Contact;