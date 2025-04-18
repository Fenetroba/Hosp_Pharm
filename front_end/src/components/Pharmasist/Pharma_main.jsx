import React from "react";
import { useSelector } from "react-redux";

const Pharma_main = () => {
  const {user}=useSelector(state=>state.Auth)
  return (
    <div style={{ margin: "100px 50px 50px 100px" }}>
      <div className="header-profile bg-[var(--fiveP)] px-6.5 py-1 text-center ">
        <p>
          {" "}
          <span className="text-2xl text-blue-950 font-bold ">phsitian </span>
          {user.username || user.name}
        </p>
      <div className="mt-2">{user.useremail || user.email}</div>
      </div>

      <div className="grid grid-cols-5 grid-rows-5 gap-4">
        <div className="row-span-5 bg-[var(--oneP)]">1</div>
        <div className="col-span-4 row-span-4 bg-[var(--oneP)]">4</div>
        <div className="col-span-4 col-start-2 row-start-5  bg-[var(--oneP)]">
          5
        </div>
      </div>
    </div>
  );
};

export default Pharma_main;
