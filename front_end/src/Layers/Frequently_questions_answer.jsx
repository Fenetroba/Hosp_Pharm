import { PhoneCall } from "lucide-react";
const Faqs = [
  {
    question: "What kind of  do you provide ?",
    answer: (
      <>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
        similique quisquam veritatis consequuntur, laborum non sunt soluta a.
        Recusandae autem ex distinctio et, dicta error aut officia praesentium
        tenetur maiores?
      </>
    ),
  },
  {
    question: "What other services do you provide ?",
    answer: (
      <>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
        similique quisquam veritatis consequuntur, laborum non sunt soluta a.
        Recusandae autem ex distinctio et, dicta error aut officia praesentium
        tenetur maiores?
          <li>
            <span className="font-bold">On-site training</span>: we provide
            training sessions on the safe and proper handling of medical oxygen,
            ensuring staff are well-prepared to use it correctly and safely.
          </li>
     
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
        Yes, we do. our offers{" "}
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
        similique quisquam veritatis consequuntur, laborum non sunt soluta a.
        Recusandae autem ex distinctio et, dicta error aut officia praesentium
        tenetur maiores?
      </>
    ),
  },
  {
    question: <div className="flex">Where is your located ? </div>,
    answer: (
      <>
        <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
          <br />
          Feel free to contact us directly via phone at:{" "}
          <strong className="flex gap-1.5 mt-2.5 ml-3.5 bg-[#f78420] p-3.5">
            {" "}
            <PhoneCall /> <span>0911 11111</span>
          </strong>
        </div>
      </>
    ),
  },
];
export default Faqs;
