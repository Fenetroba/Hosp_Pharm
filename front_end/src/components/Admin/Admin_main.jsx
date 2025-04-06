import React from "react";

const Admin_main = () => {
  return (
    <div className=" mt-5 px-4 sm:px-6 lg:px-8" style={{ maxWidth: "1300px", padding: "80px ",  paddingLeft: "100px" }}>
      <h1 className="text-3xl font-bold">Admin Main Content</h1>
      <p className="mt-4">Name: email:</p>

      <div className="grid grid-cols-5 grid-rows-5 gap-4">
    <div className="row-span-5 bg-[var(--adnimO)]">1</div>
    <div className="col-span-4 row-span-4 bg-[var(--adnimO)]">4</div>
    <div className="col-span-4 col-start-2 row-start-5  bg-[var(--adnimO)]">5</div>
</div>
    </div>
  );
};

export default Admin_main;