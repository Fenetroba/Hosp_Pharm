import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Sider from './Sider';

const Settings = () => {
  const { user } = useSelector((state) => state.Auth);
  const [settings, setSettings] = useState({
    theme: 'light',
    notifications: true,
    language: 'en',
    emailNotifications: true,
    twoFactorAuth: false,
    timezone: 'UTC',
  });

  useEffect(() => {
    // Load saved settings from localStorage
    const savedSettings = localStorage.getItem('adminSettings');
    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings);
      setSettings(parsedSettings);
      applyTheme(parsedSettings.theme);
      applyLanguage(parsedSettings.language);
    }
  }, []);

  const applyTheme = (theme) => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    document.body.className = theme;
  };

  const applyLanguage = (language) => {
    // You can implement language change logic here
    // For now, we'll just update the document language attribute
    document.documentElement.lang = language;
  };

  const handleSettingChange = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem('adminSettings', JSON.stringify(newSettings));
    
    // Apply changes immediately
    if (key === 'theme') {
      applyTheme(value);
    } else if (key === 'language') {
      applyLanguage(value);
    }
    
    toast.success('Settings updated successfully');
  };

  const handleResetSettings = () => {
    const defaultSettings = {
      theme: 'light',
      notifications: true,
      language: 'en',
      emailNotifications: true,
      twoFactorAuth: false,
      timezone: 'UTC',
    };
    setSettings(defaultSettings);
    localStorage.setItem('adminSettings', JSON.stringify(defaultSettings));
    applyTheme('light');
    applyLanguage('en');
    toast.success('Settings reset to default');
  };

  return (
    <div className="">
      <Sider/>
      <h3 className="text-2xl font-bold mb-4 bg-[var(--one)] p-4.5 text-white text-center fixed top-0 left-0 w-full">Settings</h3>

      <div className="p-4 sm:m-20 m-6">
        <div className="flex justify-between items-center my-10">
          <button
            onClick={handleResetSettings}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Reset to Default
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Appearance Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Appearance</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">Theme</span>
                <select
                  value={settings.theme}
                  onChange={(e) => handleSettingChange('theme', e.target.value)}
                  className="border rounded px-3 py-1 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">Language</span>
                <select
                  value={settings.language}
                  onChange={(e) => handleSettingChange('language', e.target.value)}
                  className="border rounded px-3 py-1 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="it">Italian</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">Font Size</span>
                <select
                  value={settings.fontSize || 'medium'}
                  onChange={(e) => handleSettingChange('fontSize', e.target.value)}
                  className="border rounded px-3 py-1 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">Color Scheme</span>
                <select
                  value={settings.colorScheme || 'default'}
                  onChange={(e) => handleSettingChange('colorScheme', e.target.value)}
                  className="border rounded px-3 py-1 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                >
                  <option value="default">Default</option>
                  <option value="blue">Blue</option>
                  <option value="green">Green</option>
                  <option value="purple">Purple</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Notifications</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">Enable Notifications</span>
                <input
                  type="checkbox"
                  checked={settings.notifications}
                  onChange={(e) => handleSettingChange('notifications', e.target.checked)}
                  className="h-5 w-5 text-blue-600 dark:text-blue-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">Email Notifications</span>
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                  className="h-5 w-5 text-blue-600 dark:text-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Security</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">Two-Factor Authentication</span>
                <input
                  type="checkbox"
                  checked={settings.twoFactorAuth}
                  onChange={(e) => handleSettingChange('twoFactorAuth', e.target.checked)}
                  className="h-5 w-5 text-blue-600 dark:text-blue-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">Timezone</span>
                <select
                  value={settings.timezone}
                  onChange={(e) => handleSettingChange('timezone', e.target.value)}
                  className="border rounded px-3 py-1 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                >
                  <option value="UTC">UTC</option>
                  <option value="EST">Eastern Time</option>
                  <option value="PST">Pacific Time</option>
                  <option value="CET">Central European Time</option>
                </select>
              </div>
            </div>
          </div>

          {/* System Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">System</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">Current Version</span>
                <span className="text-gray-500 dark:text-gray-400">1.0.0</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">Last Updated</span>
                <span className="text-gray-500 dark:text-gray-400">2024-03-20</span>
              </div>
              <button
                className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                onClick={() => toast.info('Checking for updates...')}
              >
                Check for Updates
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 