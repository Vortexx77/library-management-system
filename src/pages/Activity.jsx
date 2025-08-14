import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const Activity = () => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('recent');
  const [activities, setActivities] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [filterUser, setFilterUser] = useState('');
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });

  // Mock data for recent activities
  useEffect(() => {
    setActivities([
      {
        id: 1,
        type: 'checkout',
        user: 'Mary Johnson',
        action: 'checked out',
        target: 'Introduction to Computer Science',
        borrower: 'John Doe (STU001)',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        status: 'success'
      },
      {
        id: 2,
        type: 'return',
        user: 'Mary Johnson',
        action: 'processed return of',
        target: 'Advanced Mathematics',
        borrower: 'Jane Smith (STU002)',
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        status: 'success'
      },
      {
        id: 3,
        type: 'renewal',
        user: 'Robert Wilson',
        action: 'renewed',
        target: 'Physics Fundamentals',
        borrower: 'Alice Brown (TCH001)',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        status: 'success'
      },
      {
        id: 4,
        type: 'overdue',
        user: 'System',
        action: 'marked as overdue',
        target: 'Chemistry Basics',
        borrower: 'Bob Davis (STU003)',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        status: 'warning'
      },
      {
        id: 5,
        type: 'book_added',
        user: 'Mary Johnson',
        action: 'added new book',
        target: 'Modern Biology',
        borrower: null,
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
        status: 'success'
      }
    ]);

    // Mock audit logs based on audit_logs table
    setAuditLogs([
      {
        log_id: 1,
        user_id: 1,
        user_name: 'Mary Johnson',
        action: 'CREATE',
        table_affected: 'borrowing_transactions',
        record_id: 123,
        old_values: null,
        new_values: { borrower_id: 1, book_id: 5, due_date: '2025-01-29' },
        ip_address: '192.168.1.100',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
      },
      {
        log_id: 2,
        user_id: 1,
        user_name: 'Mary Johnson',
        action: 'UPDATE',
        table_affected: 'borrowing_transactions',
        record_id: 122,
        old_values: { status: 'borrowed' },
        new_values: { status: 'returned', returned_date: '2025-01-14' },
        ip_address: '192.168.1.100',
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString()
      },
      {
        log_id: 3,
        user_id: 2,
        user_name: 'Admin User',
        action: 'CREATE',
        table_affected: 'books',
        record_id: 25,
        old_values: null,
        new_values: { title: 'Modern Biology', author: 'Dr. Smith', isbn: '9781234567890' },
        ip_address: '192.168.1.101',
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString()
      }
    ]);
  }, [dateRange]);

  const getActivityIcon = (type) => {
    switch (type) {
      case 'checkout':
        return (
          <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
        );
      case 'return':
        return (
          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
          </div>
        );
      case 'renewal':
        return (
          <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
        );
      case 'overdue':
        return (
          <div className="w-8 h-8 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      case 'book_added':
        return (
          <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
    }
  };

  const getActionBadge = (action) => {
    const colors = {
      CREATE: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      UPDATE: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      DELETE: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
    };
    return colors[action] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const filteredActivities = activities.filter(activity => {
    const matchesType = !filterType || activity.type === filterType;
    const matchesUser = !filterUser || activity.user.toLowerCase().includes(filterUser.toLowerCase());
    return matchesType && matchesUser;
  });

  const filteredAuditLogs = auditLogs.filter(log => {
    const matchesType = !filterType || log.action === filterType;
    const matchesUser = !filterUser || log.user_name.toLowerCase().includes(filterUser.toLowerCase());
    return matchesType && matchesUser;
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Library Activity</h1>
        <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Track all library transactions and system activities</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className={`rounded-lg shadow-sm border p-6 ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/20">
              <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div className="ml-4">
              <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>24</p>
              <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Today's Checkouts</p>
            </div>
          </div>
        </div>

        <div className={`rounded-lg shadow-sm border p-6 ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/20">
              <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
            </div>
            <div className="ml-4">
              <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>18</p>
              <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Today's Returns</p>
            </div>
          </div>
        </div>

        <div className={`rounded-lg shadow-sm border p-6 ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-yellow-100 dark:bg-yellow-900/20">
              <svg className="w-6 h-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <div className="ml-4">
              <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>7</p>
              <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Renewals</p>
            </div>
          </div>
        </div>

        <div className={`rounded-lg shadow-sm border p-6 ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-red-100 dark:bg-red-900/20">
              <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>3</p>
              <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Overdue Items</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className={`border-b mb-6 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('recent')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'recent'
                ? `border-green-500 ${isDark ? 'text-green-400' : 'text-green-600'}`
                : `border-transparent ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`
            }`}
          >
            Recent Activity
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'audit'
                ? `border-green-500 ${isDark ? 'text-green-400' : 'text-green-600'}`
                : `border-transparent ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`
            }`}
          >
            Audit Logs
          </button>
        </nav>
      </div>

      {/* Filters */}
      <div className={`rounded-lg shadow-sm border p-6 mb-6 ${
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <input
              type="text"
              placeholder="Search by user..."
              value={filterUser}
              onChange={(e) => setFilterUser(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300'
              }`}
            />
          </div>
          <div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
            >
              <option value="">All Types</option>
              {activeTab === 'recent' ? (
                <>
                  <option value="checkout">Checkouts</option>
                  <option value="return">Returns</option>
                  <option value="renewal">Renewals</option>
                  <option value="overdue">Overdue</option>
                  <option value="book_added">Books Added</option>
                </>
              ) : (
                <>
                  <option value="CREATE">Create</option>
                  <option value="UPDATE">Update</option>
                  <option value="DELETE">Delete</option>
                </>
              )}
            </select>
          </div>
          <div>
            <input
              type="date"
              value={dateRange.startDate}
              onChange={(e) => setDateRange({...dateRange, startDate: e.target.value})}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
            />
          </div>
          <div>
            <input
              type="date"
              value={dateRange.endDate}
              onChange={(e) => setDateRange({...dateRange, endDate: e.target.value})}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Activity Content */}
      {activeTab === 'recent' ? (
        <div className={`rounded-lg shadow-sm border ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="p-6">
            <h3 className={`text-lg font-medium mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Recent Activity
            </h3>
            <div className="space-y-4">
              {filteredActivities.map((activity) => (
                <div key={activity.id} className={`flex items-start space-x-4 p-4 rounded-lg ${
                  isDark ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  {getActivityIcon(activity.type)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {activity.user} {activity.action} <span className="font-semibold">{activity.target}</span>
                        {activity.borrower && (
                          <span className={`ml-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                            for {activity.borrower}
                          </span>
                        )}
                      </p>
                      <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {formatTimeAgo(activity.timestamp)}
                      </span>
                    </div>
                    <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {new Date(activity.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className={`rounded-lg shadow-sm border overflow-hidden ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="p-6">
            <h3 className={`text-lg font-medium mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              System Audit Logs
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className={isDark ? 'bg-gray-700' : 'bg-gray-50'}>
                  <tr>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDark ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      User & Action
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDark ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      Table & Record
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDark ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      Changes
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDark ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      Timestamp
                    </th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
                  {filteredAuditLogs.map((log) => (
                    <tr key={log.log_id} className={isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {log.user_name}
                          </div>
                          <div className="flex items-center mt-1">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getActionBadge(log.action)}`}>
                              {log.action}
                            </span>
                            <span className={`ml-2 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              {log.ip_address}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>
                          {log.table_affected}
                        </div>
                        <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          ID: {log.record_id}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                          {log.old_values && (
                            <div className="mb-1">
                              <span className="font-medium">Old:</span> {JSON.stringify(log.old_values)}
                            </div>
                          )}
                          {log.new_values && (
                            <div>
                              <span className="font-medium">New:</span> {JSON.stringify(log.new_values)}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>
                          {new Date(log.timestamp).toLocaleDateString()}
                        </div>
                        <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {new Date(log.timestamp).toLocaleTimeString()}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Activity;