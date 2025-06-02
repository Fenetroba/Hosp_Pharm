import { HandCoins } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { create__finance } from "@/store/finance";
import Loading from "@/components/ui/loading/Loading";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const RelatedFinance = () => {
  const { loading, error } = useSelector((state) => state.FIN);
  const dispatch = useDispatch();
  const [Finance_record, setfinance_record] = useState({
    DrugName: "",
    Birr: "",
  });

  const FinanceHandler = async () => {
    if (!Finance_record.DrugName || !Finance_record.Birr) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      const result = await dispatch(create__finance(Finance_record)).unwrap();
      
      if (result) {
        toast.success("Finance Record Added successfully!");
        setfinance_record({
          DrugName: '',
          Birr: ''
        });
      }
    } catch (err) {
      toast.error(err.message || "Failed to add finance record");
    }
  };

  return (
    <div className="text-[var(--sixP)]">
      <h1 className="flex space-x-1 m-5 text-2xl">
        <span>Releted with Finance </span>
        <span>
          <HandCoins className=" bg-amber-50 w-9 h-9 p-1 rounded-full text-black" />
        </span>
      </h1>
      <div className="m-5 ">
        DRUG
        <input
          type="text"
          className="mb-2 border-0 outline-0 "
          placeholder="Drug Name"
          value={Finance_record.DrugName}
          onChange={(e) => setfinance_record({...Finance_record, DrugName: e.target.value})}
        />
        PRICE 
        <input 
          type="number" 
          className="mb-2 border-0 outline-0" 
          value={Finance_record.Birr}
          onChange={(e) => setfinance_record({...Finance_record, Birr: e.target.value})}   
        />
        <button 
          className="bg-[var(--fiveP)] p-2 h-11 flex items-center justify-center text-black w-1/1 hover:bg-[var(--sixP)] cursor-pointer" 
          onClick={FinanceHandler}
          disabled={loading}
        >
          {loading ? <Loading/> : "SUBMIT"}
        </button>
      </div>
    </div>
  );
};

export default RelatedFinance;
