import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const Reports = () => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });
  const [reportData, setReportData] = useState({
    overview: {},
    circulation: [],
    overdue: [],
    popular: [],
    users: []
  });

  // Mock data - replace with API calls
  useEffect(() => {
    setReportData({
      overview: {
        totalBooks: 1250,
        totalCopies: 2100,
        totalUsers: 450,
        activeLoans: 89,
        overdueBooks: 12,
        reservations: 5,
        newBooksThisMonth: 25,
        circulationThisMonth: 156
      },
      circulation: [
        { date: '2025-01-01', checkouts: 15, returns: 12, renewals: 3 },
        { date: '2025-01-02', checkouts: 18, returns: 14, renewals: 5 },
        { date: '2025-01-03', checkouts: 12, returns: 16, renewals: 2 },
        { date: '2025-01-04', checkouts: 20, returns: 15, renewals: 4 },
        { date: '2025-01-05', checkouts: 16, returns: 18, renewals: 6 }
      ],
      overdue: [
        {
          transaction_id: 1,
          book_title: 'Introduction to Computer Science',
          borrower_name: 'John Doe',
          borrower_type: 'student',
          due_date: '2025-01-10',
          days_overdue: 4,
          contact: '+256712345678'
        },
        {
          transaction_id: 2,
          book_title: 'Advanced Mathematics',
          borrower_name: 'Jane Smith',
          borrower_type: 'student',
          due_date: '2025-01-08',
          days_overdue: 6,
          contact: '+256734567890'
        }
      ],
      popular: [
        { book_title: 'Introduction to Computer Science', author: 'John Smith', loans: 45, category: 'Computer Science' },
        { book_title: 'Advanced Mathematics', author: 'Jane Doe', loans: 38, category: 'Mathematics' },
        { book_title: 'Physics Fundamentals', author: 'Bob Wilson', loans: 32, category: 'Physics' },
        { book_title: 'Chemistry Basics', author: 'Alice Brown', loans: 28, category: 'Chemistry' },
        { book_title: 'Biology Essentials', author: 'Carol Davis', loans: 25, category: 'Biology' }
      ],
      users: [
        { class: 'Form 4', active_students: 120, total_loans: 89, avg_loans_per_student: 0.74 },
        { class: 'Form 3', active_students: 115, total_loans: 76, avg_loans_per_student: 0.66 },
        { class: 'Form 2', active_students: 108, total_loans: 65, avg_loans_per_student: 0.60 },
        { class: 'Form 1', active_students: 95, total_loans: 45, avg_loans_per_student: 0.47 }
      ]
    });
  }, [dateRange]);

  const StatCard = ({ title, value, subtitle, icon, color = 'green' }) => (
    <div className={`rounded-lg shadow-sm border p-6 ${
      isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${
          color === 'green' ? (isDark ? 'bg-green-900/20' : 'bg-green-100') :
          color === 'blue' ? (isDark ? 'bg-blue-900/20' : 'bg-blue-100') :
          color === 'purple' ? (isDark ? 'bg-purple-900/20' : 'bg-purple-100') :
          color === 'yellow' ? (isDark ? 'bg-yellow-900/20' : 'bg-yellow-100') :
          (isDark ? 'bg-gray-700' : 'bg-gray-100')
        }`}>
          {icon}
        </div>
        <div className="ml-4">
          <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {value}
          </p>
          <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {title}
          </p>
          {subtitle && (
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  const exportReport = (type) => {
    console.log(`Exporting ${type} report for date range:`, dateRange);
    // Implement export functionality
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Reports</h1>
        <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Generate and view library reports</p>
      </div>

      {/* Date Range Selector */}
      <div className={`rounded-lg shadow-sm border p-6 mb-6 ${
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div>
              <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-white' : 'text-gray-700'}`}>
                Start Date
              </label>
              <input
                type="date"
                value={dateRange.startDate}
                onChange={(e) => setDateRange({...dateRange, startDate: e.target.value})}
                className={`px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                }`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-white' : 'text-gray-700'}`}>
                End Date
              </label>
              <input
                type="date"
                value={dateRange.endDate}
                onChange={(e) => setDateRange({...dateRange, endDate: e.target.value})}
                className={`px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                }`}
              />
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => exportReport('pdf')}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500"
            >
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export PDF
            </button>
            <button
              onClick={() => exportReport('excel')}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500"
            >
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Export Excel
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className={`border-b mb-6 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <nav className="-mb-px flex space-x-8">
          {[
            { key: 'overview', label: 'Overview' },
            { key: 'circulation', label: 'Circulation' },
            { key: 'overdue', label: 'Overdue Books' },
            { key: 'popular', label: 'Popular Books' },
            { key: 'users', label: 'User Statistics' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.key
                  ? `border-green-500 ${isDark ? 'text-green-400' : 'text-green-600'}`
                  : `border-transparent ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Books"
              value={reportData.overview.totalBooks?.toLocaleString()}
              subtitle={`${reportData.overview.totalCopies?.toLocaleString()} total copies`}
              icon={
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              }
            />
            <StatCard
              title="Active Loans"
              value={reportData.overview.activeLoans}
              subtitle={`${reportData.overview.overdueBooks} overdue`}
              color="blue"
              icon={
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              }
            />
            <StatCard
              title="Total Users"
              value={reportData.overview.totalUsers}
              subtitle="Students & Teachers"
              color="purple"
              icon={
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              }
            />
            <StatCard
              title="This Month"
              value={reportData.overview.circulationThisMonth}
              subtitle={`${reportData.overview.newBooksThisMonth} new books added`}
              color="yellow"
              icon={
                <svg className="w-6 h-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              }
            />
          </div>
        </div>
      )}

      {/* Circulation Tab */}
      {activeTab === 'circulation' && (
        <div className={`rounded-lg shadow-sm border overflow-hidden ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="p-6">
            <h3 className={`text-lg font-medium mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Daily Circulation Activity
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className={isDark ? 'bg-gray-700' : 'bg-gray-50'}>
                  <tr>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDark ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      Date
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDark ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      Checkouts
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDark ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      Returns
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDark ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      Renewals
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDark ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      Net Change
                    </th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
                  {reportData.circulation.map((day, index) => (
                    <tr key={index} className={isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {new Date(day.date).toLocaleDateString()}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                        +{day.checkouts}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                        -{day.returns}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}>
                        {day.renewals}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                        (day.checkouts - day.returns) > 0 
                          ? (isDark ? 'text-green-400' : 'text-green-600')
                          : (isDark ? 'text-red-400' : 'text-red-600')
                      }`}>
                        {day.checkouts - day.returns > 0 ? '+' : ''}{day.checkouts - day.returns}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Overdue Tab */}
      {activeTab === 'overdue' && (
        <div className={`rounded-lg shadow-sm border overflow-hidden ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="p-6">
            <h3 className={`text-lg font-medium mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Overdue Books ({reportData.overdue.length})
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className={isDark ? 'bg-gray-700' : 'bg-gray-50'}>
                  <tr>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDark ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      Book Title
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDark ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      Borrower
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDark ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      Due Date
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDark ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      Days Overdue
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDark ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      Contact
                    </th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
                  {reportData.overdue.map((item) => (
                    <tr key={item.transaction_id} className={isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {item.book_title}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                        {item.borrower_name}
                        <div className="text-xs">
                          {item.borrower_type === 'student' ? 'Student' : 'Teacher'}
                        </div>
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                        {new Date(item.due_date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                          {item.days_overdue} days
                        </span>
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                        {item.contact}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Popular Books Tab */}
      {activeTab === 'popular' && (
        <div className={`rounded-lg shadow-sm border overflow-hidden ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="p-6">
            <h3 className={`text-lg font-medium mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Most Popular Books
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className={isDark ? 'bg-gray-700' : 'bg-gray-50'}>
                  <tr>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDark ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      Rank
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDark ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      Book Details
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDark ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      Category
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDark ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      Total Loans
                    </th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
                  {reportData.popular.map((book, index) => (
                    <tr key={index} className={isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        #{index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {book.book_title}
                        </div>
                        <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                          by {book.author}
                        </div>
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                        {book.category}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                        {book.loans}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* User Statistics Tab */}
      {activeTab === 'users' && (
        <div className={`rounded-lg shadow-sm border overflow-hidden ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="p-6">
            <h3 className={`text-lg font-medium mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              User Statistics by Class
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className={isDark ? 'bg-gray-700' : 'bg-gray-50'}>
                  <tr>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDark ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      Class
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDark ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      Active Students
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDark ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      Total Loans
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDark ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      Avg Loans/Student
                    </th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
                  {reportData.users.map((classData, index) => (
                    <tr key={index} className={isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {classData.class}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                        {classData.active_students}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                        {classData.total_loans}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                        {classData.avg_loans_per_student.toFixed(2)}
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

export default Reports;