import React, { useState } from "react";
import Sider from "./Sider";

import Search_user from "./Search_user";
import History from "./History";
import Create_priscription from "./Prescription Action/Create_priscription";
import Creating_prescription from "./Creating_prescription";

const PrescriptionDetail = () => {
  const [ofCreate,setCreate]=useState(false)
  console.log(ofCreate)
  return (
    <section className="relative">
      <Sider />
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative ml-12 md:ml-20 mt-10 mr-2">
        {/* Search Container */}
        <div className="col-span-1 md:col-span-2 row-span-3 bg-[var(--one)] h-[400px] md:h-[500px] overflow-auto">
          <Search_user />
        </div>

        {/* Empty Container for Future Use */}
        <div className="col-span-1 md:col-span-2 row-span-3 md:col-start-4 bg-[var(--one)] h-[400px] md:h-[500px] overflow-auto text-black">
          <div >
         {ofCreate?<Creating_prescription />:
         <div className="text-white"> Hi</div>

         }

          </div>
        </div>

        {/* History Container */}
        <div className="col-span-1 md:col-span-5 row-span-2 col-start-1 row-start-4 bg-[var(--one)] sm:p-7 h-[300px] md:h-[500px] overflow-auto">
          <History />
        </div>

        {/* Notifications Section */}
        <div className="col-span-1 md:col-start-3 row-span-3 md:row-start-1 bg-[var(--one)] h-[300px] md:h-[500px] overflow-auto">
          <h1 className="text-[var(--six)] text-center mt-1.5 shadow-sm pb-1 shadow-blue-200">
            <span>Edit Prescription</span>
          </h1>
          <div className="flex justify-center items-center my-3.5" onClick={()=>{setCreate(!ofCreate)}}>
            <Create_priscription />
          </div>
        </div>
      </div>

      <h1 className="ml-20 font-bold shadow shadow-sky-900">
        Developed by @Fena
      </h1>
    </section>
  );
};

export default PrescriptionDetail;
