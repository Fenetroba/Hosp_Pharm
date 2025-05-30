  import React, { useEffect, useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import UsersDetail_data from "./UsersDetail_data";
  import { FetchAllUsers } from "@/store/UserData__slice";
  import SkeletonLoader from "../ui/skeletonLoader"; // Create or import a loading component

  const Admin_main = () => {
    const { UsersList, isLoading, error } = useSelector((state) => state.user);
    const [selectedUser, setSelectedUser] = useState(null);
    const dispatch = useDispatch();

    // Define valid roles and their display properties
    const roleConfig = {
      Admin: {
        color: "bg-gray-800 text-white",
        displayName: "Admin"
      },
      doctor: {
        color: "bg-blue-500 text-white",
        displayName: "Doctor"
      },
      Pharma: {
        color: "bg-green-500 text-white",
        displayName: "Pharma"
      }
    };

    const getRoleDisplay = (role) => {
      return roleConfig[role] || {
        color: "bg-gray-200 text-gray-800",
        displayName: role
      };
    };

    useEffect(() => {
      dispatch(FetchAllUsers());
    }, [dispatch]);

    const handleUserSelect = (user) => {
      setSelectedUser(user);
    };

    if (error) {
      return (
        <div className="p-8 text-red-500 text-center">
          Error loading users: {error}
        </div>
      );
    }

    return (
      <div className="mt-5 px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto pt-20 sm:ml-20 ml-2.5 mb-20 overflow-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">User Management</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* User List */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Users</h2>
            {isLoading ? (
              <SkeletonLoader count={5} />
            ) : UsersList.length === 0 ? (
              <p className="text-gray-500 text-center">No users found</p>
            ) : (
              <ul className="space-y-2">
                {UsersList.map((user, index) => (
                  <li
                    key={user._id}
                    className={`p-4 rounded-lg cursor-pointer transition-all ${
                      selectedUser?._id === user._id
                        ? "bg-blue-50 border-l-4 border-[var(--adnimO)]"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => handleUserSelect(user)}
                    role="button"
                    tabIndex={0}
                    onKeyPress={(e) => e.key === "Enter" && handleUserSelect(user)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">
                          <span className="text-gray-500 mr-2">{index + 1}.</span>
                          {user.name}
                        </p>
                        <p className="text-sm text-gray-500 truncate">{user.email}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          getRoleDisplay(user.role).color
                        }`}
                      >
                        {getRoleDisplay(user.role).displayName}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* User Details */}
          <div className="lg:col-span-3">
            {selectedUser ? (
            <UsersDetail_data 
              selectedUser={selectedUser}
              onCreateUser={(newUser) => {
                // After creating user, refresh the user list
                dispatch(FetchAllUsers());
              }}
              onUpdateUser={(updatedUser) => {
                // After updating user, refresh the user list
                dispatch(FetchAllUsers());
                setSelectedUser(null); // Clear selection after update
              }}
              onDeleteUser={(userId) => {
                // After deleting user, refresh the user list
                dispatch(FetchAllUsers());
                setSelectedUser(null); // Clear selection after delete
              }}
            />
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6 h-full flex items-center justify-center">
                <p className="text-gray-500 text-lg">
                  Select a user to view details
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  export default Admin_main;