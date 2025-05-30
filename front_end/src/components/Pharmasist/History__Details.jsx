import { Search } from "lucide-react";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Display_History from "./Display_History";

const History__Details = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="absolute top-20 left-16 right-5 bg-[var(--sixP)]">
      <div className="flex justify-center items-center m-2.5">
        <input 
          type="text" 
          placeholder="Search by patient name, doctor name, or patient number" 
          className="w-full max-w-md px-4 py-2 rounded-l-2xl focus:outline-none"
          value={searchQuery}
          onChange={handleSearch}
        />
        <Search className="text-white bg-black w-15 h-11 rounded-r-2xl p-2" />
      </div>
      
      <Display_History searchQuery={searchQuery}/>
    </div>
  );
};

export default History__Details;
