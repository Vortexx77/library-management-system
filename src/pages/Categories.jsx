import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import Modal from '../components/common/Modal';

const Categories = () => {
  const { isDark } = useTheme();
  const [categories, setCategories] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [activeTab, setActiveTab] = useState('categories');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data based on categories and publishers tables
  useEffect(() => {
    setCategories([
      {
        category_id: 1,
        category_name: 'Computer Science',
        description: 'Books related to programming, algorithms, and computer technology',
        book_count: 45,
        created_at: '2024-01-15T10:00:00Z'
      },
      {
        category_id: 2,
        category_name: 'Mathematics',
        description: 'Mathematical textbooks and reference materials',
        book_count: 67,
        created_at: '2024-01-20T09:00:00Z'
      },
      {
        category_id: 3,
        category_name: 'Literature',
        description: 'Fiction, poetry, and literary analysis',
        book_count: 89,
        created_at: '2024-02-01T11:00:00Z'
      },
      {
        category_id: 4,
        category_name: 'Science',
        description: 'Physics, Chemistry, Biology textbooks',
        book_count: 78,
        created_at: '2024-02-10T14:00:00Z'
      },
      {
        category_id: 5,
        category_name: 'History',
        description: 'Historical texts and reference materials',
        book_count: 34,
        created_at: '2024-02-15T16:00:00Z'
      }
    ]);

    setPublishers([
      {
        publisher_id: 1,
        publisher_name: 'Fountain Publishers',
        address: 'Plot 55, Nkrumah Road, Kampala, Uganda',
        contact_info: '+256414251160, info@fountainpublishers.co.ug',
        book_count: 23,
        created_at: '2024-01-10T10:00:00Z'
      },
      {
        publisher_id: 2,
        publisher_name: 'Longhorn Publishers',
        address: 'Plot 16, Kampala Road, Kampala, Uganda',
        contact_info: '+256414344736, uganda@longhornpublishers.com',
        book_count: 45,
        created_at: '2024-01-15T09:00:00Z'
      },
      {
        publisher_id: 3,
        publisher_name: 'MK Publishers',
        address: 'Plot 82, Buganda Road, Kampala, Uganda',
        contact_info: '+256414250902, info@mkpublishers.co.ug',
        book_count: 31,
        created_at: '2024-01-20T11:00:00Z'
      },
      {
        publisher_id: 4,
        publisher_name: 'East African Educational Publishers',
        address: 'Plot 45, Jinja Road, Kampala, Uganda',
        contact_info: '+256414220023, eaep@eaep.co.ug',
        book_count: 67,
        created_at: '2024-02-01T14:00:00Z'
      }
    ]);
  }, []);

  const handleAdd = () => {
    setSelectedItem(null);
    setShowAddModal(true);
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setShowEditModal(true);
  };

  const handleDelete = (item) => {
    if (window.confirm(`Are you sure you want to delete this ${activeTab.slice(0, -1)}?`)) {
      if (activeTab === 'categories') {
        setCategories(categories.filter(c => c.category_id !== item.category_id));
      } else {
        setPublishers(publishers.filter(p => p.publisher_id !== item.publisher_id));
      }
    }
  };

  const CategoryForm = ({ category, onClose, onSave }) => {
    const [formData, setFormData] = useState({
      category_name: category?.category_name || '',
      description: category?.description || ''
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
            Category Name *
          </label>
          <input
            type="text"
            value={formData.category_name}
            onChange={(e) => setFormData({...formData, category_name: e.target.value})}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
              isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
            }`}
            required
          />
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
            {category ? 'Update Category' : 'Add Category'}
          </button>
        </div>
      </form>
    );
  };

  const PublisherForm = ({ publisher, onClose, onSave }) => {
    const [formData, setFormData] = useState({
      publisher_name: publisher?.publisher_name || '',
      address: publisher?.address || '',
      contact_info: publisher?.contact_info || ''
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
            Publisher Name *
          </label>
          <input
            type="text"
            value={formData.publisher_name}
            onChange={(e) => setFormData({...formData, publisher_name: e.target.value})}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
              isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
            }`}
            required
          />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
            Address
          </label>
          <textarea
            value={formData.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
            rows={2}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
              isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
            }`}
          />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
            Contact Information
          </label>
          <input
            type="text"
            value={formData.contact_info}
            onChange={(e) => setFormData({...formData, contact_info: e.target.value})}
            placeholder="Phone, Email, Website"
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
            {publisher ? 'Update Publisher' : 'Add Publisher'}
          </button>
        </div>
      </form>
    );
  };

  const filteredCategories = categories.filter(category =>
    category.category_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPublishers = publishers.filter(publisher =>
    publisher.publisher_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    publisher.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    publisher.contact_info.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Categories & Publishers
          </h1>
          <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Manage book categories and publisher information
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('categories')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'categories'
                    ? 'border-green-500 text-green-600 dark:text-green-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Categories ({categories.length})
              </button>
              <button
                onClick={() => setActiveTab('publishers')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'publishers'
                    ? 'border-green-500 text-green-600 dark:text-green-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                Publishers ({publishers.length})
              </button>
            </nav>
          </div>
        </div>

        {/* Controls */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative">
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
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
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 flex items-center gap-2"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add {activeTab === 'categories' ? 'Category' : 'Publisher'}
          </button>
        </div>        {/*
 Content */}
        {activeTab === 'categories' ? (
          <div className={`bg-white rounded-lg shadow overflow-hidden ${isDark ? 'bg-gray-800' : ''}`}>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className={`${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <tr>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDark ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      Category
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDark ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      Description
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDark ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      Books
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDark ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      Created
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDark ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDark ? 'bg-gray-800 divide-gray-700' : 'bg-white divide-gray-200'}`}>
                  {filteredCategories.map((category) => (
                    <tr key={category.category_id} className={`hover:${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`flex-shrink-0 h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center ${
                            isDark ? 'bg-green-900/20' : ''
                          }`}>
                            <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a1.994 1.994 0 01-1.414.586H7a4 4 0 01-4-4V7a4 4 0 014-4z" />
                            </svg>
                          </div>
                          <div className="ml-4">
                            <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {category.category_name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className={`px-6 py-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        <div className="max-w-xs truncate">
                          {category.description || 'No description'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          isDark ? 'bg-green-900/20 text-green-400' : 'bg-green-100 text-green-800'
                        }`}>
                          {category.book_count} books
                        </span>
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {new Date(category.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(category)}
                            className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(category)}
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
        ) : (
          <div className={`bg-white rounded-lg shadow overflow-hidden ${isDark ? 'bg-gray-800' : ''}`}>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className={`${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <tr>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDark ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      Publisher
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDark ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      Address
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDark ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      Contact
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDark ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      Books
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDark ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDark ? 'bg-gray-800 divide-gray-700' : 'bg-white divide-gray-200'}`}>
                  {filteredPublishers.map((publisher) => (
                    <tr key={publisher.publisher_id} className={`hover:${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`flex-shrink-0 h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center ${
                            isDark ? 'bg-blue-900/20' : ''
                          }`}>
                            <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </div>
                          <div className="ml-4">
                            <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {publisher.publisher_name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className={`px-6 py-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        <div className="max-w-xs truncate">
                          {publisher.address || 'No address'}
                        </div>
                      </td>
                      <td className={`px-6 py-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        <div className="max-w-xs truncate">
                          {publisher.contact_info || 'No contact info'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          isDark ? 'bg-blue-900/20 text-blue-400' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {publisher.book_count} books
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(publisher)}
                            className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(publisher)}
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
        )}

        {/* Empty State */}
        {((activeTab === 'categories' && filteredCategories.length === 0) ||
          (activeTab === 'publishers' && filteredPublishers.length === 0)) && (
          <div className={`text-center py-12 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a1.994 1.994 0 01-1.414.586H7a4 4 0 01-4-4V7a4 4 0 014-4z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium">No {activeTab} found</h3>
            <p className="mt-1 text-sm">Try adjusting your search criteria.</p>
          </div>
        )}

        {/* Add Modal */}
        <Modal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          title={`Add New ${activeTab === 'categories' ? 'Category' : 'Publisher'}`}
        >
          {activeTab === 'categories' ? (
            <CategoryForm
              onClose={() => setShowAddModal(false)}
              onSave={(categoryData) => {
                const newCategory = {
                  category_id: Math.max(...categories.map(c => c.category_id)) + 1,
                  ...categoryData,
                  book_count: 0,
                  created_at: new Date().toISOString()
                };
                setCategories([...categories, newCategory]);
              }}
            />
          ) : (
            <PublisherForm
              onClose={() => setShowAddModal(false)}
              onSave={(publisherData) => {
                const newPublisher = {
                  publisher_id: Math.max(...publishers.map(p => p.publisher_id)) + 1,
                  ...publisherData,
                  book_count: 0,
                  created_at: new Date().toISOString()
                };
                setPublishers([...publishers, newPublisher]);
              }}
            />
          )}
        </Modal>

        {/* Edit Modal */}
        <Modal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          title={`Edit ${activeTab === 'categories' ? 'Category' : 'Publisher'}`}
        >
          {activeTab === 'categories' ? (
            <CategoryForm
              category={selectedItem}
              onClose={() => setShowEditModal(false)}
              onSave={(categoryData) => {
                setCategories(categories.map(c => 
                  c.category_id === selectedItem.category_id 
                    ? { ...c, ...categoryData }
                    : c
                ));
              }}
            />
          ) : (
            <PublisherForm
              publisher={selectedItem}
              onClose={() => setShowEditModal(false)}
              onSave={(publisherData) => {
                setPublishers(publishers.map(p => 
                  p.publisher_id === selectedItem.publisher_id 
                    ? { ...p, ...publisherData }
                    : p
                ));
              }}
            />
          )}
        </Modal>
      </div>
    </div>
  );
};

export default Categories;