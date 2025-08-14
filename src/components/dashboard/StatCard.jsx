import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const StatCard = ({ 
  title, 
  value, 
  change, 
  changeType, 
  icon, 
  gradient = 'bg-green-600',
  bgGradient = 'bg-green-50',
  onClick 
}) => {
  const { isDark } = useTheme();

  return (
    <div 
      className={`group relative rounded-2xl shadow-sm border p-6 hover:shadow-xl transition-all duration-300 ${
        isDark 
          ? 'bg-gray-800 border-gray-700 hover:border-gray-600' 
          : 'bg-soft-white border-sage-200 hover:border-sage-300'
      } ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      {/* Background Hover */}
      <div className={`absolute inset-0 ${
        isDark ? 'bg-gray-700' : bgGradient
      } rounded-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-300`}></div>
      
      <div className="relative z-10">
        {/* Header with Icon */}
        <div className="flex items-center justify-between mb-4">
          <div className={`w-14 h-14 ${gradient} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
            {icon}
          </div>
          {change && (
            <div className={`flex items-center text-sm font-medium px-3 py-1 rounded-full border ${
              changeType === 'positive' 
                ? isDark 
                  ? 'text-green-300 bg-green-900/20 border-green-800' 
                  : 'text-sage-700 bg-sage-100 border-sage-200'
                : isDark
                  ? 'text-red-300 bg-red-900/20 border-red-800'
                  : 'text-red-700 bg-red-100 border-red-200'
            }`}>
              {changeType === 'positive' ? (
                <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
                </svg>
              ) : (
                <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 7l-9.2 9.2M7 7v10h10" />
                </svg>
              )}
              {change}
            </div>
          )}
        </div>

        {/* Content */}
        <div>
          <h3 className={`text-sm font-medium font-inter mb-2 transition-colors duration-300 ${
            isDark 
              ? 'text-gray-300 group-hover:text-white' 
              : 'text-gray-800 group-hover:text-gray-900'
          }`}>{title}</h3>
          <p className={`text-3xl font-bold font-inter mb-2 transition-colors duration-300 ${
            isDark 
              ? 'text-white group-hover:text-gray-100' 
              : 'text-green-800 group-hover:text-green-900'
          }`}>
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          <p className={`text-xs transition-colors duration-300 ${
            isDark 
              ? 'text-gray-400 group-hover:text-gray-300' 
              : 'text-gray-700 group-hover:text-gray-800'
          }`}>
            {changeType === 'positive' ? 'Increased' : 'Decreased'} from last month
          </p>
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className={`absolute inset-0 rounded-2xl ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
    </div>
  );
};

export default StatCard;