import React, { useEffect, useState, useCallback } from 'react';
import { RiAdminLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { SerchUser } from '../../store/UserData__slice'; // Adjust import path as needed
import { logoutUser } from '../../store/useSlice'; // Adjust import path as needed
import './style/header.css';

// Debounce function to limit frequent API calls
const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
};

const AdminHeader = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const { searchResults, searchLoading, searchError } = useSelector((state) => state.user);
  const [showResults, setShowResults] = useState(false);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((value) => {
      if (value.trim()) {
        dispatch(SerchUser(value.trim()));
      }
    }, 300),
    [dispatch]
  );

  useEffect(() => {
    debouncedSearch(searchValue);
    setShowResults(!!searchValue.trim());
  }, [searchValue, debouncedSearch]);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const onLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <header className="admin-header fixed top-0 w-full p-4 bg-white shadow-md z-50 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <RiAdminLine className="text-2xl text-[var(--adminO)]" />
        <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
      </div>

      <div className="relative w-72">
        <input
          type="text"
          value={searchValue}
          onChange={handleSearch}
          placeholder="Search by name..."
          className="w-full px-4 border rounded-lg  text-black"
          aria-label="Search users"
          onFocus={() => setShowResults(true)}
          onBlur={() => setTimeout(() => setShowResults(false), 200)}
        />

        {showResults && (
          <div className="absolute w-full mt-2 bg-white border rounded-lg shadow-lg max-h-80 overflow-y-auto">
            {searchLoading ? (
              <div className="p-4 text-gray-500">Loading...</div>
            ) : searchError ? (
              <div className="p-4 text-red-500">{searchError}</div>
            ) : searchResults.length > 0 ? (
              searchResults.map((user, index) => (
                <div
                  key={user._id}
                  className="p-3 hover:bg-gray-100 transition-colors cursor-pointer border-b last:border-b-0"
                >
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-500">{index + 1}.</span>
                    <div>
                      <p className="font-medium text-gray-800">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.role}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-gray-500">No users found</div>
            )}
          </div>
        )}
      </div>

      <button
        onClick={onLogout}
        className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Logout
      </button>
    </header>
  );
};

export default AdminHeader;