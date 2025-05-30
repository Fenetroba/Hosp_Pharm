import React from "react";

const NotificationPharma = () => {
  return (
    <div className="text-[var(--sixP)] m-2">
      <div>
        <h1 className="text-center">
          Notification{" "}
          <span className="bg-red-800 text-white rounded-full px-[3px] cursor-pointer hover:bg-amber-500">0</span>
        </h1>
      </div>
    </div>
  );
};

export default NotificationPharma;
