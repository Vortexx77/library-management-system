import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import LoadingSpinner from './LoadingSpinner';

const Layout = ({ children }) => {
  const { loading, error, clearError } = useApp();
  const { isDark } = useTheme();

  return (
    <div className={`flex h-screen font-inter ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
      {/* Connected Container */}
      <div className="flex h-full w-full shadow-lg">
        <Sidebar />

        {/* Main Content Container */}
        <div className={`flex-1 flex flex-col overflow-hidden ${
          isDark ? 'bg-gray-800' : 'bg-white'
        } rounded-r-2xl`}>
          <Header />

          <main className={`flex-1 overflow-y-auto relative ${
            isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
          }`}>
            {/* Global loading overlay */}
            {loading && (
              <div className={`fixed inset-0 ${
                isDark ? 'bg-gray-900' : 'bg-white'
              } bg-opacity-90 backdrop-blur-sm flex items-center justify-center z-50`}>
                <div className={`text-center ${
                  isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                } rounded-2xl p-8 shadow-xl border`}>
                  <LoadingSpinner size="lg" />
                  <p className={`mt-4 font-medium ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>Loading...</p>
                </div>
              </div>
            )}

            {/* Global error notification */}
            {error && (
              <div className="mx-6 mt-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm text-red-800 dark:text-red-200 font-medium">{error}</p>
                  </div>
                  <div className="ml-auto pl-3">
                    <button
                      onClick={clearError}
                      className="text-red-500 hover:text-red-700 dark:hover:text-red-300 transition-colors duration-200"
                    >
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Page content */}
            <div className="p-6 lg:p-6 md:p-4">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;