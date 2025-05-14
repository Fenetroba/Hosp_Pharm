import { HandCoins } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

const RelatedFinance = () => {
  return (
    <div className="text-[var(--sixP)]">
      <h1 className="flex space-x-1 m-5 text-2xl">
        <span>Releted with Finance </span>
        <span>
          <HandCoins className=" bg-amber-50 w-9 h-9 p-1 rounded-full text-black" />
        </span>
      </h1>
<div className="m-5 ">
DRUG<input type="text" className="mb-2 border-0 outline-0 "placeholder="Drug Name"/>
   PRICE  <input type="number"className="mb-2 border-0 outline-0"  />
   <button  className="bg-[var(--fiveP)] p-2 text-black w-1/1 hover:bg-[var(--sixP)] cursor-pointer">SUBMIT</button>
</div>
      
    </div>
  );
};

export default RelatedFinance;
