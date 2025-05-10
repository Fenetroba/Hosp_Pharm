import { Search } from "lucide-react";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Display_History from "./Display_History";

const History__Details = () => {
  return (
    <div className="absolute top-20 left-16 right-5 bg-[var(--sixP)] ">
      <div className="flex gap-2.5 justify-center items-center">
        <input type="text" placeholder="Search" />
        <Search />
      </div>
      <div className="flex mt-5 space-x-2.5">
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Date" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Month</SelectItem>
          <SelectItem value="dark">Week</SelectItem>
          <SelectItem value="system">To day</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
      </div>
      <Display_History/>
    </div>
  );
};

export default History__Details;
