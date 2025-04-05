import React from "react";

const Admin_main = () => {
  return (
    <div className=" mt-5 px-4 sm:px-6 lg:px-8" style={{ maxWidth: "1300px", padding: "80px ",  paddingLeft: "100px" }}>
      <h1 className="text-3xl font-bold">Admin Main Content</h1>
      <p className="mt-4">Name: email:</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        <div className="col-span-1 row-span-5 bg-amber-100 h-[80vh]">1</div>
        <div className="col-span-1 md:col-span-4 row-span-4 bg-amber-100">2</div>
        <div className="col-span-1 md:col-span-4 md:col-start-2 row-start-5 bg-amber-100">3</div>
      </div>
    </div>
  );
};

export default Admin_main;