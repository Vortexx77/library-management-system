import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

const QuickActions = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const actions = [
    {
      title: 'Check Out Book',
      description: 'Issue a book to a student or teacher',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
      gradient: isDark ? 'bg-green-800' : 'bg-green-600',
      hoverGradient: isDark ? 'bg-green-900' : 'bg-green-700',
      onClick: () => navigate('/circulation?action=checkout')
    },
    {
      title: 'Return Book',
      description: 'Process book returns',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
        </svg>
      ),
      gradient: isDark ? 'bg-green-700' : 'bg-green-500',
      hoverGradient: isDark ? 'bg-green-800' : 'bg-green-600',
      onClick: () => navigate('/circulation?action=return')
    },
    {
      title: 'Add New Book',
      description: 'Add a new book to the catalog',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      gradient: isDark ? 'bg-green-700' : 'bg-green-500',
      hoverGradient: isDark ? 'bg-green-800' : 'bg-green-600',
      onClick: () => navigate('/books?action=add')
    },
    {
      title: 'View Overdue',
      description: 'Check overdue books and fines',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: isDark ? 'bg-red-700' : 'bg-red-500',
      hoverGradient: isDark ? 'bg-red-800' : 'bg-red-600',
      onClick: () => navigate('/reports?tab=overdue')
    },
    {
      title: 'Add New User',
      description: 'Register a new student or teacher',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      ),
      gradient: isDark ? 'bg-green-600' : 'bg-green-400',
      hoverGradient: isDark ? 'bg-green-700' : 'bg-green-500',
      onClick: () => navigate('/users?action=add')
    },
    {
      title: 'Generate Report',
      description: 'Create library usage reports',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      gradient: isDark ? 'bg-green-600' : 'bg-green-400',
      hoverGradient: isDark ? 'bg-green-700' : 'bg-green-500',
      onClick: () => navigate('/reports')
    }
  ];

  return (
    <div className={`rounded-2xl shadow-sm border p-6 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-soft-white border-sage-200'
      }`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className={`text-xl font-semibold font-inter ${isDark ? 'text-white' : 'text-green-800'
          }`}>Quick Actions</h3>
        <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-sage-600'
          }`}>Choose an action to get started</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className={`group relative p-6 rounded-xl border hover:shadow-xl transition-all duration-300 text-left overflow-hidden ${isDark
              ? 'bg-gray-700 border-gray-600 hover:border-gray-500'
              : 'bg-green-50 border-green-200 hover:border-green-300'
              }`}
          >
            {/* Background on Hover */}
            <div className={`absolute inset-0 ${action.gradient} opacity-0 group-hover:opacity-8 transition-opacity duration-300`}></div>

            <div className="relative z-10">
              {/* Icon */}
              <div className={`w-12 h-12 ${action.gradient} group-hover:${action.hoverGradient} rounded-xl flex items-center justify-center text-white mb-4 shadow-lg transition-all duration-300 group-hover:scale-110`}>
                {action.icon}
              </div>

              {/* Content */}
              <div>
                <h4 className={`font-semibold font-inter mb-2 transition-colors duration-300 ${isDark
                  ? 'text-white group-hover:text-gray-100'
                  : 'text-green-800 group-hover:text-green-900'
                  }`}>
                  {action.title}
                </h4>
                <p className={`text-sm transition-colors duration-300 ${isDark
                  ? 'text-gray-300 group-hover:text-gray-200'
                  : 'text-sage-600 group-hover:text-sage-700'
                  }`}>
                  {action.description}
                </p>
              </div>

              {/* Arrow Icon */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-sage-400'
                  }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;