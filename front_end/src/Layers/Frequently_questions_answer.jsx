import { PhoneCall } from 'lucide-react';
const Faqs = [
  {
    question: "What kind of oxygen do you provide ?",
    answer: (
      <>
        We supply <strong>medical-grade oxygen</strong> specifically produced
        for hospitals, clinics, and other healthcare settings. Using the latest{" "}
        <strong>Pressure Swing Adsorption (PSA) technology</strong>, we ensure
        the highest level of purity and safety. Our oxygen is ideal for patient
        care and meets all necessary medical standards.
      </>
    ),
  },
  {
    question: "What other services do you provide ?",
    answer: (
      <>
        <strong>
          At Prime Oxygen, we go beyond just oxygen supply. Our additional
          services include:
        </strong>
        <ul className="list-disc ml-5">
          <li>
            <span className="font-bold">24/7 delivery service</span> to meet the
            urgent and ongoing needs of healthcare providers.
          </li>
          <li>
            <span className="font-bold">Flexible delivery options</span>: we can
            deliver using our own vehicles, or coordinate with clients who
            prefer to arrange their own transportation.
          </li>
          <li>
            <span className="font-bold">Cylinder maintenance</span>: we offer
            cleaning, repair, and servicing of damaged cylinders and valves.
          </li>
          <li>
            <span className="font-bold">On-site training</span>: we provide
            training sessions on the safe and proper handling of medical oxygen,
            ensuring staff are well-prepared to use it correctly and safely.
          </li>
        </ul>
        <br />
        <i className="mt-[10px]">
          We’re always at your doorstep, ready to support your healthcare
          facility.
        </i>
      </>
    ),
  },
  {
    question: "Do you provide financing options ?",
    answer: (
      <>
        Yes, we do. Prime Oxygen offers{" "}
        <strong>
          financing options for hospitals and healthcare facilities.
        </strong>{" "}
        This allows you to receive your oxygen supply immediately and{" "}
        <strong>pay later at your convenience.</strong>
        <br /> <br />
        Our mission is simple:{" "}
        <strong>we’re here to save lives, not just to make money.</strong>
      </>
    ),
  },
  {
    question: <div className="flex">Where is Prime Oxygen located ? </div>,
    answer: (
      <>
        <div>
          We are based in the <strong>Wolaytta Zone, Boditi Town.</strong>
          <br />
          Feel free to contact us directly via phone at:{" "}
          <strong className='flex gap-1.5 mt-2.5 ml-3.5 bg-[#f78420] p-3.5'>  <PhoneCall /> <span>0911 38 61 59</span></strong>
        </div>
      </>
    ),
  },
];
export default Faqs;