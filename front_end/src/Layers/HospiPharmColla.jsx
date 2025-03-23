import React, { useEffect, useState } from "react";
import "./style/hospiPharmColla.css"; // Import your CSS file
import doctorscolabration from "../assets/doctorscolabration.jpg";
import drugs from "../assets/drug.jpg"; // Import your second image

const HospiPharmColla = () => {
  const [isHidden, setIsHidden] = useState(true);
  const [imagePosition1, setImagePosition1] = useState(0);
  const [imagePosition2, setImagePosition2] = useState(0);
  let lastScrollTop = 0;

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Handle navigation visibility
    if (scrollTop < lastScrollTop) {
      setIsHidden(true); // Scrolling up
    } else {
      setIsHidden(false); // Scrolling down
    }

    // Calculate image positions based on scroll
    setImagePosition1(scrollTop / 5); // First image movement
    setImagePosition2(-scrollTop / 5); // Second image movement in the opposite direction
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For mobile or negative scrolling
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
     <div className="topService">
     <h1 className="serviceTitle">Our Services</h1>
      <p>
        enhance the quality of care provided in hospitals and ensure that
        patients receive effective and safe medication therapies.
      </p>
     </div>
      <div className="Hospcol">
        <div
          className="Hospcol-image"
          style={{ transform: `translateX(${imagePosition1}px)` }}
        >
          <img src={doctorscolabration} alt="Doctors Collaboration" />
        </div>
        <div
          className="Hospcol-image"
          style={{ transform: `translateX(${imagePosition2}px)` }}
        >
          <img src={drugs} alt="Another Image" />
        </div>
      </div>
    </div>
  );
};

export default HospiPharmColla;
