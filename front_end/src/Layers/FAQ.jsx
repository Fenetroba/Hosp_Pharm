
import { useState, useEffect } from "react";
import { motion, AnimatePresence, spring } from "framer-motion";
import faqs from "./Frequently_questions_answer";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // ----------------------------------Animation for the FAQ section---------------------------
  const sectionVariants = {
    hidden: {
      opacity: 0,
      x: "100vw",
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 3.5,
        type: spring,
        damping: 60,
      },
    },
  };

  // ----------------------------Check if the section is in the viewport-------------------------

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("faq-section");
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom >= 0) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.section
      id="faq-section"
      className="text-white p-8 overflow-hidden mb-[50px]  sm:w-[70%] mx-auto"
      variants={sectionVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
    >
      <h4 className="text-3xl font-bold mt-11 mb-15 text-[var(--one)] text-center">
        Frequently Asked Questions (FAQ)
      </h4>
      <div className=" sm:shadow-2xl  sm:p-10.5 text-black">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-600 mb-4">
            <button
              onClick={() => toggleFAQ(index)}
              className="flex justify-between items-center w-full p-4 text-left focus:outline-none"
            >
              <span className="text-[min(10vw,19px)]">{faq.question}</span>
              <span
                className={`transform transition-transform cursor-pointer text-2xl px-[7px] hover:bg-[#f78420] rounded-full`}
              >
                {openIndex === index ? "-" : "+"}
              </span>
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  className="p-4 bg-[#fff] rounded-lg text-[15px] text-black"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                  }}
                >
                  <motion.div>{faq.answer}</motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
