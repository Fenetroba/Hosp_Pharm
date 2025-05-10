import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { User, ChevronDown, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FetchAll__prescription } from "@/store/prescription";
import { logoutUser } from "@/store/useSlice";
import { useNavigate } from "react-router-dom";
import doc from '../../assets/doc.jpg'
const Doctor_main = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const Logout = () => {
        dispatch(logoutUser()).then(navigate("/"));
    };

    const { user } = useSelector((state) => state.Auth);
    const [showProfile, setShowProfile] = useState(false);

    return (
        <div style={{ margin: "80px 20px 50px 70px" }}>
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
                    transition={{ duration: 0.9 }}
                    className="bg-[var(--five)] h-[100px] w-full flex flex-col items-center justify-center rounded-lg shadow-md mt-2 sm:w-auto lg:right-24 xl:right-32"
                >
                    <div className="header-profile bg-amber-100 px-6.5 py-1 rounded-2xl">
                        <p className="text-center sm:text-left"> {/* Center text on small screens */}
                            <span className="text-2xl text-blue-950 font-bold ">Dr </span>
                            {user.username || user.name}
                        </p>
                    </div>
                    <div className="mt-2 text-center sm:text-left">{user.useremail || user.email}</div> {/* Center text on small screens */}
                
                    <div className="absolute right-4"> {/* Adjust position and alignment */}
                        <button
                            onClick={Logout}
                            className="px-4 py-1 rounded-2xl bg-amber-300 flex items-center space-x-2.5 cursor-pointer text-sm sm:text-base" // Smaller text on mobile
                        >
                            <span>Logout</span> <LogOut />
                        </button>
                    </div>
                </motion.div>
                )}
            </AnimatePresence>

            <div className="grid grid-cols-1 sm:grid-cols-5 grid-rows-5 gap-4"> {/* Responsive Grid */}
                <div className="row-span-5 bg-[var(--one)] ">1</div>
                <div className="col-span-1 sm:col-span-4 row-span-4 bg-[var(--one)]">
                  <img src={doc} alt="doc" className="w-[50%] p-2.5 " />
                </div>
                <div className="col-span-1 sm:col-span-4 col-start-1 sm:col-start-2 row-start-5  bg-[var(--one)]">
                    5
                </div>
            </div>
        </div>
    );
};

export default Doctor_main;