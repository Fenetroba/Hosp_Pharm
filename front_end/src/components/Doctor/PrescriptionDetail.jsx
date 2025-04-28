import React from "react";
import Sider from "./Sider";
import CRUD_prescription from "./CRUD_prescription";
import Search_user from "./Search_user";
import History from "./History";

const PrescriptionDetail = () => {
  return (
    <section className="relative">
      <Sider />
      <div className="grid grid-cols-5 grid-rows-5 gap-4 relative ml-20 mt-10 mr-2">
        {/* Search Container */}
        <div className="col-span-2 row-span-3  bg-[var(--one)] h-[500px] overflow-auto">
          <Search_user />
        </div>

        {/* Empty Container for Future Use */}
        <div className="col-span-2 row-span-3 col-start-4 row-start-1 bg-[var(--one)] h-[500px] overflow-auto text-black">
          {/* You can add content here if needed */}
        </div>

     
        <div className="col-span-5 row-span-12 col-start-1 row-start-4 bg-[var(--one)] p-7 h-[500px] overflow-auto">
          <History />
        </div>

        {/* Notifications Section */}
        <div className="row-span-3 col-start-3 row-start-1 bg-[var(--one)] h-[500px] overflow-auto">
          <h1 className="text-[var(--six)] text-center mt-1.5 shadow-sm pb-1 shadow-blue-200">
            <span>Notifications</span> 
            <span className="bg-red-500 px-1 rounded-full">0</span>
          </h1>
        </div>
      </div>

      <h1 className="ml-20 p-5 text-[min(10vw,30px)] font-bold shadow shadow-sky-900">
        Create Prescription
      </h1>
      
      {/* Create Prescription Component */}
      <CRUD_prescription />
    </section>
  );
};

export default PrescriptionDetail;