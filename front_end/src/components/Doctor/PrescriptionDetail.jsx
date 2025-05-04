import React, { useEffect, useState } from "react";
import Sider from "./Sider";
import pres from "../../assets/prescription.jpg";
import Search_user from "./Search_user";
import History from "./History";
import Create_priscription from "./Prescription Action/Create_priscription";
import Creating_prescription from "./Creating_prescription";
import { useSelector } from "react-redux";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const PrescriptionDetail = ({ user }) => {
  const prescriptions = useSelector(
    (state) => state.prescriptions.prescriptions
  );
  const [femaleCount, setFemaleCount] = useState(0);
  const [maleCount, setmaleCount] = useState(0);
  const [Pending, setPending] = useState(0);
  const [completed, setcommpleted] = useState(0);
  const [rejected, setrejected] = useState(0);

  useEffect(() => {
    setFemaleCount(
      prescriptions.filter((prescription) => prescription.sex === "Female")
        .length
    );
    setmaleCount(
      prescriptions.filter((prescription) => prescription.sex === "male").length
    );
    setPending(
      prescriptions.filter((prescription) => prescription.status === "pending")
        .length
    );
    setcommpleted(
      prescriptions.filter((prescription) => prescription.status === "completed")
        .length
    );
    setrejected(
      prescriptions.filter((prescription) => prescription.status === "rejected")
        .length
    );
  }, [prescriptions]);

  const [ofCreate, setCreate] = useState(false);

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
          <div>
            {ofCreate ? (
              <Creating_prescription user={user} />
            ) : (
              <div className="text-white p-3">
                <img src={pres} alt="pres" />
                <h1>We are HospiPharma</h1>
              </div>
            )}
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
          <div
            className="flex justify-center items-center my-3.5"
            onClick={() => {
              setCreate(!ofCreate);
            }}
          >
            <Create_priscription />
          </div>

          <DropdownMenu className="text-white">
            <DropdownMenuTrigger className=" bg-[var(--six)] text-blue-900 outline-0 p-1.5 ml-3.5 mt-5 flex space-x-2">
              <span> Data Users</span>
              <ChevronDown />{" "}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel  className="flex justify-between"><span> Female :</span> <span>{femaleCount}</span></DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex justify-between"><span>male :</span><span> {maleCount}</span></DropdownMenuItem>
              <DropdownMenuSeparator />

              <DropdownMenuItem className="flex justify-between"><span>Pending :</span> <span>{Pending}</span></DropdownMenuItem>
              <DropdownMenuSeparator />

              <DropdownMenuItem className="flex justify-between"><span>completed :</span> <span>{completed}</span></DropdownMenuItem>
              <DropdownMenuSeparator />

              <DropdownMenuItem className="flex justify-between"><span>rejected : </span><span>{rejected}</span></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <h1 className="ml-20 font-bold shadow shadow-sky-900">
        Developed by @Fena
      </h1>
    </section>
  );
};

export default PrescriptionDetail;
