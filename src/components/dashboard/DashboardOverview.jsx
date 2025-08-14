import React, { useEffect, useState } from 'react';
import StatCard from './StatCard';
import QuickActions from './QuickActions';
import { reportService } from '../../services/reportService';
import { useApi } from '../../hooks/useApi';
import LoadingSpinner from '../common/LoadingSpinner';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const DashboardOverview = () => {
  const { data: stats, loading, error, execute } = useApi(reportService.getDashboardStats);
  const { user } = useAuth();
  const { isDark } = useTheme();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    execute();

    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getCurrentTime = () => {
    const now = new Date();
    const hour = now.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const statCards = [
    {
      title: 'Total Books',
      value: stats?.totalBooks || 2847,
      change: '+12%',
      changeType: 'positive',
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      gradient: isDark ? 'bg-green-800' : 'bg-green-600',
      bgGradient: isDark ? 'bg-green-900' : 'bg-green-50'
    },
    {
      title: 'Available Books',
      value: stats?.availableBooks || 2156,
      change: '+8%',
      changeType: 'positive',
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: isDark ? 'bg-green-700' : 'bg-green-500',
      bgGradient: isDark ? 'bg-green-900' : 'bg-green-50'
    },
    {
      title: 'Checked Out',
      value: stats?.checkedOutBooks || 691,
      change: '+15%',
      changeType: 'positive',
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      gradient: isDark ? 'bg-green-700' : 'bg-green-500',
      bgGradient: isDark ? 'bg-green-900' : 'bg-green-50'
    },
    {
      title: 'Overdue Books',
      value: stats?.overdueBooks || 23,
      change: '-5%',
      changeType: 'negative',
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: isDark ? 'bg-red-700' : 'bg-red-500',
      bgGradient: isDark ? 'bg-red-900' : 'bg-red-50'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className={`mt-4 text-lg ${isDark ? 'text-gray-300' : 'text-green-600'}`}>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-soft-white border-sage-200'} rounded-2xl shadow-xl p-8 max-w-md w-full mx-4 border`}>
          <div className="text-center">
            <div className={`w-16 h-16 ${isDark ? 'bg-red-900/20' : 'bg-red-100'} rounded-full flex items-center justify-center mx-auto mb-4`}>
              <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-green-800'}`}>Something went wrong</h3>
            <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-sage-600'}`}>{error}</p>
            <button
              onClick={execute}
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Compact Welcome Header */}
      <div className={`${isDark
        ? 'bg-green-800'
        : 'bg-green-600'
        } rounded-2xl p-6 text-white shadow-lg`}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1 font-inter">
              {getCurrentTime()}, {user?.name?.split(' ')[0] || 'Library'}! 👋
            </h1>
            <p className="text-white text-sm">
              Here's what's happening in your library today
            </p>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-3 border border-white border-opacity-20">
              <div className="text-center">
                <p className="text-xs text-white opacity-90">Today</p>
                <p className="text-lg font-bold text-white">{currentTime.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</p>
              </div>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-3 border border-white border-opacity-20">
              <div className="text-center">
                <p className="text-xs text-white opacity-90">Time</p>
                <p className="text-lg font-bold text-white font-mono">{currentTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            changeType={stat.changeType}
            icon={stat.icon}
            gradient={stat.gradient}
            bgGradient={stat.bgGradient}
          />
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <QuickActions />
      </div>

      {/* Additional Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Popular Books Widget */}
        <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-soft-white border-sage-200'
          } rounded-2xl shadow-sm border p-6`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-xl font-semibold font-inter ${isDark ? 'text-white' : 'text-green-800'
              }`}>Popular Books</h3>
            <button className={`text-sm font-medium transition-colors duration-200 ${isDark
              ? 'text-green-400 hover:text-green-300'
              : 'text-green-600 hover:text-green-800'
              }`}>
              View All
            </button>
          </div>
          <div className="space-y-4">
            {[
              { title: 'Things Fall Apart', author: 'Chinua Achebe', loans: 45 },
              { title: 'Mathematics for Secondary Schools', author: 'John Mukasa', loans: 38 },
              { title: 'A History of Uganda', author: 'Samwiri Karugire', loans: 32 }
            ].map((book, index) => (
              <div key={index} className={`flex items-center justify-between p-4 rounded-xl border transition-colors duration-200 ${isDark
                ? 'bg-gray-700 border-gray-600 hover:border-gray-500'
                : 'bg-sage-50 border-sage-100 hover:border-sage-200'
                }`}>
                <div>
                  <p className={`font-medium ${isDark ? 'text-white' : 'text-green-800'}`}>{book.title}</p>
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{book.author}</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${isDark ? 'text-green-400' : 'text-green-600'
                    }`}>{book.loans} loans</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Library Status Widget */}
        <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-soft-white border-sage-200'
          } rounded-2xl shadow-sm border p-6`}>
          <h3 className={`text-xl font-semibold font-inter mb-6 ${isDark ? 'text-white' : 'text-green-800'
            }`}>Library Status</h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>Capacity Utilization</span>
              <span className={`font-semibold ${isDark ? 'text-white' : 'text-green-800'}`}>76%</span>
            </div>
            <div className={`w-full rounded-full h-3 ${isDark ? 'bg-gray-700' : 'bg-sage-100'}`}>
              <div className="bg-sage-400 h-3 rounded-full shadow-sm" style={{ width: '76%' }}></div>
            </div>

            <div className="flex items-center justify-between">
              <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>Monthly Target</span>
              <span className={`font-semibold ${isDark ? 'text-white' : 'text-green-800'}`}>89%</span>
            </div>
            <div className={`w-full rounded-full h-3 ${isDark ? 'bg-gray-700' : 'bg-green-100'}`}>
              <div className={`${isDark ? 'bg-green-700' : 'bg-green-500'} h-3 rounded-full shadow-sm`} style={{ width: '89%' }}></div>
            </div>

            <div className={`mt-6 p-4 rounded-xl border ${isDark
              ? 'bg-gray-700 border-gray-600'
              : 'bg-sage-50 border-sage-200'
              }`}>
              <div className="flex items-center">
                <div className={`w-8 h-8 ${isDark ? 'bg-green-700' : 'bg-sage-500'} rounded-full flex items-center justify-center mr-3`}>
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>Great Performance!</p>
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>You're ahead of this month's target</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;