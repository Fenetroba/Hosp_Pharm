import React from 'react';
import './Style/testimonials.css'; // Import your CSS file

const testimonialsData = [
    {
        id: 1,
        name: "John Doe",
        message: "The pharmacy team was incredibly helpful and made my medication management so much easier!",
        role: "Patient",
    },
    {
        id: 2,
        name: "Jane Smith",
        message: "Great service! The pharmacists provided excellent advice and support throughout my treatment.",
        role: "Patient",
    },
    {
        id: 3,
        name: "Michael Johnson",
        message: "I appreciate the personalized care I received. The team genuinely cares about their patients!",
        role: "Patient",
    },
];

const Testimonials = () => {
    return (
        <div className="testimonials" id="Testimony">
            <h2 className="fade-in">What Our Patients Say</h2>
            <div className="testimonials-list fade-in">
                {testimonialsData.map((testimonial) => (
                    <div key={testimonial.id} className="testimonial-item">
                        <p className="message">"{testimonial.message}"</p>
                        <p className="name">- {testimonial.name}, <span className="role">{testimonial.role}</span></p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Testimonials;