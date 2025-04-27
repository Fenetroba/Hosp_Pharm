import React, { useState } from "react";
import Sider from "./Sider";

;
import CRUD_prescription from "./CRUD_prescription";
import Search_user from "./Search_user";
import History from "./History";

const PrescriptionDetail = () => {
 

  return (
    <section className="releteve">
      <Sider />
      <div className="grid grid-cols-5 grid-rows-5 gap-4 reletive ml-20 mt-10 mr-2">
        <div className="col-span-2 row-span-3 bg-[var(--one)]">
          {/* search contner  */}
          <Search_user/>
        </div>
        <div className="col-span-2 row-span-3 col-start-4 row-start-1 bg-[var(--one)] text-black">
       
        </div>
        <div className="col-span-5 row-span-2 col-start-1 row-start-4 bg-[var(--one)] p-7">
          {/* history contener */}
       <History/>
        </div>
        <div className="row-span-3 col-start-3 row-start-1 bg-[var(--one)]">4</div>
      </div>

      <h1 className="ml-20 p-5 text-[min(10vw,30px)] font-bold  shadow shadow-sky-900">Create Prescription</h1>
     <CRUD_prescription/>
    </section>
  );
};

export default PrescriptionDetail;
