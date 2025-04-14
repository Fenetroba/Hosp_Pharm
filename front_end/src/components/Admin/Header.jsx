import React, { useEffect, useState, useCallback } from 'react';
import { RiAdminLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { SearchUser } from '../../store/UserData__slice';
import { logoutUser } from '../../store/useSlice';
import './style/header.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

// Improved debounce function
const debounce = (func, delay) => {
  let timer;
  return function (...args) {
    const context = this;
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(context, args), delay);
  };
};

const AdminHeader = () => {
  const {name,email,role} = useSelector((state) => state.Auth.user);
  const {isAuthenticated,userDetail} = useSelector((state) => state.Auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const { searchResults, searchLoading, searchError } = useSelector((state) => state.user);
  const [showResults, setShowResults] = useState(false);

  // Debounced search function with error handling
  const debouncedSearch = useCallback(
    debounce((value) => {
      if (value.trim()) {
        dispatch(SearchUser(value.trim()))
          .unwrap()
          .catch(error => {
            toast.error(error.message || 'Search failed');
          });
      }
    }, 300),
    [dispatch]
  );

  useEffect(() => {
    if (searchValue.trim()) {
      debouncedSearch(searchValue);
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [searchValue, debouncedSearch]);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const onLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      toast.error(error.message || 'Logout failed');
    }
  };

  return (
    <header className="admin-header fixed top-0 w-full p-4 bg-white shadow-md z-50 flex items-center justify-between">
      <ToastContainer />
      <div className="flex items-center gap-4">
        <RiAdminLine className="text-2xl text-[var(--adminO)]" />
        <h1 className="text-xl font-bold text-gray-800 z-50">
          Admin Dashboard
         
            <span className="text-2xl ml-20 text-amber-600 ">
              [{name}]
            
            </span>
      
        </h1>
      </div>

      <div className="relative w-72">
        <input
          type="text"
          value={searchValue}
          onChange={handleSearch}
          placeholder="Search by name..."
          className="w-full px-4 border rounded-lg text-black"
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