import React from 'react';

const Circulation = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Circulation</h1>
        <p className="text-gray-600">Manage book checkouts, returns, and renewals</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Circulation Management</h3>
          <p className="mt-1 text-sm text-gray-500">
            Book circulation features will be implemented here.
          </p>
          <div className="mt-6 space-x-4">
            <button className="btn-primary">
              Check Out Book
            </button>
            <button className="btn-secondary">
              Return Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Circulation;