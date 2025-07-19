import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Bell } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

const NotificationPharma = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const prescriptions = useSelector((state) => state.prescriptions.prescriptions);

  useEffect(() => {
    if (Array.isArray(prescriptions)) {
      // Get notifications from prescriptions
      const newNotifications = prescriptions.map(prescription => ({
        id: prescription._id,
        type: 'prescription',
        message: `New prescription for ${prescription.patientName}`,
        status: prescription.status,
        timestamp: new Date(prescription.createdAt),
        read: false
      }));

      // Sort notifications by timestamp (newest first)
      newNotifications.sort((a, b) => b.timestamp - a.timestamp);
      
      // Filter out notifications that have been viewed before
      const viewedNotifications = JSON.parse(localStorage.getItem('viewedNotifications') || '[]');
      const filteredNotifications = newNotifications.filter(
        notification => !viewedNotifications.includes(notification.id)
      );
      
      setNotifications(filteredNotifications);
      setUnreadCount(filteredNotifications.length);
    }
  }, [prescriptions]);

  const handleNotificationClick = (notification) => {
    // Add notification ID to viewed notifications in localStorage
    const viewedNotifications = JSON.parse(localStorage.getItem('viewedNotifications') || '[]');
    viewedNotifications.push(notification.id);
    localStorage.setItem('viewedNotifications', JSON.stringify(viewedNotifications));

    // Remove the clicked notification from the list
    setNotifications(prevNotifications => 
      prevNotifications.filter(n => n.id !== notification.id)
    );
    setUnreadCount(prev => Math.max(0, prev - 1));

    // Show a toast notification
    toast.success("Notification marked as read", {
      description: notification.message,
    
    });
  };

  return (
    <div className="text-[var(--sixP)] m-2  ">
      <Toaster />
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-center flex items-center gap-2 font-bold ml-2">
          Notifications
          {unreadCount > 0 && (
            <span className="bg-red-800 text-white rounded-full px-2 py-1 text-sm">
              {unreadCount}
            </span>
          )}
        </h1>
        <Bell className="w-5 h-5" />
      </div>

      <div className="space-y-2 overflow-y-auto">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() => handleNotificationClick(notification)}
              className="p-3 rounded-lg cursor-pointer transition-colors bg-green-500 "
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{notification.message}</p>
                  <p className="text-sm text-gray-600">
                    Status: {notification.status}
                  </p>
                  <p className="text-xs text-gray-500">
                    {notification.timestamp.toLocaleString()}
                  </p>
                </div>
                <span className="w-2 h-2 bg-blue-500 rounded-full" />
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No new notifications</p>
        )}
      </div>
    </div>
  );
};

export default NotificationPharma;
