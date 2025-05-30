import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FetchAll__prescription } from "@/store/prescription";
import { Bell } from "lucide-react";
import { toast } from "sonner";

const NotificationPharma = () => {
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const prescriptions = useSelector((state) => state.prescriptions.prescriptions);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      await dispatch(FetchAll__prescription());
    };
    fetchPrescriptions();
  }, [dispatch]);

  useEffect(() => {
    if (prescriptions) {
      // Filter pending prescriptions and count unread notifications
      const pendingPrescriptions = prescriptions.filter(
        (prescription) => prescription.status === "pending"
      );
      setNotifications(pendingPrescriptions);
      setUnreadCount(pendingPrescriptions.length);
    }
  }, [prescriptions]);

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    if (unreadCount > 0) {
      setUnreadCount(0);
      toast.success("Notifications marked as read");
    }
  };

  return (
    <div className="text-[var(--sixP)] m-2 relative">
      <div className="flex items-center justify-between">
        <h1 className="text-center flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Notifications
          {unreadCount > 0 && (
            <span className="bg-red-800 text-white rounded-full px-[3px] cursor-pointer hover:bg-amber-500">
              {unreadCount}
            </span>
          )}
        </h1>
        <button
          onClick={handleNotificationClick}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          {showNotifications ? "Hide" : "Show"}
        </button>
      </div>

      {showNotifications && (
        <div className="mt-4 bg-white rounded-lg shadow-lg p-4 max-h-[300px] overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification._id}
                className="border-b border-gray-200 py-2 last:border-b-0"
              >
                <p className="font-semibold text-gray-800">
                  New prescription from Dr. {notification.doctorName}
                </p>
                <p className="text-sm text-gray-600">
                  Patient: {notification.patientName}
                </p>
                <p className="text-xs text-gray-500">
                  Date: {new Date(notification.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No new notifications</p>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationPharma;
