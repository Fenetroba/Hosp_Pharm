import React from "react";
import { useSelector } from "react-redux";
import FrontSide from "./FrontSide";
import NotificationPharma from "./NotificationPharma";
import { Mail, User2Icon } from "lucide-react";

const Pharma_main = () => {
  const { user } = useSelector((state) => state.Auth);
  return (
    <div style={{ margin: "90px 20px 50px 60px" }}>
      <div className="header-profile bg-[var(--fiveP)] p-4 mb-1 text-center ">
        <p className="flex space-x-1">
          <span className="text-2xl text-blue-950 font-bold ">
            <User2Icon />{" "}
          </span>
          <span> {user?.username || user?.name}</span>
        </p>
        <div className="mt-2 flex  space-x-1">
          <Mail /> <span>{user?.useremail || user?.email}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-5 grid-rows-5 gap-2">
        <div className="row-span-5 bg-[var(--oneP)]">
          <NotificationPharma />
        </div>
        <div className="col-span-1 sm:col-span-4 row-span-4 bg-[var(--oneP)]">
          <FrontSide />
        </div>
        <div className="col-span-1 sm:col-span-4 col-start-1 sm:col-start-2 max:sm-row-start-2   bg-[var(--oneP)]">
          5
        </div>
      </div>
    </div>
  );
};

export default Pharma_main;
