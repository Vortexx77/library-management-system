import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import Modal from '../components/common/Modal';

const BookCopies = () => {
  const { isDark } = useTheme();
  const [bookCopies, setBookCopies] = useState([]);
  const [books, setBooks] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCopy, setSelectedCopy] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCondition, setFilterCondition] = useState('');
  const [filterAvailability, setFilterAvailability] = useState('');

  // Mock data based on book_copies table
  useEffect(() => {
    setBooks([
      { book_id: 1, title: 'Introduction to Computer Science', isbn: '9780123456789' },
      { book_id: 2, title: 'Advanced Mathematics', isbn: '9780987654321' },
      { book_id: 3, title: 'Physics Principles', isbn: '9781234567890' },
      { book_id: 4, title: 'Chemistry Fundamentals', isbn: '9780987123456' }
    ]);

    setBookCopies([
      {
        copy_id: 1,
        book_id: 1,
        book_title: 'Introduction to Computer Science',
        book_isbn: '9780123456789',
        copy_number: '001',
        barcode: 'BC001',
        condition_status: 'good',
        acquisition_date: '2024-01-15',
        notes: 'First copy acquired',
        is_available: true,
        current_borrower: null,
        created_at: '2024-01-15T10:00:00Z'
      },
      {
        copy_id: 2,
        book_id: 1,
        book_title: 'Introduction to Computer Science',
        book_isbn: '9780123456789',
        copy_number: '002',
        barcode: 'BC002',
        condition_status: 'good',
        acquisition_date: '2024-01-15',
        notes: 'Second copy acquired',
        is_available: false,
        current_borrower: 'John Doe (STU001)',
        created_at: '2024-01-15T10:00:00Z'
      },
      {
        copy_id: 3,
        book_id: 2,
        book_title: 'Advanced Mathematics',
        book_isbn: '9780987654321',
        copy_number: '001',
        barcode: 'BC003',
        condition_status: 'new',
        acquisition_date: '2024-02-01',
        notes: 'Recently purchased',
        is_available: true,
        current_borrower: null,
        created_at: '2024-02-01T09:00:00Z'
      },
      {
        copy_id: 4,
        book_id: 2,
        book_title: 'Advanced Mathematics',
        book_isbn: '9780987654321',
        copy_number: '002',
        barcode: 'BC004',
        condition_status: 'fair',
        acquisition_date: '2024-01-20',
        notes: 'Shows some wear',
        is_available: false,
        current_borrower: 'Mary Smith (TCH001)',
        created_at: '2024-01-20T11:00:00Z'
      },
      {
        copy_id: 5,
        book_id: 3,
        book_title: 'Physics Principles',
        book_isbn: '9781234567890',
        copy_number: '001',
        barcode: 'BC005',
        condition_status: 'damaged',
        acquisition_date: '2023-12-10',
        notes: 'Cover damaged, needs repair',
        is_available: false,
        current_borrower: null,
        created_at: '2023-12-10T14:00:00Z'
      }
    ]);
  }, []);

  const handleAddCopy = () => {
    setSelectedCopy(null);
    setShowAddModal(true);
  };

  const handleEditCopy = (copy) => {
    setSelectedCopy(copy);
    setShowEditModal(true);
  };

  const handleDeleteCopy = (copy) => {
    if (window.confirm('Are you sure you want to delete this book copy?')) {
      setBookCopies(bookCopies.filter(c => c.copy_id !== copy.copy_id));
    }
  };

  const BookCopyForm = ({ copy, onClose, onSave }) => {
    const [formData, setFormData] = useState({
      book_id: copy?.book_id || '',
      copy_number: copy?.copy_number || '',
      barcode: copy?.barcode || '',
      condition_status: copy?.condition_status || 'good',
      acquisition_date: copy?.acquisition_date || new Date().toISOString().split('T')[0],
      notes: copy?.notes || ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      const selectedBook = books.find(b => b.book_id === parseInt(formData.book_id));
      const copyData = {
        ...formData,
        book_id: parseInt(formData.book_id),
        book_title: selectedBook?.title || '',
        book_isbn: selectedBook?.isbn || '',
        is_available: true,
        current_borrower: null
      };
      onSave(copyData);
      onClose();
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
              Book *
            </label>
            <select
              value={formData.book_id}
              onChange={(e) => setFormData({...formData, book_id: e.target.value})}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
              required
            >
              <option value="">Select a book</option>
              {books.map(book => (
                <option key={book.book_id} value={book.book_id}>
                  {book.title} ({book.isbn})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
              Copy Number *
            </label>
            <input
              type="text"
              value={formData.copy_number}
              onChange={(e) => setFormData({...formData, copy_number: e.target.value})}
              placeholder="001, 002, etc."
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
              required
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
              Barcode
            </label>
            <input
              type="text"
              value={formData.barcode}
              onChange={(e) => setFormData({...formData, barcode: e.target.value})}
              placeholder="BC001, BC002, etc."
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
              Condition *
            </label>
            <select
              value={formData.condition_status}
              onChange={(e) => setFormData({...formData, condition_status: e.target.value})}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
              required
            >
              <option value="new">New</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="damaged">Damaged</option>
              <option value="lost">Lost</option>
            </select>
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
              Acquisition Date
            </label>
            <input
              type="date"
              value={formData.acquisition_date}
              onChange={(e) => setFormData({...formData, acquisition_date: e.target.value})}
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
            {copy ? 'Update Copy' : 'Add Copy'}
          </button>
        </div>
      </form>
    );
  };

  const filteredCopies = bookCopies.filter(copy => {
    const matchesSearch = copy.book_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         copy.book_isbn.includes(searchTerm) ||
                         copy.barcode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         copy.copy_number.includes(searchTerm);
    const matchesCondition = !filterCondition || copy.condition_status === filterCondition;
    const matchesAvailability = !filterAvailability || 
                               (filterAvailability === 'available' && copy.is_available) ||
                               (filterAvailability === 'checked_out' && !copy.is_available);
    return matchesSearch && matchesCondition && matchesAvailability;
  });

  const getConditionBadge = (condition) => {
    const badges = {
      new: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      good: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      fair: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      damaged: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
      lost: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    };
    return badges[condition] || badges.good;
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Book Copies
          </h1>
          <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Manage individual book copies and their conditions
          </p>
        </div>

        {/* Controls */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search copies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                  isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                }`}
              />
              <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <select
              value={filterCondition}
              onChange={(e) => setFilterCondition(e.target.value)}
              className={`px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
            >
              <option value="">All Conditions</option>
              <option value="new">New</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="damaged">Damaged</option>
              <option value="lost">Lost</option>
            </select>
            <select
              value={filterAvailability}
              onChange={(e) => setFilterAvailability(e.target.value)}
              className={`px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
            >
              <option value="">All Status</option>
              <option value="available">Available</option>
              <option value="checked_out">Checked Out</option>
            </select>
          </div>
          <button
            onClick={handleAddCopy}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 flex items-center gap-2"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Copy
          </button>
        </div>   
     {/* Copies Table */}
        <div className={`bg-white rounded-lg shadow overflow-hidden ${isDark ? 'bg-gray-800' : ''}`}>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className={`${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <tr>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    isDark ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    Book & Copy
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    isDark ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    Barcode
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    isDark ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    Condition
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    isDark ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    Status
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    isDark ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    Acquired
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    isDark ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'bg-gray-800 divide-gray-700' : 'bg-white divide-gray-200'}`}>
                {filteredCopies.map((copy) => (
                  <tr key={copy.copy_id} className={`hover:${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`flex-shrink-0 h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center ${
                          isDark ? 'bg-green-900/20' : ''
                        }`}>
                          <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {copy.book_title}
                          </div>
                          <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Copy #{copy.copy_number} • ISBN: {copy.book_isbn}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-mono ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>
                        {copy.barcode || 'No barcode'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getConditionBadge(copy.condition_status)}`}>
                        {copy.condition_status.charAt(0).toUpperCase() + copy.condition_status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          copy.is_available 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                            : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                        }`}>
                          {copy.is_available ? 'Available' : 'Checked Out'}
                        </span>
                        {copy.current_borrower && (
                          <div className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {copy.current_borrower}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {copy.acquisition_date ? new Date(copy.acquisition_date).toLocaleDateString() : 'Unknown'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditCopy(copy)}
                          className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteCopy(copy)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredCopies.length === 0 && (
          <div className={`text-center py-12 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <h3 className="mt-2 text-sm font-medium">No book copies found</h3>
            <p className="mt-1 text-sm">Try adjusting your search or filter criteria.</p>
          </div>
        )}

        {/* Add Copy Modal */}
        <Modal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          title="Add New Book Copy"
        >
          <BookCopyForm
            onClose={() => setShowAddModal(false)}
            onSave={(copyData) => {
              const newCopy = {
                copy_id: Math.max(...bookCopies.map(c => c.copy_id)) + 1,
                ...copyData,
                created_at: new Date().toISOString()
              };
              setBookCopies([...bookCopies, newCopy]);
            }}
          />
        </Modal>

        {/* Edit Copy Modal */}
        <Modal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          title="Edit Book Copy"
        >
          <BookCopyForm
            copy={selectedCopy}
            onClose={() => setShowEditModal(false)}
            onSave={(copyData) => {
              setBookCopies(bookCopies.map(c => 
                c.copy_id === selectedCopy.copy_id 
                  ? { ...c, ...copyData }
                  : c
              ));
            }}
          />
        </Modal>
      </div>
    </div>
  );
};

export default BookCopies;