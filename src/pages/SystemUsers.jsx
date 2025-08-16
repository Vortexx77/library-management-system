import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import Modal from '../components/common/Modal';
import axios from 'axios';

const API_URL = 'http://localhost/library-api/api';

const SystemUsers = () => {
  const { theme } = useTheme();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  // Add the missing getAuthToken function
  const getAuthToken = () => {
    return localStorage.getItem('authToken');
  };

  // Helper function to get authorization headers
  const getAuthHeaders = () => {
    const token = getAuthToken();
    if (!token) {
      throw new Error('No authentication token found. Please log in.');
    }
    
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      console.log('Fetching users from:', `${API_URL}/users`);
      
      const response = await axios.get(`${API_URL}/users`, { 
        headers: getAuthHeaders()
      });
      
      console.log('API Response:', response.data);
      
      const userData = response.data.users || response.data.data || response.data || [];
      setUsers(Array.isArray(userData) ? userData : []);
      
    } catch (err) {
      console.error('Fetch error:', err);
      if (err.response) {
        console.error('Response data:', err.response.data);
        console.error('Response status:', err.response.status);
        setError(`Failed to fetch users: ${err.response.status} - ${err.response.data?.message || 'Server error'}`);
      } else if (err.request) {
        setError('Failed to connect to the API. Please make sure the server is running.');
      } else if (err.message === 'No authentication token found. Please log in.') {
        setError('Authentication required. Please log in to access this page.');
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(user => {
      const matchesSearch = (user.full_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (user.username || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (user.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (user.department || '').toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = !filterRole || user.role === filterRole;
      const matchesStatus = !filterStatus || (filterStatus === 'active' ? user.is_active : !user.is_active);
      return matchesSearch && matchesRole && matchesStatus;
    });
    setFilteredUsers(filtered);
  }, [users, searchTerm, filterRole, filterStatus]);

  const handleAddUser = async (newUser) => {
    try {
      const response = await axios.post(`${API_URL}/users`, newUser, { 
        headers: getAuthHeaders()
      });
      
      if (response.data.success) {
        fetchUsers();
        setShowAddModal(false);
        alert('User added successfully!');
      } else {
        alert('Failed to add user: ' + (response.data.errors?.join(', ') || 'Unknown error'));
      }
    } catch (err) {
      console.error('Add user error:', err);
      if (err.message === 'No authentication token found. Please log in.') {
        alert('Authentication required. Please log in.');
      } else {
        alert('An error occurred while adding the user: ' + (err.response?.data?.message || err.message));
      }
    }
  };

  const handleUpdateUser = async (updatedUser) => {
    try {
      const { user_id, confirm_password, ...updateData } = updatedUser;
      
      if (!updateData.password) {
        delete updateData.password;
      }
      
      console.log('Updating user:', user_id, updateData);
      
      const response = await axios.put(`${API_URL}/users/${user_id}`, updateData, { 
        headers: getAuthHeaders()
      });
      
      if (response.data.success) {
        fetchUsers();
        setShowEditModal(false);
        setSelectedUser(null);
        alert('User updated successfully!');
      } else {
        alert('Failed to update user: ' + (response.data.errors?.join(', ') || 'Unknown error'));
      }
    } catch (err) {
      console.error('Update user error:', err);
      if (err.message === 'No authentication token found. Please log in.') {
        alert('Authentication required. Please log in.');
      } else {
        alert('An error occurred while updating the user: ' + (err.response?.data?.message || err.message));
      }
    }
  };

  const handleToggleStatus = async (userId, currentStatus) => {
    try {
      const userToUpdate = users.find(u => u.user_id === userId);
      if (!userToUpdate) {
        alert('User not found');
        return;
      }
      
      const updateData = { 
        full_name: userToUpdate.full_name,
        email: userToUpdate.email,
        role: userToUpdate.role,
        is_active: !currentStatus,
        phone: userToUpdate.phone,
        department: userToUpdate.department
      };
      
      const response = await axios.put(`${API_URL}/users/${userId}`, updateData, { 
        headers: getAuthHeaders()
      });
      
      if (response.data.success) {
        fetchUsers();
        alert(`User ${!currentStatus ? 'activated' : 'deactivated'} successfully!`);
      } else {
        alert('Failed to update user status: ' + (response.data.errors?.join(', ') || 'Unknown error'));
      }
    } catch (err) {
      console.error('Toggle status error:', err);
      if (err.message === 'No authentication token found. Please log in.') {
        alert('Authentication required. Please log in.');
      } else {
        alert('An error occurred while toggling user status: ' + (err.response?.data?.message || err.message));
      }
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const getRoleBadge = (role) => {
    const badges = {
      super_admin: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
      admin: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
      librarian: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      assistant: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
    };
    return badges[role] || badges.assistant;
  };

  const formatRole = (role) => {
    return role.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <header className={`shadow-sm ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              System Users Management
            </h1>
            <button 
              onClick={fetchUsers}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
            >
              Refresh
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Filters and Search */}
        <div className="mb-6 p-4 rounded-lg bg-white dark:bg-gray-800 shadow">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input 
              type="text"
              placeholder="Search by name, username, email, department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300'
              }`}
            />
            <select 
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300'
              }`}
            >
              <option value="">All Roles</option>
              <option value="super_admin">Super Admin</option>
              <option value="admin">Admin</option>
              <option value="librarian">Librarian</option>
              <option value="assistant">Assistant</option>
            </select>
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300'
              }`}
            >
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <button 
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 flex items-center gap-2 justify-center"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add User
            </button>
          </div>
        </div>

        {/* Users Summary */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <div className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>Total Users</div>
                <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{users.length}</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <div className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>Active Users</div>
                <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {users.filter(u => u.is_active).length}
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <div className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>Admins</div>
                <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {users.filter(u => u.role === 'admin' || u.role === 'super_admin').length}
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <div className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>Librarians</div>
                <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {users.filter(u => u.role === 'librarian').length}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className={`bg-white rounded-lg shadow overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : ''}`}>
          {isLoading && (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Loading users...</p>
            </div>
          )}
          
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
                  <button 
                    onClick={fetchUsers}
                    className="mt-2 text-sm bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-3 py-1 rounded hover:bg-red-200 dark:hover:bg-red-900/50"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {!isLoading && !error && (
            <>
              {filteredUsers.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <tr>
                        <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                          User
                        </th>
                        <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                          Role & Department
                        </th>
                        <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                          Contact
                        </th>
                        <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                          Status
                        </th>
                        <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                          Dates
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${theme === 'dark' ? 'divide-gray-700' : 'divide-gray-200'}`}>
                      {filteredUsers.map((user) => (
                        <tr key={user.user_id} className={`${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img 
                                  className="h-10 w-10 rounded-full" 
                                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.full_name || user.username)}&background=6366f1&color=fff`} 
                                  alt={user.full_name || user.username} 
                                />
                              </div>
                              <div className="ml-4">
                                <div className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                  {user.full_name || 'N/A'}
                                </div>
                                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                  @{user.username}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleBadge(user.role)}`}>
                              {formatRole(user.role)}
                            </span>
                            {user.department && (
                              <div className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                {user.department}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}`}>
                              {user.email || 'N/A'}
                            </div>
                            {user.phone && (
                              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                {user.phone}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              user.is_active 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                                : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                            }`}>
                              {user.is_active ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            <div>Joined: {new Date(user.created_at).toLocaleDateString()}</div>
                            {user.last_login && (
                              <div>Last: {new Date(user.last_login).toLocaleDateString()}</div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center justify-end gap-2">
                              <button 
                                onClick={() => handleEditUser(user)} 
                                className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 px-2 py-1 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20"
                              >
                                Edit
                              </button>
                              <button 
                                onClick={() => handleToggleStatus(user.user_id, user.is_active)}
                                className={`px-2 py-1 rounded ${user.is_active 
                                    ? 'text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20'
                                    : 'text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/20'
                                }`}
                              >
                                {user.is_active ? 'Deactivate' : 'Activate'}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className={`text-center py-12 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium">No users found</h3>
                  <p className="mt-1 text-sm">
                    {users.length === 0 
                      ? 'No users in the system yet. Add the first user to get started.'
                      : 'Try adjusting your search or filter criteria.'
                    }
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Add User Modal */}
        <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add New User">
          <SystemUserForm onSave={handleAddUser} onClose={() => setShowAddModal(false)} />
        </Modal>

        {/* Edit User Modal */}
        {selectedUser && (
          <Modal isOpen={showEditModal} onClose={() => { setShowEditModal(false); setSelectedUser(null); }} title="Edit User">
            <SystemUserForm user={selectedUser} onSave={handleUpdateUser} onClose={() => { setShowEditModal(false); setSelectedUser(null); }} />
          </Modal>
        )}
      </main>
    </div>
  );
};

const SystemUserForm = ({ user, onClose, onSave }) => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    username: '',
    full_name: '',
    email: '',
    phone: '',
    department: '',
    role: 'assistant',
    password: '',
    confirm_password: '',
    is_active: true
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
        setFormData({
            username: user.username || '',
            full_name: user.full_name || '',
            email: user.email || '',
            phone: user.phone || '',
            department: user.department || '',
            role: user.role || 'assistant',
            password: '',
            confirm_password: '',
            is_active: user.is_active ?? true
        });
    } else {
        setFormData({
            username: '',
            full_name: '',
            email: '',
            phone: '',
            department: '',
            role: 'assistant',
            password: '',
            confirm_password: '',
            is_active: true
        });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
    }
    
    if (!formData.full_name.trim()) {
      newErrors.full_name = 'Full name is required';
    } else if (formData.full_name.length < 2) {
      newErrors.full_name = 'Full name must be at least 2 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!user && !formData.password) {
      newErrors.password = 'Password is required for new users';
    } else if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password && formData.password !== formData.confirm_password) {
      newErrors.confirm_password = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const dataToSave = { ...formData };
      
      if (user) {
        dataToSave.user_id = user.user_id;
      }
      
      // Remove password fields if password is empty (for updates)
      if (!dataToSave.password) {
        delete dataToSave.password;
        delete dataToSave.confirm_password;
      } else {
        // Remove confirm_password as it's not needed by the API
        delete dataToSave.confirm_password;
      }
      
      await onSave(dataToSave);
    } catch (err) {
      console.error('Form submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            Username *
          </label>
          <input 
            type="text" 
            name="username" 
            value={formData.username} 
            onChange={handleChange}
            disabled={!!user}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
            } ${user ? 'opacity-60 cursor-not-allowed' : ''}`} 
          />
          {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
        </div>
        <div>
          <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            Full Name *
          </label>
          <input 
            type="text" 
            name="full_name" 
            value={formData.full_name} 
            onChange={handleChange} 
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
            }`} 
          />
          {errors.full_name && <p className="text-red-500 text-xs mt-1">{errors.full_name}</p>}
        </div>
      </div>

      <div>
        <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          Email *
        </label>
        <input 
          type="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
          }`} 
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            Phone
          </label>
          <input 
            type="tel" 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange} 
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300'
            }`} 
          />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            Department
          </label>
          <input 
            type="text" 
            name="department" 
            value={formData.department} 
            onChange={handleChange} 
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300'
            }`} 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            Role *
          </label>
          <select 
            name="role" 
            value={formData.role} 
            onChange={handleChange} 
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
            }`}
          >
            <option value="assistant">Assistant</option>
            <option value="librarian">Librarian</option>
            <option value="admin">Admin</option>
            <option value="super_admin">Super Admin</option>
          </select>
        </div>
        {user && (
          <div>
            <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Status
            </label>
            <div className="mt-1 flex items-center">
              <input
                type="checkbox"
                name="is_active"
                checked={formData.is_active}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className={`ml-2 block text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                User is active
              </label>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            Password {user ? '(leave blank to keep unchanged)' : '*'}
          </label>
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
            }`} 
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
        </div>
        <div>
          <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            Confirm Password
          </label>
          <input 
            type="password" 
            name="confirm_password" 
            value={formData.confirm_password} 
            onChange={handleChange} 
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
            }`} 
          />
          {errors.confirm_password && <p className="text-red-500 text-xs mt-1">{errors.confirm_password}</p>}
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-600">
        <button 
          type="button" 
          onClick={onClose}
          disabled={isSubmitting}
          className={`px-4 py-2 rounded-md border ${
            theme === 'dark' 
              ? 'bg-gray-600 text-white hover:bg-gray-500 border-gray-500' 
              : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
          } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Cancel
        </button>
        <button 
          type="submit"
          disabled={isSubmitting}
          className={`px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 flex items-center gap-2 ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting && (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          )}
          {user ? 'Update User' : 'Create User'}
        </button>
      </div>
    </form>
  );
};

export default SystemUsers;