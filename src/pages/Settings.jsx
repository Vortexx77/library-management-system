import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import Modal from '../components/common/Modal';

const Settings = () => {
  const { isDark } = useTheme();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('library');
  const [settings, setSettings] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSetting, setSelectedSetting] = useState(null);
  const [unsavedChanges, setUnsavedChanges] = useState({});

  // Mock data based on system_settings table
  useEffect(() => {
    setSettings({
      library: {
        library_name: { value: 'School Library', description: 'Name of the library' },
        academic_year_start: { value: '2025-02-01', description: 'Academic year start date' },
        academic_year_end: { value: '2025-12-15', description: 'Academic year end date' },
        library_hours: { value: '08:00-17:00', description: 'Library operating hours' },
        contact_email: { value: 'library@school.edu', description: 'Library contact email' },
        contact_phone: { value: '+256712345678', description: 'Library contact phone' }
      },
      circulation: {
        default_loan_period_days: { value: '14', description: 'Default loan period in days' },
        max_renewals: { value: '2', description: 'Maximum number of renewals allowed' },
        student_max_books: { value: '3', description: 'Maximum books a student can borrow' },
        teacher_max_books: { value: '10', description: 'Maximum books a teacher can borrow' },
        overdue_grace_period: { value: '3', description: 'Grace period before marking overdue (days)' },
        fine_per_day: { value: '5000', description: 'Fine amount per day for overdue books (UGX)' },
        max_fine_amount: { value: '500000', description: 'Maximum fine amount per book (UGX)' }
      },
      notifications: {
        email_notifications: { value: 'true', description: 'Enable email notifications' },
        sms_notifications: { value: 'false', description: 'Enable SMS notifications' },
        overdue_reminder_days: { value: '1,3,7', description: 'Days to send overdue reminders (comma-separated)' },
        reservation_expiry_hours: { value: '24', description: 'Hours before reservation expires' },
        due_date_reminder_days: { value: '2', description: 'Days before due date to send reminder' }
      },
      system: {
        backup_frequency: { value: 'daily', description: 'Automatic backup frequency' },
        session_timeout: { value: '60', description: 'User session timeout in minutes' },
        max_login_attempts: { value: '5', description: 'Maximum login attempts before lockout' },
        password_min_length: { value: '8', description: 'Minimum password length' },
        enable_barcode_scanner: { value: 'true', description: 'Enable barcode scanner support' }
      }
    });
  }, []);

  const handleSettingChange = (category, key, value) => {
    setUnsavedChanges({
      ...unsavedChanges,
      [`${category}.${key}`]: value
    });
  };

  const saveSettings = () => {
    console.log('Saving settings:', unsavedChanges);
    // API call to save settings
    setUnsavedChanges({});
  };

  const resetSettings = () => {
    setUnsavedChanges({});
  };

  const SettingItem = ({ category, settingKey, setting, type = 'text' }) => {
    const currentValue = unsavedChanges[`${category}.${settingKey}`] ?? setting.value;
    const hasChanges = unsavedChanges[`${category}.${settingKey}`] !== undefined;

    return (
      <div className={`p-4 rounded-lg border ${hasChanges
        ? (isDark ? 'border-yellow-600 bg-yellow-900/10' : 'border-yellow-300 bg-yellow-50')
        : (isDark ? 'border-gray-700' : 'border-gray-200')
        }`}>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <label className={`block text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {settingKey.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              {hasChanges && <span className="ml-2 text-yellow-600">*</span>}
            </label>
            <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {setting.description}
            </p>
          </div>
          <div className="ml-4 w-48">
            {type === 'select' ? (
              <select
                value={currentValue}
                onChange={(e) => handleSettingChange(category, settingKey, e.target.value)}
                className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-green-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
              >
                {settingKey === 'backup_frequency' && (
                  <>
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </>
                )}
                {(settingKey === 'email_notifications' || settingKey === 'sms_notifications' || settingKey === 'enable_barcode_scanner') && (
                  <>
                    <option value="true">Enabled</option>
                    <option value="false">Disabled</option>
                  </>
                )}
              </select>
            ) : type === 'textarea' ? (
              <textarea
                value={currentValue}
                onChange={(e) => handleSettingChange(category, settingKey, e.target.value)}
                rows={2}
                className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-green-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
              />
            ) : (
              <input
                type={type}
                value={currentValue}
                onChange={(e) => handleSettingChange(category, settingKey, e.target.value)}
                className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-green-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
              />
            )}
          </div>
        </div>
      </div>
    );
  };

  const hasUnsavedChanges = Object.keys(unsavedChanges).length > 0;

  return (
    <div>
      <div className="mb-6">
        <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Settings</h1>
        <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Configure system settings and preferences</p>
      </div>

      {/* Save/Reset Bar */}
      {hasUnsavedChanges && (
        <div className={`rounded-lg border p-4 mb-6 ${isDark ? 'bg-yellow-900/20 border-yellow-600' : 'bg-yellow-50 border-yellow-300'
          }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-yellow-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <span className={`text-sm font-medium ${isDark ? 'text-yellow-400' : 'text-yellow-800'}`}>
                You have unsaved changes
              </span>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={resetSettings}
                className={`px-4 py-2 text-sm border rounded-lg hover:bg-gray-50 ${isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700'
                  }`}
              >
                Reset
              </button>
              <button
                onClick={saveSettings}
                className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className={`border-b mb-6 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <nav className="-mb-px flex space-x-8">
          {[
            { key: 'library', label: 'Library Info', icon: '🏛️' },
            { key: 'circulation', label: 'Circulation', icon: '📚' },
            { key: 'notifications', label: 'Notifications', icon: '🔔' },
            { key: 'system', label: 'System', icon: '⚙️' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${activeTab === tab.key
                ? `border-green-500 ${isDark ? 'text-green-400' : 'text-green-600'}`
                : `border-transparent ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`
                }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Settings Content */}
      <div className={`rounded-lg shadow-sm border p-6 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
        <div className="space-y-4">
          {settings[activeTab] && Object.entries(settings[activeTab]).map(([key, setting]) => (
            <SettingItem
              key={key}
              category={activeTab}
              settingKey={key}
              setting={setting}
              type={
                key.includes('date') ? 'date' :
                  key.includes('email') ? 'email' :
                    key.includes('phone') ? 'tel' :
                      key.includes('amount') || key.includes('fine') ? 'number' :
                        key === 'backup_frequency' || key.includes('notifications') || key === 'enable_barcode_scanner' ? 'select' :
                          key === 'library_hours' || key === 'overdue_reminder_days' ? 'text' :
                            'text'
              }
            />
          ))}
        </div>
      </div>

      {/* Additional Actions */}
      <div className={`rounded-lg shadow-sm border p-6 mt-6 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
        <h3 className={`text-lg font-medium mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          System Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center p-4 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 dark:border-blue-600 dark:text-blue-400 dark:hover:bg-blue-900/20">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Backup Database
          </button>
          <button className="flex items-center justify-center p-4 border border-green-300 text-green-700 rounded-lg hover:bg-green-50 dark:border-green-600 dark:text-green-400 dark:hover:bg-green-900/20">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Import Data
          </button>
          <button className="flex items-center justify-center p-4 border border-purple-300 text-purple-700 rounded-lg hover:bg-purple-50 dark:border-purple-600 dark:text-purple-400 dark:hover:bg-purple-900/20">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            View Audit Logs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;