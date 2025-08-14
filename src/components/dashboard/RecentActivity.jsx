import React, { useState, useEffect } from 'react';
import { formatDateTime } from '../../utils/formatters';
import LoadingSpinner from '../common/LoadingSpinner';
import { useTheme } from '../../context/ThemeContext';

const RecentActivity = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isDark } = useTheme();

  useEffect(() => {
    // Mock recent activities
    const mockActivities = [
      {
        id: '1',
        type: 'checkout',
        user: 'Sarah Nakato',
        book: 'Things Fall Apart',
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        details: 'Due: Feb 15, 2024',
        avatar: 'SN'
      },
      {
        id: '2',
        type: 'return',
        user: 'David Okello',
        book: 'Mathematics for Secondary Schools',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        details: 'Returned on time',
        avatar: 'DO'
      },
      {
        id: '3',
        type: 'new_book',
        user: 'System',
        book: 'Physics Principles',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
        details: '5 copies added',
        avatar: 'SY'
      },
      {
        id: '4',
        type: 'renewal',
        user: 'Mary Achieng',
        book: 'English Literature',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
        details: 'Extended to Feb 20, 2024',
        avatar: 'MA'
      },
      {
        id: '5',
        type: 'overdue',
        user: 'John Ssemakula',
        book: 'History of Uganda',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
        details: '3 days overdue',
        avatar: 'JS'
      }
    ];

    setTimeout(() => {
      setActivities(mockActivities);
      setLoading(false);
    }, 800);
  }, []);

  const getActivityIcon = (type) => {
    const icons = {
      checkout: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
      return: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
        </svg>
      ),
      renewal: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      new_book: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      overdue: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    };
    return icons[type] || icons.checkout;
  };

  const getActivityConfig = (type) => {
    const configs = {
      checkout: {
        color: isDark ? 'text-green-400' : 'text-green-600',
        bgColor: isDark ? 'bg-green-900' : 'bg-green-100',
        gradient: isDark ? 'bg-green-800' : 'bg-green-600'
      },
      return: {
        color: isDark ? 'text-sage-400' : 'text-sage-600',
        bgColor: isDark ? 'bg-sage-900' : 'bg-sage-100',
        gradient: isDark ? 'bg-sage-600' : 'bg-sage-400'
      },
      renewal: {
        color: isDark ? 'text-green-400' : 'text-green-500',
        bgColor: isDark ? 'bg-green-900' : 'bg-green-50',
        gradient: isDark ? 'bg-green-700' : 'bg-green-500'
      },
      new_book: {
        color: isDark ? 'text-sage-400' : 'text-sage-700',
        bgColor: isDark ? 'bg-sage-900' : 'bg-sage-100',
        gradient: isDark ? 'bg-sage-700' : 'bg-sage-500'
      },
      overdue: {
        color: isDark ? 'text-red-400' : 'text-red-600',
        bgColor: isDark ? 'bg-red-900' : 'bg-red-100',
        gradient: isDark ? 'bg-red-700' : 'bg-red-500'
      }
    };
    return configs[type] || configs.checkout;
  };

  const getActivityText = (activity) => {
    const texts = {
      checkout: `${activity.user} checked out "${activity.book}"`,
      return: `${activity.user} returned "${activity.book}"`,
      renewal: `${activity.user} renewed "${activity.book}"`,
      new_book: `New book "${activity.book}" added to catalog`,
      overdue: `"${activity.book}" is overdue (${activity.user})`
    };
    return texts[activity.type] || 'Unknown activity';
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  if (loading) {
    return (
      <div className={`rounded-2xl shadow-sm border p-6 ${
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
      }`}>
        <h3 className={`text-xl font-semibold font-inter mb-6 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>Recent Activity</h3>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4 animate-pulse">
              <div className={`w-10 h-10 rounded-full ${
                isDark ? 'bg-gray-700' : 'bg-gray-200'
              }`}></div>
              <div className="flex-1">
                <div className={`h-4 rounded w-3/4 mb-2 ${
                  isDark ? 'bg-gray-700' : 'bg-gray-200'
                }`}></div>
                <div className={`h-3 rounded w-1/2 ${
                  isDark ? 'bg-gray-700' : 'bg-gray-200'
                }`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl shadow-sm border p-6 ${
      isDark ? 'bg-gray-800 border-gray-700' : 'bg-soft-white border-sage-200'
    }`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className={`text-xl font-semibold font-inter ${
          isDark ? 'text-white' : 'text-green-800'
        }`}>Recent Activity</h3>
        <button className={`text-sm font-medium transition-colors duration-200 ${
          isDark 
            ? 'text-green-400 hover:text-green-300' 
            : 'text-green-600 hover:text-green-800'
        }`}>
          View All
        </button>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity, index) => {
          const config = getActivityConfig(activity.type);
          return (
            <div key={activity.id} className={`group flex items-start space-x-4 p-4 rounded-xl border border-transparent transition-all duration-200 ${
              isDark 
                ? 'hover:bg-gray-700 hover:border-gray-600' 
                : 'hover:bg-sage-50 hover:border-sage-200'
            }`}>
              {/* User Avatar */}
              <div className="flex-shrink-0">
                <div className={`w-10 h-10 ${isDark ? 'bg-green-800' : 'bg-green-600'} rounded-full flex items-center justify-center text-white text-sm font-medium shadow-sm`}>
                  {activity.avatar}
                </div>
              </div>
              
              {/* Activity Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className={`text-sm font-medium mb-1 ${
                      isDark ? 'text-white' : 'text-green-800'
                    }`}>
                      {getActivityText(activity)}
                    </p>
                    <p className={`text-xs mb-2 ${
                      isDark ? 'text-gray-400' : 'text-sage-600'
                    }`}>{activity.details}</p>
                    <div className="flex items-center space-x-2">
                      <div className={`w-6 h-6 ${
                        isDark ? 'bg-gray-600' : config.bgColor
                      } rounded-lg flex items-center justify-center ${
                        isDark ? 'text-gray-300' : config.color
                      } border border-opacity-20`}>
                        {getActivityIcon(activity.type)}
                      </div>
                      <span className={`text-xs ${
                        isDark ? 'text-gray-500' : 'text-sage-500'
                      }`}>
                        {getTimeAgo(activity.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Activity Indicator */}
              <div className="flex-shrink-0">
                <div className={`w-3 h-3 ${config.gradient} rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-200 shadow-sm`}></div>
              </div>
            </div>
          );
        })}
      </div>
      
      {activities.length === 0 && (
        <div className="text-center py-12">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
            isDark ? 'bg-gray-700' : 'bg-gray-100'
          }`}>
            <svg className={`w-8 h-8 ${
              isDark ? 'text-gray-500' : 'text-gray-400'
            }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h4 className={`text-lg font-medium font-inter mb-2 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>No recent activity</h4>
          <p className={`text-sm ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}>Activity will appear here as users interact with the library</p>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;