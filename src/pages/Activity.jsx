import React from 'react';
import RecentActivity from '../components/dashboard/RecentActivity';

const Activity = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy-800">Library Activity</h1>
        <p className="text-sage-600">Track all library transactions and activities</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Activity Feed */}
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
        
        {/* Activity Summary */}
        <div className="lg:col-span-1">
          <div className="bg-soft-white rounded-2xl shadow-sm border border-sage-200 p-6">
            <h3 className="text-xl font-semibold text-navy-800 mb-6">Activity Summary</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-sage-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-navy-600 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <span className="text-navy-800 font-medium">Today's Checkouts</span>
                </div>
                <span className="text-navy-600 font-bold">24</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-sage-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-sage-500 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                    </svg>
                  </div>
                  <span className="text-navy-800 font-medium">Today's Returns</span>
                </div>
                <span className="text-navy-600 font-bold">18</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-sage-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-navy-500 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <span className="text-navy-800 font-medium">Renewals</span>
                </div>
                <span className="text-navy-600 font-bold">7</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-navy-800 font-medium">Overdue Items</span>
                </div>
                <span className="text-red-600 font-bold">3</span>
              </div>
            </div>
            
            {/* Quick Filters */}
            <div className="mt-6 pt-6 border-t border-sage-200">
              <h4 className="text-sm font-medium text-navy-800 mb-3">Filter by Activity</h4>
              <div className="flex flex-wrap gap-2">
                <button className="px-3 py-1 bg-navy-100 text-navy-700 rounded-full text-xs font-medium hover:bg-navy-200 transition-colors">
                  All
                </button>
                <button className="px-3 py-1 bg-sage-100 text-sage-700 rounded-full text-xs font-medium hover:bg-sage-200 transition-colors">
                  Checkouts
                </button>
                <button className="px-3 py-1 bg-sage-100 text-sage-700 rounded-full text-xs font-medium hover:bg-sage-200 transition-colors">
                  Returns
                </button>
                <button className="px-3 py-1 bg-sage-100 text-sage-700 rounded-full text-xs font-medium hover:bg-sage-200 transition-colors">
                  Renewals
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activity;