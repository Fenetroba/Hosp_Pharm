import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Calendar, DollarSign, Package, TrendingUp } from "lucide-react";
import { format } from "date-fns";
import { fetchDailyFinance } from "@/store/finance";
import Loading from "@/components/ui/loading/Loading";

const Daily_report = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const dispatch = useDispatch();
  const { loading, dailyStats, Finance: transactions, error } = useSelector((state) => state.FIN);

  useEffect(() => {
    const formattedDate = format(selectedDate, 'yyyy-MM-dd');
    dispatch(fetchDailyFinance(formattedDate));
  }, [selectedDate, dispatch]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-ET', {
      style: 'currency',
      currency: 'ETB'
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="m-5 text-[var(--sixP)]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Daily Reports</h1>
        <div className="flex items-center space-x-2 mt-10">
          <Calendar className="w-5 h-5" />
          <input
            type="date"
            value={format(selectedDate, 'yyyy-MM-dd')}
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
            className="border rounded p-1"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-[var(--fiveP)] rounded-lg p-4 hover:bg-[var(--sixP)] transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Sales</p>
              <p className="text-2xl font-bold">{formatCurrency(dailyStats.totalSales)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-[var(--fiveP)] rounded-lg p-4 hover:bg-[var(--sixP)] transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Transactions</p>
              <p className="text-2xl font-bold">{dailyStats.totalTransactions}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-[var(--fiveP)] rounded-lg p-4 hover:bg-[var(--sixP)] transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Drugs Sold</p>
              <p className="text-2xl font-bold">{dailyStats.drugsSold}</p>
            </div>
            <Package className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-[var(--fiveP)] rounded-lg p-4 hover:bg-[var(--sixP)] transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Net Profit</p>
              <p className="text-2xl font-bold">{formatCurrency(dailyStats.profit)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-500" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 shadow-sm h-[200px] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-black ">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Time</th>
                <th className="text-left py-2">Drug Name</th>
                <th className="text-left py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions && transactions.map((transaction) => (
                <tr key={transaction._id} className="border-b">
                  <td className="py-2">{format(new Date(transaction.date), 'HH:mm')}</td>
                  <td>{transaction.DrugName}</td>
                  <td>{formatCurrency(transaction.Birr)}</td>
                </tr>
              ))}
              {(!transactions || transactions.length === 0) && (
                <tr>
                  <td colSpan="3" className="text-center py-4 text-gray-500">
                    No transactions found for this date
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Daily_report;
