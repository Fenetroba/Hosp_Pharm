import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Search } from 'lucide-react';
import Sider from './Sider';

const Users = () => {
  const { UsersList } = useSelector((state) => state.user);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filters, setFilters] = useState({
    role: 'all',
    status: 'all',
    search: ''
  });
  const [userStats, setUserStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    doctors: 0,
    pharma: 0
  });

  // Update filtered users and stats when UsersList changes
  useEffect(() => {
    if (UsersList && UsersList.length > 0) {
      // Filter out admin users
      const nonAdminUsers = UsersList.filter(user => user.role !== 'Admin');
      setFilteredUsers(nonAdminUsers);
      updateUserStats(nonAdminUsers);
    }
  }, [UsersList]);

  // Apply filters when they change
  useEffect(() => {
    if (UsersList && UsersList.length > 0) {
      let filtered = UsersList.filter(user => user.role !== 'Admin');

      // Apply role filter
      if (filters.role !== 'all') {
        filtered = filtered.filter(user => user.role === filters.role);
      }

      // Apply status filter
      if (filters.status !== 'all') {
        filtered = filtered.filter(user => user.status === filters.status);
      }

      // Apply search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filtered = filtered.filter(user => 
          user.name.toLowerCase().includes(searchTerm) ||
          user.email.toLowerCase().includes(searchTerm) ||
          user.role.toLowerCase().includes(searchTerm)
        );
      }

      setFilteredUsers(filtered);
      updateUserStats(filtered);
    }
  }, [filters, UsersList]);

  const updateUserStats = (userList) => {
    const stats = {
      totalUsers: userList.length,
      activeUsers: userList.filter(u => u.status === 'active').length,
      doctors: userList.filter(u => u.role === 'doctor').length,
      pharma: userList.filter(u => u.role === 'Pharma').length
    };
    setUserStats(stats);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    handleFilterChange('search', value);
  };

  return (
    <div className="">
      <Sider />
      <h3 className="text-2xl font-bold mb-4 bg-[var(--one)] p-4.5 text-white text-center fixed top-0 left-0 w-full">Users</h3>

      <div className="p-4 sm:m-20 m-6 mt-20">
        {/* User Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="text-gray-500">Total Users</h4>
            <p className="text-2xl font-bold">{userStats.totalUsers}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="text-gray-500">Active Users</h4>
            <p className="text-2xl font-bold">{userStats.activeUsers}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="text-gray-500">Doctors</h4>
            <p className="text-2xl font-bold">{userStats.doctors}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="text-gray-500">Pharmacists</h4>
            <p className="text-2xl font-bold">{userStats.pharma}</p>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-grow">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 " />
              <input
                type="text"
                placeholder="Search users..."
                className="w-full pl-10 pr-4 py-2 border-0  focus:outline-none "
                value={filters.search}
                onChange={handleSearch}
              />
            </div>
            <div className="flex gap-4">
              <select
                className="border rounded-lg px-4 py-2 "
                value={filters.role}
                onChange={(e) => handleFilterChange('role', e.target.value)}
              >
                <option value="all">All Roles</option>
                <option value="doctor">Doctors</option>
                <option value="Pharma">Pharmacists</option>
              </select>
              <select
                className="border rounded-lg px-4 py-2 "
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.lastLogin || 'Never'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users; 