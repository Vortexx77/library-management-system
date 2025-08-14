import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import Modal from '../components/common/Modal';

const Circulation = () => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('checkout');
  const [transactions, setTransactions] = useState([]);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [showRenewModal, setShowRenewModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [scanMode, setScanMode] = useState(false);

  // Mock data - replace with API calls
  useEffect(() => {
    setTransactions([
      {
        transaction_id: 1,
        copy_id: 1,
        book_title: 'Introduction to Computer Science',
        book_isbn: '9780123456789',
        barcode: 'BC001',
        borrower_type: 'student',
        borrower_id: 1,
        borrower_name: 'John Doe',
        borrower_identifier: 'STU001',
        borrowed_date: '2025-01-01',
        due_date: '2025-01-15',
        returned_date: null,
        renewed_count: 0,
        status: 'borrowed',
        issued_by_name: 'Mary Johnson',
        days_overdue: 0
      },
      {
        transaction_id: 2,
        copy_id: 2,
        book_title: 'Advanced Mathematics',
        book_isbn: '9780987654321',
        barcode: 'BC002',
        borrower_type: 'teacher',
        borrower_id: 1,
        borrower_name: 'Robert Wilson',
        borrower_identifier: 'TCH001',
        borrowed_date: '2024-12-20',
        due_date: '2025-01-03',
        returned_date: null,
        renewed_count: 1,
        status: 'overdue',
        issued_by_name: 'Mary Johnson',
        days_overdue: 11
      }
    ]);
  }, []);

  const CheckoutForm = ({ onClose, onSave }) => {
    const [formData, setFormData] = useState({
      barcode: '',
      borrower_type: 'student',
      borrower_identifier: '',
      due_date: '',
      notes: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(formData);
      onClose();
    };

    // Calculate default due date (14 days from now)
    useEffect(() => {
      const defaultDueDate = new Date();
      defaultDueDate.setDate(defaultDueDate.getDate() + 14);
      setFormData(prev => ({
        ...prev,
        due_date: defaultDueDate.toISOString().split('T')[0]
      }));
    }, []);

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
              Book Barcode *
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={formData.barcode}
                onChange={(e) => setFormData({...formData, barcode: e.target.value})}
                className={`flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                }`}
                placeholder="Scan or enter barcode"
                required
              />
              <button
                type="button"
                onClick={() => setScanMode(!scanMode)}
                className={`px-3 py-2 border rounded-lg ${
                  scanMode 
                    ? 'bg-green-600 text-white border-green-600' 
                    : `${isDark ? 'border-gray-600 text-gray-300' : 'border-gray-300 text-gray-700'}`
                }`}
              >
                📷
              </button>
            </div>
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
              Borrower Type *
            </label>
            <select
              value={formData.borrower_type}
              onChange={(e) => setFormData({...formData, borrower_type: e.target.value})}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
              required
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
              {formData.borrower_type === 'student' ? 'Admission Number' : 'Employee ID'} *
            </label>
            <input
              type="text"
              value={formData.borrower_identifier}
              onChange={(e) => setFormData({...formData, borrower_identifier: e.target.value})}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
              placeholder={formData.borrower_type === 'student' ? 'STU001' : 'TCH001'}
              required
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
              Due Date *
            </label>
            <input
              type="date"
              value={formData.due_date}
              onChange={(e) => setFormData({...formData, due_date: e.target.value})}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
              required
            />
          </div>
        </div>
        
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
            Notes
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
            rows={3}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
              isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
            }`}
            placeholder="Optional notes..."
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className={`px-4 py-2 border rounded-lg hover:bg-gray-50 ${
              isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700'
            }`}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500"
          >
            Check Out Book
          </button>
        </div>
      </form>
    );
  };

  const ReturnForm = ({ onClose, onSave }) => {
    const [formData, setFormData] = useState({
      barcode: '',
      condition: 'good',
      notes: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(formData);
      onClose();
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
              Book Barcode *
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={formData.barcode}
                onChange={(e) => setFormData({...formData, barcode: e.target.value})}
                className={`flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                }`}
                placeholder="Scan or enter barcode"
                required
              />
              <button
                type="button"
                onClick={() => setScanMode(!scanMode)}
                className={`px-3 py-2 border rounded-lg ${
                  scanMode 
                    ? 'bg-green-600 text-white border-green-600' 
                    : `${isDark ? 'border-gray-600 text-gray-300' : 'border-gray-300 text-gray-700'}`
                }`}
              >
                📷
              </button>
            </div>
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
              Book Condition
            </label>
            <select
              value={formData.condition}
              onChange={(e) => setFormData({...formData, condition: e.target.value})}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
            >
              <option value="new">New</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="damaged">Damaged</option>
            </select>
          </div>
        </div>
        
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
            Return Notes
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
            rows={3}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
              isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
            }`}
            placeholder="Any issues or notes about the returned book..."
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className={`px-4 py-2 border rounded-lg hover:bg-gray-50 ${
              isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700'
            }`}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
          >
            Return Book
          </button>
        </div>
      </form>
    );
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.book_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.borrower_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.borrower_identifier.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.barcode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !filterStatus || transaction.status === filterStatus;
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'checkout' && transaction.status === 'borrowed') ||
                      (activeTab === 'overdue' && transaction.status === 'overdue') ||
                      (activeTab === 'returned' && transaction.status === 'returned');
    return matchesSearch && matchesStatus && matchesTab;
  });

  const handleRenew = (transaction) => {
    setSelectedTransaction(transaction);
    setShowRenewModal(true);
  };

  const getStatusBadge = (status, daysOverdue) => {
    const baseClasses = "inline-flex px-2 py-1 text-xs font-semibold rounded-full";
    switch (status) {
      case 'borrowed':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'overdue':
        return `${baseClasses} bg-red-100 text-red-800`;
      case 'returned':
        return `${baseClasses} bg-gray-100 text-gray-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Circulation</h1>
        <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Manage book checkouts, returns, and renewals</p>
      </div>

      {/* Quick Actions */}
      <div className={`rounded-lg shadow-sm border p-6 mb-6 ${
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setShowCheckoutModal(true)}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Check Out Book
          </button>
          <button
            onClick={() => setShowReturnModal(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
            Return Book
          </button>
          <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            View Reservations
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className={`border-b mb-6 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <nav className="-mb-px flex space-x-8">
          {[
            { key: 'all', label: 'All Transactions', count: transactions.length },
            { key: 'checkout', label: 'Checked Out', count: transactions.filter(t => t.status === 'borrowed').length },
            { key: 'overdue', label: 'Overdue', count: transactions.filter(t => t.status === 'overdue').length },
            { key: 'returned', label: 'Recently Returned', count: transactions.filter(t => t.status === 'returned').length }
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
              {tab.label} ({tab.count})
            </button>
          ))}
        </nav>
      </div>

      {/* Search and Filters */}
      <div className={`rounded-lg shadow-sm border p-6 mb-6 ${
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300'
              }`}
            />
          </div>
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
            >
              <option value="">All Status</option>
              <option value="borrowed">Borrowed</option>
              <option value="overdue">Overdue</option>
              <option value="returned">Returned</option>
            </select>
          </div>
          <div></div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className={`rounded-lg shadow-sm border overflow-hidden ${
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className={isDark ? 'bg-gray-700' : 'bg-gray-50'}>
              <tr>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  isDark ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Book Details
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  isDark ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Borrower
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  isDark ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Dates
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  isDark ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Status
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  isDark ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.transaction_id} className={isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {transaction.book_title}
                      </div>
                      <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                        ISBN: {transaction.book_isbn}
                      </div>
                      <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-400'}`}>
                        Barcode: {transaction.barcode}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {transaction.borrower_name}
                      </div>
                      <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                        {transaction.borrower_type === 'student' ? 'Student' : 'Teacher'}
                      </div>
                      <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-400'}`}>
                        {transaction.borrower_identifier}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>
                      Borrowed: {new Date(transaction.borrowed_date).toLocaleDateString()}
                    </div>
                    <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                      Due: {new Date(transaction.due_date).toLocaleDateString()}
                    </div>
                    {transaction.returned_date && (
                      <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-400'}`}>
                        Returned: {new Date(transaction.returned_date).toLocaleDateString()}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getStatusBadge(transaction.status, transaction.days_overdue)}>
                      {transaction.status === 'overdue' ? `Overdue (${transaction.days_overdue} days)` : transaction.status}
                    </span>
                    {transaction.renewed_count > 0 && (
                      <div className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        Renewed {transaction.renewed_count} time(s)
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    {transaction.status === 'borrowed' || transaction.status === 'overdue' ? (
                      <>
                        <button
                          onClick={() => handleRenew(transaction)}
                          className="text-blue-600 hover:text-blue-900"
                          disabled={transaction.renewed_count >= 2}
                        >
                          Renew
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          Return
                        </button>
                      </>
                    ) : (
                      <button className="text-gray-600 hover:text-gray-900">
                        View Details
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Checkout Modal */}
      <Modal
        isOpen={showCheckoutModal}
        onClose={() => setShowCheckoutModal(false)}
        title="Check Out Book"
      >
        <CheckoutForm
          onClose={() => setShowCheckoutModal(false)}
          onSave={(data) => {
            console.log('Checking out book:', data);
            // Add API call here
          }}
        />
      </Modal>

      {/* Return Modal */}
      <Modal
        isOpen={showReturnModal}
        onClose={() => setShowReturnModal(false)}
        title="Return Book"
      >
        <ReturnForm
          onClose={() => setShowReturnModal(false)}
          onSave={(data) => {
            console.log('Returning book:', data);
            // Add API call here
          }}
        />
      </Modal>

      {/* Renew Modal */}
      <Modal
        isOpen={showRenewModal}
        onClose={() => setShowRenewModal(false)}
        title="Renew Book"
      >
        {selectedTransaction && (
          <div className="space-y-4">
            <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {selectedTransaction.book_title}
              </h4>
              <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Borrowed by: {selectedTransaction.borrower_name}
              </p>
              <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Current due date: {new Date(selectedTransaction.due_date).toLocaleDateString()}
              </p>
              <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Renewals used: {selectedTransaction.renewed_count}/2
              </p>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowRenewModal(false)}
                className={`px-4 py-2 border rounded-lg hover:bg-gray-50 ${
                  isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  console.log('Renewing book:', selectedTransaction);
                  setShowRenewModal(false);
                }}
                disabled={selectedTransaction.renewed_count >= 2}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Renew for 14 Days
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Circulation;