import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { debounce } from '../../utils/helpers';

const SearchBar = ({ 
  placeholder = 'Search books, authors, members...', 
  onSearch = () => {}, 
  className = '',
  showFilters = false,
  filters = [],
  onFilterChange,
  value = ''
}) => {
  const [searchQuery, setSearchQuery] = useState(value);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const { isDark } = useTheme();

  // Debounced search function
  const debouncedSearch = debounce((query) => {
    onSearch(query);
  }, 300);

  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery, debouncedSearch]);

  useEffect(() => {
    setSearchQuery(value);
  }, [value]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
    onSearch('');
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        {/* Search icon */}
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className={`h-5 w-5 ${
            isDark ? 'text-gray-400' : 'text-gray-400'
          }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Search input */}
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={`block w-full pl-10 pr-12 py-2.5 rounded-xl font-inter text-sm transition-colors duration-200 ${
            isDark 
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-green-800 focus:border-green-800' 
              : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:ring-green-500 focus:border-green-500'
          } border focus:ring-2 focus:ring-opacity-50`}
        />

        {/* Clear button */}
        {searchQuery && (
          <button
            onClick={clearSearch}
            className={`absolute inset-y-0 right-8 flex items-center pr-2 ${
              isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'
            } transition-colors duration-200`}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        {/* Filter button */}
        {showFilters && (
          <button
            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            className={`absolute inset-y-0 right-0 flex items-center pr-3 ${
              isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'
            } transition-colors duration-200`}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
            </svg>
          </button>
        )}
      </div>

      {/* Filter dropdown */}
      {showFilters && showFilterDropdown && (
        <div className={`absolute right-0 mt-2 w-56 ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } rounded-xl shadow-lg z-10 border`}>
          <div className="py-1">
            {filters.map((filter, index) => (
              <div key={index} className="px-4 py-2">
                <label className={`block text-sm font-medium mb-1 ${
                  isDark ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  {filter.label}
                </label>
                {filter.type === 'select' ? (
                  <select
                    value={filter.value || ''}
                    onChange={(e) => onFilterChange(filter.key, e.target.value)}
                    className={`w-full text-sm rounded px-2 py-1 ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white focus:ring-green-800 focus:border-green-800' 
                        : 'bg-white border-gray-300 text-gray-900 focus:ring-green-500 focus:border-green-500'
                    } border`}
                  >
                    <option value="">All</option>
                    {filter.options.map((option, optIndex) => (
                      <option key={optIndex} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={filter.type || 'text'}
                    value={filter.value || ''}
                    onChange={(e) => onFilterChange(filter.key, e.target.value)}
                    placeholder={filter.placeholder}
                    className={`w-full text-sm rounded px-2 py-1 ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-green-800 focus:border-green-800' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-green-500 focus:border-green-500'
                    } border`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;