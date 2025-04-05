// AdminHeader.js
import React from 'react';
import './style/header.css'; // Optional: Import CSS for styling
import { RiAdminLine } from 'react-icons/ri'

const AdminHeader = ({ onLogout, onSearch }) => {
  const handleSearch = (event) => {
    event.preventDefault();
    const query = event.target.elements.search.value;
    onSearch(query);
  };

  return (
    <header className="admin-header fixed w-full">
      <div className="logo">
        <h1 className='mt-10 flex gap-4 items-center text-[min(10vh,25px)]'><span>Admin Dashboard</span> <RiAdminLine/></h1> {/* Replace with your logo */}
      </div>
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          name="search"
          placeholder="Search..."
          required
          className='shadow-sm shadow-white border-gray-300 rounded-lg p-2 '
        />
        <button type="submit">Search</button>
      </form>
      <button className="logout-button" onClick={onLogout}>
        Logout
      </button>
    </header>
  );
};

export default AdminHeader;