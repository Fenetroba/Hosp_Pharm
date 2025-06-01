import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Download, Filter, Search, Calendar } from 'lucide-react';
import Sider from './Sider';
import axios from 'axios';

const Reports = () => {
  const { user } = useSelector((state) => state.Auth);
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    type: 'all',
    dateRange: 'all',
    status: 'all',
    search: '',
    startDate: '',
    endDate: ''
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const generateReport = async (type) => {
    setLoading(true);
    setError(null);
    try {
      const { startDate, endDate } = filters;
      const params = {};
      if (startDate && endDate) {
        params.startDate = startDate;
        params.endDate = endDate;
      }

      const response = await axios.get(`/api/reports/${type}`, {
        params,
        withCredentials: true
      });

      if (response.data.success) {
        const newReport = {
          id: Date.now(),
          title: `${type.charAt(0).toUpperCase() + type.slice(1)} Report`,
          type,
          date: new Date().toISOString().split('T')[0],
          status: 'completed',
          generatedBy: user.name,
          data: response.data.report
        };

        setReports(prev => [newReport, ...prev]);
        setFilteredReports(prev => [newReport, ...prev]);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Error generating report');
      console.error('Error generating report:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = (report) => {
    try {
      const reportData = {
        title: report.title,
        type: report.type,
        date: report.date,
        generatedBy: report.generatedBy,
        data: report.data
      };

      const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${report.type}_report_${report.date}.json`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error exporting report:', error);
      setError('Error exporting report');
    }
  };

  useEffect(() => {
    let filtered = [...reports];

    if (filters.type !== 'all') {
      filtered = filtered.filter(report => report.type === filters.type);
    }

    if (filters.status !== 'all') {
      filtered = filtered.filter(report => report.status === filters.status);
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(report => 
        report.title.toLowerCase().includes(searchTerm) ||
        report.generatedBy.toLowerCase().includes(searchTerm)
      );
    }

    setFilteredReports(filtered);
  }, [filters, reports]);

  return (
    <div className="">
      <Sider />
      <h3 className="text-2xl font-bold mb-4 bg-[var(--one)] p-4.5 text-white text-center fixed top-0 left-0 w-full">Reports</h3>

      <div className="p-4 sm:m-20 m-6 mt-20">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

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
              </select>
              <Filter className="absolute right-3 top-3 text-gray-400" size={16} />
            </div>

            <div className="relative">
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) => handleFilterChange('startDate', e.target.value)}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
                placeholder="Start Date"
              />
              <Calendar className="absolute right-3 top-3 text-gray-400" size={16} />
            </div>

            <div className="relative">
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) => handleFilterChange('endDate', e.target.value)}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
                placeholder="End Date"
              />
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
                {report.data && (
                  <div className="mt-2">
                    <p className="font-medium">Summary:</p>
                    <ul className="list-disc list-inside">
                      {report.type === 'inventory' && (
                        <li>Total Medications: {report.data.totalMedications}</li>
                      )}
                      {report.type === 'sales' && (
                        <>
                          <li>Total Sales: {report.data?.totalSales || 0} Birr</li>
                          <li>Total Transactions: {report.data?.totalTransactions || 0}</li>
                          {report.data?.drugSales && report.data.drugSales.length > 0 && (
                            <div className="mt-4">
                              <h4 className="font-medium mb-2">Drug Sales Summary:</h4>
                              <div className="max-h-40 overflow-y-auto">
                                {report.data.drugSales.map((drug, index) => (
                                  <div key={index} className="text-sm mb-1">
                                    {drug.DrugName}: {drug.count} units - {drug.totalAmount} Birr
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          {report.data?.pharmacistSales && report.data.pharmacistSales.length > 0 && (
                            <div className="mt-4">
                              <h4 className="font-medium mb-2">Pharmacist Performance:</h4>
                              <div className="max-h-40 overflow-y-auto">
                                {report.data.pharmacistSales.map((pharma, index) => (
                                  <div key={index} className="text-sm mb-2 border-b pb-1">
                                    <div className="font-medium">{pharma.name}</div>
                                    <div>Total Sales: {pharma.totalAmount} Birr</div>
                                    <div>Transactions: {pharma.transactions}</div>
                                    <div className="text-xs mt-1">
                                      Drugs Sold: {pharma.drugsSold?.map(drug => drug.DrugName).join(', ') || 'None'}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </>
                      )}
                      {report.type === 'patient' && (
                        <>
                          <li>Total Patients: {report.data.totalPatients}</li>
                          <li>Total Prescriptions: {report.data.totalPrescriptions}</li>
                        </>
                      )}
                    </ul>
                  </div>
                )}
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
              onClick={() => generateReport('inventory')}
              disabled={loading}
              className="p-4 border rounded hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-600 disabled:opacity-50"
            >
              <h4 className="font-medium text-gray-900 dark:text-white">Inventory Report</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">Current stock levels and alerts</p>
            </button>
            <button
              onClick={() => generateReport('sales')}
              disabled={loading}
              className="p-4 border rounded hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-600 disabled:opacity-50"
            >
              <h4 className="font-medium text-gray-900 dark:text-white">Sales Report</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">Daily and monthly sales analysis</p>
            </button>
            <button
              onClick={() => generateReport('patient')}
              disabled={loading}
              className="p-4 border rounded hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-600 disabled:opacity-50"
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