import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import Modal from '../components/common/Modal';

const LostBooks = () => {
    const { isDark } = useTheme();
    const [lostBooks, setLostBooks] = useState([]);
    const [showReportModal, setShowReportModal] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedLostBook, setSelectedLostBook] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filterBorrowerType, setFilterBorrowerType] = useState('');

    // Mock data based on lost_books table
    useEffect(() => {
        setLostBooks([
            {
                lost_book_id: 1,
                transaction_id: 101,
                copy_id: 1,
                book_title: 'Introduction to Computer Science',
                book_isbn: '9780123456789',
                borrower_type: 'student',
                borrower_id: 1,
                borrower_name: 'John Doe',
                borrower_identifier: 'STU001',
                reported_date: '2025-01-10',
                replacement_cost: 45990,
                payment_status: 'pending',
                payment_date: null,
                replacement_received: false,
                replacement_date: null,
                notes: 'Book reported lost by student',
                reported_by_name: 'Mary Johnson',
                contact_phone: '+256712345678',
                days_since_reported: 4
            },
            {
                lost_book_id: 2,
                transaction_id: 102,
                copy_id: 2,
                book_title: 'Advanced Mathematics',
                book_isbn: '9780987654321',
                borrower_type: 'student',
                borrower_id: 2,
                borrower_name: 'Jane Smith',
                borrower_identifier: 'STU002',
                reported_date: '2025-01-05',
                replacement_cost: 52500,
                payment_status: 'paid',
                payment_date: '2025-01-12',
                replacement_received: true,
                replacement_date: '2025-01-13',
                notes: 'Payment received, replacement book provided',
                reported_by_name: 'Mary Johnson',
                contact_phone: '+256734567890',
                days_since_reported: 9
            },
            {
                lost_book_id: 3,
                transaction_id: 103,
                copy_id: 3,
                book_title: 'Physics Fundamentals',
                book_isbn: '9780456789123',
                borrower_type: 'teacher',
                borrower_id: 1,
                borrower_name: 'Robert Wilson',
                borrower_identifier: 'TCH001',
                reported_date: '2024-12-28',
                replacement_cost: 38750,
                payment_status: 'waived',
                payment_date: null,
                replacement_received: false,
                replacement_date: null,
                notes: 'Payment waived due to special circumstances',
                reported_by_name: 'Admin User',
                contact_phone: '+256756789012',
                days_since_reported: 17
            }
        ]);
    }, []);

    const ReportLostBookForm = ({ onClose, onSave }) => {
        const [formData, setFormData] = useState({
            transaction_id: '',
            replacement_cost: '',
            notes: ''
        });

        const handleSubmit = (e) => {
            e.preventDefault();
            onSave(formData);
            onClose();
        };

        return (
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
                        Transaction ID *
                    </label>
                    <input
                        type="number"
                        value={formData.transaction_id}
                        onChange={(e) => setFormData({ ...formData, transaction_id: e.target.value })}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                            }`}
                        placeholder="Enter transaction ID"
                        required
                    />
                    <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        The ID of the borrowing transaction for the lost book
                    </p>
                </div>

                <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
                        Replacement Cost (UGX) *
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        value={formData.replacement_cost}
                        onChange={(e) => setFormData({ ...formData, replacement_cost: e.target.value })}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                            }`}
                        placeholder="0.00"
                        required
                    />
                </div>

                <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
                        Notes
                    </label>
                    <textarea
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        rows={3}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                            }`}
                        placeholder="Details about the lost book..."
                    />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className={`px-4 py-2 border rounded-lg hover:bg-gray-50 ${isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700'
                            }`}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500"
                    >
                        Report Lost Book
                    </button>
                </div>
            </form>
        );
    };

    const PaymentForm = ({ lostBook, onClose, onSave }) => {
        const [formData, setFormData] = useState({
            payment_status: lostBook?.payment_status || 'pending',
            payment_date: lostBook?.payment_date || new Date().toISOString().split('T')[0],
            replacement_received: lostBook?.replacement_received || false,
            replacement_date: lostBook?.replacement_date || '',
            notes: lostBook?.notes || ''
        });

        const handleSubmit = (e) => {
            e.preventDefault();
            onSave(formData);
            onClose();
        };

        return (
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {lostBook?.book_title}
                    </h4>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        Borrower: {lostBook?.borrower_name} ({lostBook?.borrower_identifier})
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        Replacement Cost: UGX {lostBook?.replacement_cost?.toLocaleString()}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
                            Payment Status *
                        </label>
                        <select
                            value={formData.payment_status}
                            onChange={(e) => setFormData({ ...formData, payment_status: e.target.value })}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                                }`}
                            required
                        >
                            <option value="pending">Pending</option>
                            <option value="paid">Paid</option>
                            <option value="waived">Waived</option>
                        </select>
                    </div>
                    <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
                            Payment Date
                        </label>
                        <input
                            type="date"
                            value={formData.payment_date}
                            onChange={(e) => setFormData({ ...formData, payment_date: e.target.value })}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                                }`}
                            disabled={formData.payment_status === 'pending'}
                        />
                    </div>
                </div>

                <div className="flex items-center space-x-3">
                    <input
                        type="checkbox"
                        id="replacement_received"
                        checked={formData.replacement_received}
                        onChange={(e) => setFormData({ ...formData, replacement_received: e.target.checked })}
                        className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <label htmlFor="replacement_received" className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-700'}`}>
                        Replacement book received
                    </label>
                </div>

                {formData.replacement_received && (
                    <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
                            Replacement Date
                        </label>
                        <input
                            type="date"
                            value={formData.replacement_date}
                            onChange={(e) => setFormData({ ...formData, replacement_date: e.target.value })}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                                }`}
                        />
                    </div>
                )}

                <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
                        Notes
                    </label>
                    <textarea
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        rows={3}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                            }`}
                        placeholder="Payment and replacement notes..."
                    />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className={`px-4 py-2 border rounded-lg hover:bg-gray-50 ${isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700'
                            }`}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500"
                    >
                        Update Status
                    </button>
                </div>
            </form>
        );
    };

    const getStatusBadge = (status) => {
        const badges = {
            pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
            paid: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
            waived: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
        };
        return badges[status] || badges.pending;
    };

    const filteredLostBooks = lostBooks.filter(book => {
        const matchesSearch = book.book_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.borrower_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.borrower_identifier.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.book_isbn.includes(searchTerm);
        const matchesStatus = !filterStatus || book.payment_status === filterStatus;
        const matchesBorrowerType = !filterBorrowerType || book.borrower_type === filterBorrowerType;
        return matchesSearch && matchesStatus && matchesBorrowerType;
    });

    const totalOutstanding = lostBooks
        .filter(book => book.payment_status === 'pending')
        .reduce((sum, book) => sum + book.replacement_cost, 0);

    const totalPaid = lostBooks
        .filter(book => book.payment_status === 'paid')
        .reduce((sum, book) => sum + book.replacement_cost, 0);

    return (
        <div>
            <div className="mb-6">
                <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Lost Books</h1>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Manage lost books and replacement costs</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <div className={`rounded-lg shadow-sm border p-6 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                    }`}>
                    <div className="flex items-center">
                        <div className="p-3 rounded-lg bg-red-100 dark:bg-red-900/20">
                            <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                {lostBooks.length}
                            </p>
                            <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Total Lost</p>
                        </div>
                    </div>
                </div>

                <div className={`rounded-lg shadow-sm border p-6 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                    }`}>
                    <div className="flex items-center">
                        <div className="p-3 rounded-lg bg-yellow-100 dark:bg-yellow-900/20">
                            <svg className="w-6 h-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                UGX {totalOutstanding.toLocaleString()}
                            </p>
                            <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Outstanding</p>
                        </div>
                    </div>
                </div>

                <div className={`rounded-lg shadow-sm border p-6 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                    }`}>
                    <div className="flex items-center">
                        <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/20">
                            <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                UGX {totalPaid.toLocaleString()}
                            </p>
                            <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Collected</p>
                        </div>
                    </div>
                </div>

                <div className={`rounded-lg shadow-sm border p-6 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                    }`}>
                    <div className="flex items-center">
                        <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/20">
                            <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                {lostBooks.filter(book => book.replacement_received).length}
                            </p>
                            <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Replaced</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and Filters */}
            <div className={`rounded-lg shadow-sm border p-6 mb-6 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Search lost books..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300'
                                }`}
                        />
                    </div>
                    <div>
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                                }`}
                        >
                            <option value="">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="paid">Paid</option>
                            <option value="waived">Waived</option>
                        </select>
                    </div>
                    <div>
                        <select
                            value={filterBorrowerType}
                            onChange={(e) => setFilterBorrowerType(e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                                }`}
                        >
                            <option value="">All Borrowers</option>
                            <option value="student">Students</option>
                            <option value="teacher">Teachers</option>
                        </select>
                    </div>
                    <div>
                        <button
                            onClick={() => setShowReportModal(true)}
                            className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500"
                        >
                            Report Lost Book
                        </button>
                    </div>
                </div>
            </div>

            {/* Lost Books Table */}
            <div className={`rounded-lg shadow-sm border overflow-hidden ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className={isDark ? 'bg-gray-700' : 'bg-gray-50'}>
                            <tr>
                                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'
                                    }`}>
                                    Book Details
                                </th>
                                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'
                                    }`}>
                                    Borrower
                                </th>
                                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'
                                    }`}>
                                    Cost & Status
                                </th>
                                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'
                                    }`}>
                                    Dates
                                </th>
                                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'
                                    }`}>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className={`divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
                            {filteredLostBooks.map((book) => (
                                <tr key={book.lost_book_id} className={isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                                {book.book_title}
                                            </div>
                                            <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                                                ISBN: {book.book_isbn}
                                            </div>
                                            <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-400'}`}>
                                                Transaction #{book.transaction_id}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                                {book.borrower_name}
                                            </div>
                                            <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                                                {book.borrower_type === 'student' ? 'Student' : 'Teacher'}: {book.borrower_identifier}
                                            </div>
                                            <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-400'}`}>
                                                {book.contact_phone}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                            UGX {book.replacement_cost.toLocaleString()}
                                        </div>
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(book.payment_status)}`}>
                                            {book.payment_status.charAt(0).toUpperCase() + book.payment_status.slice(1)}
                                        </span>
                                        {book.replacement_received && (
                                            <div className={`text-xs mt-1 ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                                                ✓ Replacement received
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>
                                            Reported: {new Date(book.reported_date).toLocaleDateString()}
                                        </div>
                                        {book.payment_date && (
                                            <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                                Paid: {new Date(book.payment_date).toLocaleDateString()}
                                            </div>
                                        )}
                                        <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                            {book.days_since_reported} days ago
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                        <button
                                            onClick={() => {
                                                setSelectedLostBook(book);
                                                setShowPaymentModal(true);
                                            }}
                                            className="text-green-600 hover:text-green-900"
                                        >
                                            Update Status
                                        </button>
                                        <button className="text-blue-600 hover:text-blue-900">
                                            Contact
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Report Lost Book Modal */}
            <Modal
                isOpen={showReportModal}
                onClose={() => setShowReportModal(false)}
                title="Report Lost Book"
            >
                <ReportLostBookForm
                    onClose={() => setShowReportModal(false)}
                    onSave={(data) => {
                        console.log('Reporting lost book:', data);
                        // Add API call here
                    }}
                />
            </Modal>

            {/* Payment Status Modal */}
            <Modal
                isOpen={showPaymentModal}
                onClose={() => setShowPaymentModal(false)}
                title="Update Payment Status"
            >
                <PaymentForm
                    lostBook={selectedLostBook}
                    onClose={() => setShowPaymentModal(false)}
                    onSave={(data) => {
                        console.log('Updating payment status:', data);
                        // Add API call here
                    }}
                />
            </Modal>
        </div>
    );
};

export default LostBooks;