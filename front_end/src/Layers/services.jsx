import React, { useEffect, useState } from 'react';
import './Style/service.css';

const Counter = () => {
  const [experience, setExperience] = useState(0);
  const [casesCompleted, setCasesCompleted] = useState(0);
  const [satisfiedCustomers, setSatisfiedCustomers] = useState(0);

  useEffect(() => {
    const experienceTarget = 41;
    const casesTarget = 23000;
    const customersTarget = 85000;

    const experienceInterval = setInterval(() => {
      setExperience((prev) => (prev < experienceTarget ? prev + 1 : experienceTarget));
    }, 50); // Adjust the speed of counting

    const casesInterval = setInterval(() => {
      setCasesCompleted((prev) => (prev < casesTarget ? prev + 100 : casesTarget));
    }, 10); // Adjust the speed of counting

    const customersInterval = setInterval(() => {
      setSatisfiedCustomers((prev) => (prev < customersTarget ? prev + 100 : customersTarget));
    }, 10); // Adjust the speed of counting

    return () => {
      clearInterval(experienceInterval);
      clearInterval(casesInterval);
      clearInterval(customersInterval);
    };
  }, []);

  return (
    <div className="counter-container  bg-[var(--one)] my-10" id="service">
      <div className="counter-item">
        <h4 className="counter-number  text-[var(--six)]">{experience}+</h4>
        <p className="counter-label">Years of Experience</p>
      </div>
      <div className="counter-item">
        <h4 className="counter-number">{casesCompleted.toLocaleString()}</h4>
        <p className="counter-label">Cases Completed</p>
      </div>
      <div className="counter-item">
        <h4 className="counter-number">{satisfiedCustomers.toLocaleString()}</h4>
        <p className="counter-label">Satisfied Customers</p>
      </div>
    </div>
  );
};

export default Counter;