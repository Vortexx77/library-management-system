import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import Modal from '../components/common/Modal';

const Books = () => {
  const { isDark } = useTheme();
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterType, setFilterType] = useState('');

  // Mock data - replace with API calls
  useEffect(() => {
    setBooks([
      {
        book_id: 1,
        isbn: '9780123456789',
        title: 'Introduction to Computer Science',
        author: 'John Smith',
        publisher_name: 'Tech Publications',
        category_name: 'Computer Science',
        publication_year: 2023,
        edition: '5th',
        language: 'English',
        pages: 450,
        book_type: 'textbook',
        total_copies: 5,
        available_copies: 3,
        location: 'A-101',
        replacement_cost: 45990
      },
      {
        book_id: 2,
        isbn: '9780987654321',
        title: 'Advanced Mathematics',
        author: 'Jane Doe',
        publisher_name: 'Academic Press',
        category_name: 'Mathematics',
        publication_year: 2022,
        edition: '3rd',
        language: 'English',
        pages: 680,
        book_type: 'textbook',
        total_copies: 8,
        available_copies: 6,
        location: 'B-205',
        replacement_cost: 52500
      }
    ]);

    setCategories([
      { category_id: 1, category_name: 'Computer Science' },
      { category_id: 2, category_name: 'Mathematics' },
      { category_id: 3, category_name: 'Physics' },
      { category_id: 4, category_name: 'Literature' }
    ]);

    setPublishers([
      { publisher_id: 1, publisher_name: 'Tech Publications' },
      { publisher_id: 2, publisher_name: 'Academic Press' },
      { publisher_id: 3, publisher_name: 'Educational Books Ltd' }
    ]);
  }, []);

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.isbn.includes(searchTerm);
    const matchesCategory = !filterCategory || book.category_name === filterCategory;
    const matchesType = !filterType || book.book_type === filterType;
    return matchesSearch && matchesCategory && matchesType;
  });

  const handleAddBook = () => {
    setSelectedBook(null);
    setShowAddModal(true);
  };

  const handleEditBook = (book) => {
    setSelectedBook(book);
    setShowEditModal(true);
  };

  const BookForm = ({ book, onClose, onSave }) => {
    const [formData, setFormData] = useState({
      isbn: book?.isbn || '',
      title: book?.title || '',
      subtitle: book?.subtitle || '',
      author: book?.author || '',
      co_authors: book?.co_authors || '',
      publisher_id: book?.publisher_id || '',
      category_id: book?.category_id || '',
      publication_year: book?.publication_year || new Date().getFullYear(),
      edition: book?.edition || '',
      language: book?.language || 'English',
      pages: book?.pages || '',
      description: book?.description || '',
      location: book?.location || '',
      replacement_cost: book?.replacement_cost || '',
      book_type: book?.book_type || 'textbook',
      total_copies: book?.total_copies || 1
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
              ISBN
            </label>
            <input
              type="text"
              value={formData.isbn}
              onChange={(e) => setFormData({...formData, isbn: e.target.value})}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
              placeholder="978-0-123456-78-9"
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
              required
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
              Author *
            </label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) => setFormData({...formData, author: e.target.value})}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
              required
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
              Category
            </label>
            <select
              value={formData.category_id}
              onChange={(e) => setFormData({...formData, category_id: e.target.value})}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat.category_id} value={cat.category_id}>{cat.category_name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
              Publisher
            </label>
            <select
              value={formData.publisher_id}
              onChange={(e) => setFormData({...formData, publisher_id: e.target.value})}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
            >
              <option value="">Select Publisher</option>
              {publishers.map(pub => (
                <option key={pub.publisher_id} value={pub.publisher_id}>{pub.publisher_name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
              Book Type
            </label>
            <select
              value={formData.book_type}
              onChange={(e) => setFormData({...formData, book_type: e.target.value})}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
            >
              <option value="textbook">Textbook</option>
              <option value="reference">Reference</option>
              <option value="novel">Novel</option>
              <option value="magazine">Magazine</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
              Publication Year
            </label>
            <input
              type="number"
              value={formData.publication_year}
              onChange={(e) => setFormData({...formData, publication_year: e.target.value})}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
              min="1900"
              max={new Date().getFullYear() + 1}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
              Edition
            </label>
            <input
              type="text"
              value={formData.edition}
              onChange={(e) => setFormData({...formData, edition: e.target.value})}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
              placeholder="1st, 2nd, 3rd..."
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
              Pages
            </label>
            <input
              type="number"
              value={formData.pages}
              onChange={(e) => setFormData({...formData, pages: e.target.value})}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
              min="1"
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
              placeholder="A-101, B-205..."
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
              Replacement Cost
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.replacement_cost}
              onChange={(e) => setFormData({...formData, replacement_cost: e.target.value})}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
              placeholder="0.00"
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
              Total Copies
            </label>
            <input
              type="number"
              value={formData.total_copies}
              onChange={(e) => setFormData({...formData, total_copies: e.target.value})}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
              min="1"
            />
          </div>
        </div>
        
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            rows={3}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
              isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
            }`}
            placeholder="Brief description of the book..."
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
            {book ? 'Update Book' : 'Add Book'}
          </button>
        </div>
      </form>
    );
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Books</h1>
        <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Manage your library catalog</p>
      </div>

      {/* Search and Filters */}
      <div className={`rounded-lg shadow-sm border p-6 mb-6 ${
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <input
              type="text"
              placeholder="Search books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300'
              }`}
            />
          </div>
          <div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat.category_id} value={cat.category_name}>{cat.category_name}</option>
              ))}
            </select>
          </div>
          <div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
            >
              <option value="">All Types</option>
              <option value="textbook">Textbook</option>
              <option value="reference">Reference</option>
              <option value="novel">Novel</option>
              <option value="magazine">Magazine</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <button
              onClick={handleAddBook}
              className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500"
            >
              Add New Book
            </button>
          </div>
        </div>
      </div>

      {/* Books Table */}
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
                  Category/Type
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  isDark ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Copies
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  isDark ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Location
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  isDark ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-200'}`}>
              {filteredBooks.map((book) => (
                <tr key={book.book_id} className={isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {book.title}
                      </div>
                      <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                        by {book.author}
                      </div>
                      <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-400'}`}>
                        ISBN: {book.isbn}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>
                      {book.category_name}
                    </div>
                    <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {book.book_type}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>
                      {book.available_copies}/{book.total_copies}
                    </div>
                    <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Available/Total
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>
                      {book.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleEditBook(book)}
                      className="text-green-600 hover:text-green-900"
                    >
                      Edit
                    </button>
                    <button className="text-blue-600 hover:text-blue-900">
                      View Copies
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Book Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Book"
      >
        <BookForm
          onClose={() => setShowAddModal(false)}
          onSave={(data) => {
            console.log('Adding book:', data);
            // Add API call here
          }}
        />
      </Modal>

      {/* Edit Book Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Book"
      >
        <BookForm
          book={selectedBook}
          onClose={() => setShowEditModal(false)}
          onSave={(data) => {
            console.log('Updating book:', data);
            // Add API call here
          }}
        />
      </Modal>
    </div>
  );
};

export default Books;