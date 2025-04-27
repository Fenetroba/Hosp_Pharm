import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { User, ChevronDown } from "lucide-react";
import { motion,AnimatePresence } from "framer-motion";
import { FetchAll__prescription } from "@/store/prescription";

const Doctor_main = () => {



  const { user } = useSelector((state) => state.Auth);
  const [showProfile, setShowProfile] = useState(false);
  return (
    <div style={{ margin: "100px 50px 50px 100px" }}>
      <button
        className="bg-blue-950 text-white px-4 py-2 rounded-md flex items-center gap-2 cursor-pointer"
        onClick={() => setShowProfile(!showProfile)}
      >
        <span>Profile</span>
        <ChevronDown className={`${showProfile ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
      {showProfile && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.9}}
          className="bg-[var(--five)] h-[100px] w-full flex flex-col items-center justify-center rounded-lg shadow-md mt-2 "
        >
          <div className="header-profile bg-amber-100 px-6.5 py-1 rounded-2xl">
            <p>
              {" "}
              <span className="text-2xl text-blue-950 font-bold ">Dr </span>
              {user.username || user.name}
            </p>
          </div>
          <div className="mt-2">{user.useremail || user.email}</div>
        </motion.div>
      )}
      </AnimatePresence>

      <div className="grid sm:grid-cols-5 grid-rows-5 gap-4">
        <div className="row-span-5 bg-[var(--one)]">1</div>
        <div className="col-span-4 row-span-4 bg-[var(--one)]">4</div>
        <div className="col-span-4 col-start-2 row-start-5  bg-[var(--one)]">
          5
        </div>
      </div>
    </div>
  );
};

export default Doctor_main;
