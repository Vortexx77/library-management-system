import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const AuditLogs = () => {
  const { isDark } = useTheme();
  const [auditLogs, setAuditLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState('');
  const [filterUser, setFilterUser] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 20;

  // Mock data based on audit_logs table
  useEffect(() => {
    setAuditLogs([
      {
        log_id: 1,
        user_id: 1,
        user_name: 'Mary Johnson',
        action: 'BOOK_CHECKOUT',
        table_affected: 'borrowing_transactions',
        record_id: 15,
        old_values: null,
        new_values: {
          copy_id: 5,
          borrower_type: 'student',
          borrower_id: 12,
          due_date: '2025-01-28'
        },
        ip_address: '192.168.1.45',
        timestamp: '2025-01-14T16:30:00Z'
      },
      {
        log_id: 2,
        user_id: 2,
        user_name: 'John Smith',
        action: 'BOOK_RETURN',
        table_affected: 'borrowing_transactions',
        record_id: 14,
        old_values: {
          status: 'borrowed',
          returned_date: null
        },
        new_values: {
          status: 'returned',
          returned_date: '2025-01-14T15:45:00Z'
        },
        ip_address: '192.168.1.32',
        timestamp: '2025-01-14T15:45:00Z'
      },
      {
        log_id: 3,
        user_id: 1,
        user_name: 'Mary Johnson',
        action: 'USER_CREATE',
        table_affected: 'students',
        record_id: 25,
        old_values: null,
        new_values: {
          admission_number: 'STU025',
          first_name: 'Alice',
          last_name: 'Nakato',
          class: 'Form 2',
          stream: 'A'
        },
        ip_address: '192.168.1.45',
        timestamp: '2025-01-14T14:20:00Z'
      },
      {
        log_id: 4,
        user_id: 3,
        user_name: 'System Administrator',
        action: 'BOOK_CREATE',
        table_affected: 'books',
        record_id: 89,
        old_values: null,
        new_values: {
          title: 'Uganda History Textbook',
          author: 'Dr. Samuel Karugire',
          isbn: '9780123456789',
          category_id: 5
        },
        ip_address: '192.168.1.10',
        timestamp: '2025-01-14T13:15:00Z'
      },
      {
        log_id: 5,
        user_id: 2,
        user_name: 'John Smith',
        action: 'BOOK_UPDATE',
        table_affected: 'books',
        record_id: 45,
        old_values: {
          available_copies: 3,
          total_copies: 5
        },
        new_values: {
          available_copies: 2,
          total_copies: 5
        },
        ip_address: '192.168.1.32',
        timestamp: '2025-01-14T12:30:00Z'
      },
      {
        log_id: 6,
        user_id: 1,
        user_name: 'Mary Johnson',
        action: 'RESERVATION_CREATE',
        table_affected: 'reservations',
        record_id: 8,
        old_values: null,
        new_values: {
          book_id: 23,
          borrower_type: 'teacher',
          borrower_id: 5,
          status: 'active'
        },
        ip_address: '192.168.1.45',
        timestamp: '2025-01-14T11:45:00Z'
      },
      {
        log_id: 7,
        user_id: 3,
        user_name: 'System Administrator',
        action: 'SETTINGS_UPDATE',
        table_affected: 'system_settings',
        record_id: 3,
        old_values: {
          setting_value: '14'
        },
        new_values: {
          setting_value: '21'
        },
        ip_address: '192.168.1.10',
        timestamp: '2025-01-14T10:15:00Z'
      },
      {
        log_id: 8,
        user_id: 2,
        user_name: 'John Smith',
        action: 'LOST_BOOK_REPORT',
        table_affected: 'lost_books',
        record_id: 3,
        old_values: null,
        new_values: {
          transaction_id: 12,
          copy_id: 8,
          replacement_cost: 25000,
          payment_status: 'pending'
        },
        ip_address: '192.168.1.32',
        timestamp: '2025-01-14T09:30:00Z'
      }
    ]);
  }, []);

  const getActionIcon = (action) => {
    const icons = {
      BOOK_CHECKOUT: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
      BOOK_RETURN: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
        </svg>
      ),
      USER_CREATE: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      ),
      BOOK_CREATE: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      BOOK_UPDATE: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      RESERVATION_CREATE: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      SETTINGS_UPDATE: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      LOST_BOOK_REPORT: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      )
    };
    return icons[action] || icons.BOOK_UPDATE;
  };

  const getActionColor = (action) => {
    const colors = {
      BOOK_CHECKOUT: 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400',
      BOOK_RETURN: 'text-blue-600 bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400',
      USER_CREATE: 'text-purple-600 bg-purple-100 dark:bg-purple-900/20 dark:text-purple-400',
      BOOK_CREATE: 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400',
      BOOK_UPDATE: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400',
      RESERVATION_CREATE: 'text-indigo-600 bg-indigo-100 dark:bg-indigo-900/20 dark:text-indigo-400',
      SETTINGS_UPDATE: 'text-gray-600 bg-gray-100 dark:bg-gray-900/20 dark:text-gray-400',
      LOST_BOOK_REPORT: 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400'
    };
    return colors[action] || colors.BOOK_UPDATE;
  };

  const formatActionName = (action) => {
    return action.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString()
    };
  };

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.table_affected.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.ip_address.includes(searchTerm);
    const matchesAction = !filterAction || log.action === filterAction;
    const matchesUser = !filterUser || log.user_name.toLowerCase().includes(filterUser.toLowerCase());
    
    let matchesDateRange = true;
    if (dateRange.start || dateRange.end) {
      const logDate = new Date(log.timestamp).toISOString().split('T')[0];
      if (dateRange.start && logDate < dateRange.start) matchesDateRange = false;
      if (dateRange.end && logDate > dateRange.end) matchesDateRange = false;
    }
    
    return matchesSearch && matchesAction && matchesUser && matchesDateRange;
  });

  // Pagination
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);
  const startIndex = (currentPage - 1) * logsPerPage;
  const paginatedLogs = filteredLogs.slice(startIndex, startIndex + logsPerPage);

  const uniqueActions = [...new Set(auditLogs.map(log => log.action))];
  const uniqueUsers = [...new Set(auditLogs.map(log => log.user_name))];

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Audit Logs
          </h1>
          <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Track all system activities and changes
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-green-500 ${
                isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
            />
            <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          <select
            value={filterAction}
            onChange={(e) => setFilterAction(e.target.value)}
            className={`px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
              isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
            }`}
          >
            <option value="">All Actions</option>
            {uniqueActions.map(action => (
              <option key={action} value={action}>{formatActionName(action)}</option>
            ))}
          </select>

          <select
            value={filterUser}
            onChange={(e) => setFilterUser(e.target.value)}
            className={`px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
              isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
            }`}
          >
            <option value="">All Users</option>
            {uniqueUsers.map(user => (
              <option key={user} value={user}>{user}</option>
            ))}
          </select>

          <input
            type="date"
            value={dateRange.start}
            onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
            className={`px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
              isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
            }`}
            placeholder="Start date"
          />

          <input
            type="date"
            value={dateRange.end}
            onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
            className={`px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
              isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
            }`}
            placeholder="End date"
          />
        </div> 
       {/* Logs Table */}
        <div className={`bg-white rounded-lg shadow overflow-hidden ${isDark ? 'bg-gray-800' : ''}`}>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className={`${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <tr>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    isDark ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    Action
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    isDark ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    User
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    isDark ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    Table
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    isDark ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    Record ID
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    isDark ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    IP Address
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    isDark ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    Timestamp
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    isDark ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'bg-gray-800 divide-gray-700' : 'bg-white divide-gray-200'}`}>
                {paginatedLogs.map((log) => {
                  const timestamp = formatTimestamp(log.timestamp);
                  return (
                    <tr key={log.log_id} className={`hover:${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`flex-shrink-0 h-8 w-8 rounded-lg flex items-center justify-center ${getActionColor(log.action)}`}>
                            {getActionIcon(log.action)}
                          </div>
                          <div className="ml-3">
                            <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {formatActionName(log.action)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>
                          {log.user_name}
                        </div>
                        <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                          ID: {log.user_id}
                        </div>
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-mono ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {log.table_affected}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-mono ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {log.record_id}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-mono ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {log.ip_address}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>
                          {timestamp.date}
                        </div>
                        <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                          {timestamp.time}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="max-w-xs">
                          {log.old_values && (
                            <div className="mb-2">
                              <span className={`text-xs font-medium ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                                Old: 
                              </span>
                              <div className={`text-xs font-mono ${isDark ? 'text-gray-400' : 'text-gray-600'} truncate`}>
                                {JSON.stringify(log.old_values)}
                              </div>
                            </div>
                          )}
                          {log.new_values && (
                            <div>
                              <span className={`text-xs font-medium ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                                New: 
                              </span>
                              <div className={`text-xs font-mono ${isDark ? 'text-gray-400' : 'text-gray-600'} truncate`}>
                                {JSON.stringify(log.new_values)}
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between">
            <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
              Showing {startIndex + 1} to {Math.min(startIndex + logsPerPage, filteredLogs.length)} of {filteredLogs.length} results
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`px-3 py-2 border rounded-lg text-sm ${
                  currentPage === 1
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                } ${isDark ? 'border-gray-600 text-gray-300' : 'border-gray-300 text-gray-700'}`}
              >
                Previous
              </button>
              
              {[...Array(totalPages)].map((_, i) => {
                const page = i + 1;
                if (page === 1 || page === totalPages || (page >= currentPage - 2 && page <= currentPage + 2)) {
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-2 border rounded-lg text-sm ${
                        currentPage === page
                          ? 'bg-green-600 text-white border-green-600'
                          : isDark
                            ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  );
                } else if (page === currentPage - 3 || page === currentPage + 3) {
                  return (
                    <span key={page} className={`px-3 py-2 text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                      ...
                    </span>
                  );
                }
                return null;
              })}
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 border rounded-lg text-sm ${
                  currentPage === totalPages
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                } ${isDark ? 'border-gray-600 text-gray-300' : 'border-gray-300 text-gray-700'}`}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {filteredLogs.length === 0 && (
          <div className={`text-center py-12 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            <h3 className="mt-2 text-sm font-medium">No audit logs found</h3>
            <p className="mt-1 text-sm">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuditLogs;