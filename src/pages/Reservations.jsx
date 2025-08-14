import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import Modal from '../components/common/Modal';

const Reservations = () => {
  const { isDark } = useTheme();
  const [reservations, setReservations] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterBorrowerType, setFilterBorrowerType] = useState('');

  // Mock data based on reservations table
  useEffect(() => {
    setReservations([
      {
        reservation_id: 1,
        book_id: 1,
        book_title: 'Introduction to Computer Science',
        book_isbn: '9780123456789',
        borrower_type: 'student',
        borrower_id: 1,
        borrower_name: 'John Doe',
        borrower_identifier: 'STU001',
        reservation_date: '2025-01-10',
        status: 'active',
        expiry_date: '2025-01-17',
        notes: 'Needed for upcoming exam',
        position_in_queue: 1,
        estimated_availability: '2025-01-16'
      },
      {
        reservation_id: 2,
        book_id: 2,
        book_title: 'Advanced Mathematics',
        book_isbn: '9780987654321',
        borrower_type: 'teacher',
        borrower_id: 1,
        borrower_name: 'Mary Johnson',
        borrower_identifier: 'TCH001',
        reservation_date: '2025-01-08',
        status: 'fulfilled',
        expiry_date: '2025-01-15',
        notes: 'For lesson preparation',
        position_in_queue: 0,
        estimated_availability: null
      },
      {
        reservation_id: 3,
        book_id: 3,
        book_title: 'Physics Fundamentals',
        book_isbn: '9780456789123',
        borrower_type: 'student',
        borrower_id: 2,
        borrower_name: 'Jane Smith',
        borrower_identifier: 'STU002',
        reservation_date: '2025-01-05',
        status: 'expired',
        expiry_date: '2025-01-12',
        notes: '',
        position_in_queue: 0,
        estimated_availability: null
      }
    ]);
  }, []);

  const ReservationForm = ({ reservation, onClose, onSave }) => {
    const [formData, setFormData] = useState({
      book_identifier: reservation?.book_isbn || '',
      borrower_type: reservation?.borrower_type || 'student',
      borrower_identifier: reservation?.borrower_identifier || '',
      notes: reservation?.notes || '',
      expiry_date: reservation?.expiry_date || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
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
              Book ISBN or Title *
            </label>
            <input
              type="text"
              value={formData.book_identifier}
              onChange={(e) => setFormData({...formData, book_identifier: e.target.value})}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
              placeholder="ISBN or book title"
              required
            />
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
              Expiry Date
            </label>
            <input
              type="date"
              value={formData.expiry_date}
              onChange={(e) => setFormData({...formData, expiry_date: e.target.value})}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
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
            placeholder="Optional notes about the reservation..."
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
            {reservation ? 'Update Reservation' : 'Create Reservation'}
          </button>
        </div>
      </form>
    );
  };

  const getStatusBadge = (status) => {
    const badges = {
      active: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      fulfilled: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      cancelled: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
      expired: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
    };
    return badges[status] || badges.active;
  };

  const handleFulfillReservation = (reservation) => {
    console.log('Fulfilling reservation:', reservation);
    // API call to fulfill reservation and create checkout
  };

  const handleCancelReservation = (reservation) => {
    console.log('Cancelling reservation:', reservation);
    // API call to cancel reservation
  };

  const filteredReservations = reservations.filter(reservation => {
    const matchesSearch = reservation.book_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reservation.borrower_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reservation.borrower_identifier.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reservation.book_isbn.includes(searchTerm);
    const matchesStatus = !filterStatus || reservation.status === filterStatus;
    const matchesBorrowerType = !filterBorrowerType || reservation.borrower_type === filterBorrowerType;
    return matchesSearch && matchesStatus && matchesBorrowerType;
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Reservations</h1>
        <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Manage book reservations and holds</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className={`rounded-lg shadow-sm border p-6 ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/20">
              <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {reservations.filter(r => r.status === 'active').length}
              </p>
              <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Active</p>
            </div>
          </div>
        </div>

        <div className={`rounded-lg shadow-sm border p-6 ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/20">
              <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="ml-4">
              <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {reservations.filter(r => r.status === 'fulfilled').length}
              </p>
              <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Fulfilled</p>
            </div>
          </div>
        </div>

        <div className={`rounded-lg shadow-sm border p-6 ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-red-100 dark:bg-red-900/20">
              <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {reservations.filter(r => r.status === 'expired').length}
              </p>
              <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Expired</p>
            </div>
          </div>
        </div>

        <div className={`rounded-lg shadow-sm border p-6 ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900/20">
              <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {reservations.length}
              </p>
              <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Total</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className={`rounded-lg shadow-sm border p-6 mb-6 ${
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <input
              type="text"
              placeholder="Search reservations..."
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
              <option value="active">Active</option>
              <option value="fulfilled">Fulfilled</option>
              <option value="cancelled">Cancelled</option>
              <option value="expired">Expired</option>
            </select>
          </div>
          <div>
            <select
              value={filterBorrowerType}
              onChange={(e) => setFilterBorrowerType(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
            >
              <option value="">All Borrowers</option>
              <option value="student">Students</option>
              <option value="teacher">Teachers</option>
            </select>
          </div>
          <div>
            <button
              onClick={() => setShowAddModal(true)}
              className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500"
            >
              New Reservation
            </button>
          </div>
        </div>
      </div>

      {/* Reservations Table */}
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
              {filteredReservations.map((reservation) => (
                <tr key={reservation.reservation_id} className={isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {reservation.book_title}
                      </div>
                      <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                        ISBN: {reservation.book_isbn}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {reservation.borrower_name}
                      </div>
                      <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                        {reservation.borrower_type === 'student' ? 'Student' : 'Teacher'}: {reservation.borrower_identifier}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>
                      Reserved: {new Date(reservation.reservation_date).toLocaleDateString()}
                    </div>
                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Expires: {new Date(reservation.expiry_date).toLocaleDateString()}
                    </div>
                    {reservation.position_in_queue > 0 && (
                      <div className={`text-xs ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}>
                        Position #{reservation.position_in_queue} in queue
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(reservation.status)}`}>
                      {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                    </span>
                    {reservation.estimated_availability && (
                      <div className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        Est. available: {new Date(reservation.estimated_availability).toLocaleDateString()}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    {reservation.status === 'active' && (
                      <>
                        <button
                          onClick={() => handleFulfillReservation(reservation)}
                          className="text-green-600 hover:text-green-900"
                        >
                          Fulfill
                        </button>
                        <button
                          onClick={() => handleCancelReservation(reservation)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => {
                        setSelectedReservation(reservation);
                        setShowEditModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Reservation Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Create New Reservation"
      >
        <ReservationForm
          onClose={() => setShowAddModal(false)}
          onSave={(data) => {
            console.log('Creating reservation:', data);
            // Add API call here
          }}
        />
      </Modal>

      {/* Edit Reservation Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Reservation"
      >
        <ReservationForm
          reservation={selectedReservation}
          onClose={() => setShowEditModal(false)}
          onSave={(data) => {
            console.log('Updating reservation:', data);
            // Add API call here
          }}
        />
      </Modal>
    </div>
  );
};

export default Reservations;