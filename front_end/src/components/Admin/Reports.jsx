import React from 'react';
import Sider from './Sider';

const Reports = () => {
  return (
    <div>
      <Sider/>
      <h3 className="text-2xl font-bold mb-4 bg-[var(--one)] p-4.5 text-white text-center fixed top-0 left-0 w-full">Reports</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:m-20 m-12 mt-20">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2">User Activity</h3>
          <p className="text-gray-600">View user login history and activity</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2">System Logs</h3>
          <p className="text-gray-600">View system events and errors</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2">Audit Trail</h3>
          <p className="text-gray-600">Track changes and modifications</p>
        </div>
      </div>
    </div>
  );
};

export default Reports; 