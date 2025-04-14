import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Registration } from '@/store/useSlice';
import { DeleteUser, UpdateUser } from '@/store/UserData__slice';
import { toast } from 'react-toastify';

const UsersDetail_data = ({ selectedUser, onCreateUser, onUpdateUser, onDeleteUser }) => {
  const [activeForm, setActiveForm] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Pharma' // Set default role
  });

  const dispatch = useDispatch();

  // Add role validation
  const validRoles = ['Pharma', 'doctor', 'Admin'];
  
  const validateRole = (role) => {
    return validRoles.includes(role);
  };

  // Reset form when selected user changes
  useEffect(() => {
    if (selectedUser) {
      setFormData({
        name: selectedUser.name,
        email: selectedUser.email,
        role: selectedUser.role,
        password: '' // Clear password when updating
      });
    } else {
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'Pharma'
      });
    }
  }, [selectedUser]);

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    
    // Special handling for role to ensure it's valid
    if (name === 'role') {
      if (!validateRole(value)) {
        toast.error('Invalid role selected');
        return;
      }
    }
    
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(Registration(formData)).unwrap();
      if (result.user) {
        toast.success('User created successfully');
        onCreateUser(result.user);
        setActiveForm(null);
        setFormData({ name: '', email: '', password: '', role: 'Pharma' });
      }
    } catch (error) {
      toast.error(error.message || 'Failed to create user');
    }
  };

  const handleUpdate = async () => {
    try {
      const result = await dispatch(UpdateUser({ 
        userId: selectedUser._id, 
        userData: formData 
      })).unwrap();
      
      if (result.user) {
        toast.success('User updated successfully');
        onUpdateUser(result.user);
        setActiveForm(null);
      }
    } catch (error) {
      toast.error(error.message || 'Failed to update user');
    }
  };

  const handleDelete = async () => {
    try {
      await dispatch(DeleteUser(selectedUser._id)).unwrap();
      toast.success('User deleted successfully');
      onDeleteUser(selectedUser._id);
      setActiveForm(null);
    } catch (error) {
      toast.error(error.message || 'Failed to delete user');
    }
  };

  const showForm = (formType) => {
    setActiveForm(activeForm === formType ? null : formType);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex space-x-4 border-b-2 pb-4 mb-4">
        <button 
          className={`py-1 px-6 rounded-2xl transition-colors ${activeForm === 'create' ? 'bg-green-200' : 'bg-green-100 hover:bg-green-200'}`}
          onClick={() => showForm('create')}
        >
          Create
        </button>
        
        <button 
          className={`py-1 px-6 rounded-2xl transition-colors ${activeForm === 'update' ? 'bg-yellow-200' : selectedUser ? 'bg-yellow-100 hover:bg-yellow-200' : 'bg-gray-200 cursor-not-allowed'}`}
          onClick={() => showForm('update')}
          disabled={!selectedUser}
        >
          Update
        </button>
        
        <button 
          className={`py-1 px-6 rounded-2xl transition-colors ${activeForm === 'delete' ? 'bg-red-200' : selectedUser ? 'bg-red-100 hover:bg-red-200' : 'bg-gray-200 cursor-not-allowed'}`}
          onClick={() => showForm('delete')}
          disabled={!selectedUser}
        >
          Delete
        </button>
      </div>

      {/* Create Form */}
      {activeForm === 'create' && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Create New User</h3>
          <div className="space-y-3">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full p-2 border rounded"
              value={formData.name}
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-2 border rounded"
              value={formData.email}
              onChange={handleInputChange}
            />
            <input
              type="password" // Password field for creation
              name="password"
              placeholder="Password"
              className="w-full p-2 border rounded"
              value={formData.password}
              onChange={handleInputChange}
            />
            <select
              name="role"
              className="w-full p-2 border rounded"
              value={formData.role}
              onChange={handleInputChange}
            >
              {validRoles.map((role) => (
                <option key={role} value={role}>
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </option>
              ))}
            </select>
            <div className="flex space-x-3">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                onClick={handleCreate}
              >
                Create
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                onClick={() => setActiveForm(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Form */}
      {activeForm === 'update' && selectedUser && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Update User</h3>
          <div className="space-y-3">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full p-2 border rounded"
              value={formData.name}
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-2 border rounded"
              value={formData.email}
              onChange={handleInputChange}
            />
            <input
              type="password" // Password field for updating
              name="password"
              placeholder="New Password (leave blank to keep current)"
              className="w-full p-2 border rounded"
              value={formData.password}
              onChange={handleInputChange}
            />
            <select
              name="role"
              className="w-full p-2 border rounded"
              value={formData.role}
              onChange={handleInputChange}
            >
              {validRoles.map((role) => (
                <option key={role} value={role}>
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </option>
              ))}
            </select>
            <div className="flex space-x-3">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={handleUpdate}
              >
                Update
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                onClick={() => setActiveForm(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {activeForm === 'delete' && (
        <div className="p-4 bg-red-50 rounded-lg">
          <p className="mb-4">Are you sure you want to delete this user?</p>
          <div className="flex space-x-3">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={handleDelete}
            >
              Confirm Delete
            </button>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              onClick={() => setActiveForm(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersDetail_data;