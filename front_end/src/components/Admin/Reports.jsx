import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Download, Filter, Search, Calendar } from 'lucide-react';
import Sider from './Sider';

const Reports = () => {
  const { user } = useSelector((state) => state.Auth);
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [filters, setFilters] = useState({
    type: 'all',
    dateRange: 'all',
    status: 'all',
    search: ''
  });

  // Sample report data - replace with actual API calls
  useEffect(() => {
    const sampleReports = [
      {
        id: 1,
        title: 'Daily Inventory Report',
        type: 'inventory',
        date: '2024-03-20',
        status: 'completed',
        generatedBy: 'Admin',
        downloadUrl: '#'
      },
      {
        id: 2,
        title: 'Monthly Sales Analysis',
        type: 'sales',
        date: '2024-03-19',
        status: 'pending',
        generatedBy: 'Pharma',
        downloadUrl: '#'
      },
      {
        id: 3,
        title: 'Patient Medication History',
        type: 'patient',
        date: '2024-03-18',
        status: 'completed',
        generatedBy: 'doctor',
        downloadUrl: '#'
      }
    ];
    setReports(sampleReports);
    setFilteredReports(sampleReports);
  }, []);

  useEffect(() => {
    let filtered = [...reports];

    // Apply type filter
    if (filters.type !== 'all') {
      filtered = filtered.filter(report => report.type === filters.type);
    }

    // Apply status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter(report => report.status === filters.status);
    }

    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(report => 
        report.title.toLowerCase().includes(searchTerm) ||
        report.generatedBy.toLowerCase().includes(searchTerm)
      );
    }

    setFilteredReports(filtered);
  }, [filters, reports]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleExport = (report) => {
    // Implement export functionality
    console.log('Exporting report:', report);
  };

  const handleGenerateReport = (type) => {
    // Implement report generation
    console.log('Generating report:', type);
  };

  return (
    <div className="">
      <Sider />
      <h3 className="text-2xl font-bold mb-4 bg-[var(--one)] p-4.5 text-white text-center fixed top-0 left-0 w-full">Reports</h3>

      <div className="p-4 sm:m-20 m-6 mt-20">
        {/* Filters and Search */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
              >
                <option value="all">All Types</option>
                <option value="inventory">Inventory</option>
                <option value="sales">Sales</option>
                <option value="patient">Patient</option>
                <option value="pharmacy">Pharmacy</option>
              </select>
              <Filter className="absolute right-3 top-3 text-gray-400" size={16} />
            </div>

            <div className="relative">
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
              <Calendar className="absolute right-3 top-3 text-gray-400" size={16} />
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Search reports..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
              <Search className="absolute right-3 top-3 text-gray-400" size={16} />
            </div>

            <button
              onClick={() => handleGenerateReport('custom')}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Generate New Report
            </button>
          </div>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map((report) => (
            <div key={report.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{report.title}</h3>
                <span className={`px-2 py-1 rounded text-xs ${
                  report.status === 'completed' ? 'bg-green-100 text-green-800' :
                  report.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {report.status}
                </span>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <p>Type: <span className="font-medium">{report.type}</span></p>
                <p>Date: <span className="font-medium">{report.date}</span></p>
                <p>Generated By: <span className="font-medium">{report.generatedBy}</span></p>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => handleExport(report)}
                  className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  <Download size={16} />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Report Generation */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Quick Reports</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => handleGenerateReport('inventory')}
              className="p-4 border rounded hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-600"
            >
              <h4 className="font-medium text-gray-900 dark:text-white">Inventory Report</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">Current stock levels and alerts</p>
            </button>
            <button
              onClick={() => handleGenerateReport('sales')}
              className="p-4 border rounded hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-600"
            >
              <h4 className="font-medium text-gray-900 dark:text-white">Sales Report</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">Daily and monthly sales analysis</p>
            </button>
            <button
              onClick={() => handleGenerateReport('patient')}
              className="p-4 border rounded hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-600"
            >
              <h4 className="font-medium text-gray-900 dark:text-white">Patient Report</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">Medication history and compliance</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports; 