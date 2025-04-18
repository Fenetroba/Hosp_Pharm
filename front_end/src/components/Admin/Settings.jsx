import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { User } from 'lucide-react';
import { toast } from 'react-toastify';
import Sider from './Sider';
import Header from '../Layers/Header';

const Settings = () => {
  const { user } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  const [settings, setSettings] = useState({
    // Admin Profile Settings
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [isDirty, setIsDirty] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Load admin data on component mount
  useEffect(() => {
    if (user) {
      setSettings(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || ''
      }));
    }
  }, [user]);

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setIsDirty(true);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      // Add your profile update logic here
      toast.success('Profile updated successfully');
      setIsDirty(false);
    } catch (error) {
      toast.error(error.message || 'Failed to update profile');
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (settings.newPassword !== settings.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    try {
      // Add your password update logic here
      toast.success('Password updated successfully');
      setSettings(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    } catch (error) {
      toast.error(error.message || 'Failed to update password');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="Settings" 
        onMenuClick={setIsMobileMenuOpen}
      />

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:block fixed md:static inset-0 z-40`}>
          <Sider />
        </div>

        {/* Content Area */}
        <main className="flex-1 pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-2 mb-6">
                <User className="text-gray-500" size={20} />
                <h4 className="text-lg font-semibold">Admin Profile</h4>
              </div>
              
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">Name</label>
                  <input
                    type="text"
                    value={settings.name}
                    onChange={(e) => handleSettingChange('name', e.target.value)}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">Email</label>
                  <input
                    type="email"
                    value={settings.email}
                    onChange={(e) => handleSettingChange('email', e.target.value)}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-950 text-white px-4 py-2 rounded hover:bg-blue-950 cursor-pointer"
                  disabled={!isDirty}
                >
                  Update Profile
                </button>
              </form>

              <div className="mt-8 pt-6 border-t">
                <h4 className="text-lg font-semibold mb-4">Change Password</h4>
                <form onSubmit={handlePasswordUpdate} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-600">Current Password</label>
                    <input
                      type="password"
                      value={settings.currentPassword}
                      onChange={(e) => handleSettingChange('currentPassword', e.target.value)}
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm text-gray-600">New Password</label>
                    <input
                      type="password"
                      value={settings.newPassword}
                      onChange={(e) => handleSettingChange('newPassword', e.target.value)}
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm text-gray-600">Confirm New Password</label>
                    <input
                      type="password"
                      value={settings.confirmPassword}
                      onChange={(e) => handleSettingChange('confirmPassword', e.target.value)}
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-950 text-white px-4 py-2 rounded hover:bg-blue-950 cursor-pointer"
                  >
                    Update Password
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings; 