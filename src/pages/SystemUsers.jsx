import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import Modal from '../components/common/Modal';

const SystemUsers = () => {
  const { isDark } = useTheme();
  const [systemUsers, setSystemUsers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  // Mock data based on users table - Enhanced with more comprehensive data
  useEffect(() => {
    setSystemUsers([
      {
        user_id: 1,
        username: 'admin',
        full_name: 'System Administrator',
        email: 'admin@school.edu',
        role: 'admin',
        is_active: true,
        created_at: '2024-01-15T10:00:00Z',
        last_login: '2025-01-14T14:30:00Z',
        phone: '+256-700-123456',
        department: 'IT Administration'
      },
      {
        user_id: 2,
        username: 'librarian1',
        full_name: 'Mary Johnson',
        email: 'mary.johnson@school.edu',
        role: 'librarian',
        is_active: true,
        created_at: '2024-02-01T09:00:00Z',
        last_login: '2025-01-14T16:45:00Z',
        phone: '+256-700-234567',
        department: 'Library Services'
      },
      {
        user_id: 3,
        username: 'assistant1',
        full_name: 'John Smith',
        email: 'john.smith@school.edu',
        role: 'assistant',
        is_active: true,
        created_at: '2024-03-10T11:00:00Z',
        last_login: '2025-01-13T10:15:00Z',
        phone: '+256-700-345678',
        department: 'Library Support'
      },
      {
        user_id: 4,
        username: 'librarian2',
        full_name: 'Sarah Wilson',
        email: 'sarah.wilson@school.edu',
        role: 'librarian',
        is_active: true,
        created_at: '2024-04-20T08:30:00Z',
        last_login: '2025-01-14T09:15:00Z',
        phone: '+256-700-456789',
        department: 'Digital Resources'
      },
      {
        user_id: 5,
        username: 'assistant2',
        full_name: 'David Brown',
        email: 'david.brown@school.edu',
        role: 'assistant',
        is_active: false,
        created_at: '2024-05-10T14:20:00Z',
        last_login: '2024-12-15T11:30:00Z',
        phone: '+256-700-567890',
        department: 'Circulation Desk'
      },
      {
        user_id: 6,
        username: 'admin2',
        full_name: 'Robert Taylor',
        email: 'robert.taylor@school.edu',
        role: 'admin',
        is_active: true,
        created_at: '2024-06-01T12:00:00Z',
        last_login: '2025-01-14T13:45:00Z',
        phone: '+256-700-678901',
        department: 'System Administration'
      }
    ]);
  }, []);

  const handleAddUser = () => {
    setSelectedUser(null);
    setShowAddModal(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleToggleUserStatus = (user) => {
    setSystemUsers(systemUsers.map(u => 
      u.user_id === user.user_id 
        ? { ...u, is_active: !u.is_active }
        : u
    ));
  };

  const filteredUsers = systemUsers.filter(user => {
    const matchesSearch = user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !filterRole || user.role === filterRole;
    const matchesStatus = !filterStatus || (filterStatus === 'active' ? user.is_active : !user.is_active);
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleBadge = (role) => {
    const badges = {
      admin: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
      librarian: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      assistant: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
    };
    return badges[role] || badges.assistant;
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            System Users
          </h1>
          <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Manage administrators, librarians, and assistants who have access to the library management system
          </p>
          
          {/* Role Descriptions */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-4 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 bg-purple-600 rounded-full mr-2"></div>
                <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Administrators</h3>
              </div>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Full system access including user management, system settings, and all library operations
              </p>
            </div>
            <div className={`p-4 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 bg-blue-600 rounded-full mr-2"></div>
                <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Librarians</h3>
              </div>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Manage books, handle circulation, process reservations, and generate reports
              </p>
            </div>
            <div className={`p-4 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 bg-green-600 rounded-full mr-2"></div>
                <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Assistants</h3>
              </div>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Basic circulation operations, book checkout/return, and student assistance
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Administrators
                </p>
                <p className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {systemUsers.filter(u => u.role === 'admin').length}
                </p>
                <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  {systemUsers.filter(u => u.role === 'admin' && u.is_active).length} active
                </p>
              </div>
            </div>
          </div>

          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="ml-4">
                <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Librarians
                </p>
                <p className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {systemUsers.filter(u => u.role === 'librarian').length}
                </p>
                <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  {systemUsers.filter(u => u.role === 'librarian' && u.is_active).length} active
                </p>
              </div>
            </div>
          </div>

          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Assistants
                </p>
                <p className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {systemUsers.filter(u => u.role === 'assistant').length}
                </p>
                <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  {systemUsers.filter(u => u.role === 'assistant' && u.is_active).length} active
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search users..."
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
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className={`px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
            >
              <option value="">All Roles</option>
              <option value="admin">Administrator</option>
              <option value="librarian">Librarian</option>
              <option value="assistant">Assistant</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={`px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
            >
              <option value="">All Status</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
            </select>
          </div>
          <button
            onClick={handleAddUser}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 flex items-center gap-2"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add User
          </button>
        </div>

        {/* Users Table */}
        <div className={`bg-white rounded-lg shadow overflow-hidden ${isDark ? 'bg-gray-800' : ''}`}>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className={`${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <tr>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    isDark ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    User
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    isDark ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    Role & Department
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    isDark ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    Contact
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    isDark ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    Status
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    isDark ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    Last Login
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    isDark ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'bg-gray-800 divide-gray-700' : 'bg-white divide-gray-200'}`}>
                {filteredUsers.map((user) => (
                  <tr key={user.user_id} className={`hover:${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                            user.role === 'admin' ? 'bg-purple-100 text-purple-600' :
                            user.role === 'librarian' ? 'bg-blue-100 text-blue-600' :
                            'bg-green-100 text-green-600'
                          } ${isDark ? 'bg-opacity-20' : ''}`}>
                            {user.full_name.charAt(0).toUpperCase()}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {user.full_name}
                          </div>
                          <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            @{user.username}
                          </div>
                          <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleBadge(user.role)}`}>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                        <div className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {user.department}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>
                        {user.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.is_active 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                      }`}>
                        {user.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {user.last_login ? new Date(user.last_login).toLocaleDateString() : 'Never'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditUser(user)}
                          className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleToggleUserStatus(user)}
                          className={`${
                            user.is_active 
                              ? 'text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300'
                              : 'text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300'
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
        </div>

        {filteredUsers.length === 0 && (
          <div className={`text-center py-12 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium">No users found</h3>
            <p className="mt-1 text-sm">Try adjusting your search or filter criteria.</p>
          </div>
        )}

        {/* Add User Modal */}
        <Modal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          title="Add New System User"
        >
          <SystemUserForm
            onClose={() => setShowAddModal(false)}
            onSave={(userData) => {
              const newUser = {
                user_id: Math.max(...systemUsers.map(u => u.user_id)) + 1,
                ...userData,
                is_active: true,
                created_at: new Date().toISOString(),
                last_login: null
              };
              setSystemUsers([...systemUsers, newUser]);
            }}
          />
        </Modal>

        {/* Edit User Modal */}
        <Modal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          title="Edit System User"
        >
          <SystemUserForm
            user={selectedUser}
            onClose={() => setShowEditModal(false)}
            onSave={(userData) => {
              setSystemUsers(systemUsers.map(u => 
                u.user_id === selectedUser.user_id 
                  ? { ...u, ...userData }
                  : u
              ));
            }}
          />
        </Modal>
      </div>
    </div>
  );
};

const SystemUserForm = ({ user, onClose, onSave }) => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    username: user?.username || '',
    full_name: user?.full_name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    department: user?.department || '',
    role: user?.role || 'assistant',
    password: '',
    confirm_password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
      alert('Passwords do not match');
      return;
    }
    onSave(formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
            Username *
          </label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
              isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
            }`}
            required
          />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
            Full Name *
          </label>
          <input
            type="text"
            value={formData.full_name}
            onChange={(e) => setFormData({...formData, full_name: e.target.value})}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
              isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
            }`}
            required
          />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
            Email *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
              isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
            }`}
            required
          />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
            Role *
          </label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({...formData, role: e.target.value})}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
              isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
            }`}
            required
          >
            <option value="assistant">Assistant</option>
            <option value="librarian">Librarian</option>
            <option value="admin">Administrator</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
            Phone Number
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
              isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
            }`}
            placeholder="+256-700-123456"
          />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
            Department
          </label>
          <select
            value={formData.department}
            onChange={(e) => setFormData({...formData, department: e.target.value})}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
              isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
            }`}
          >
            <option value="">Select Department</option>
            <option value="IT Administration">IT Administration</option>
            <option value="System Administration">System Administration</option>
            <option value="Library Services">Library Services</option>
            <option value="Digital Resources">Digital Resources</option>
            <option value="Library Support">Library Support</option>
            <option value="Circulation Desk">Circulation Desk</option>
            <option value="Reference Services">Reference Services</option>
            <option value="Technical Services">Technical Services</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
            Password {!user && '*'}
          </label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
              isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
            }`}
            required={!user}
            placeholder={user ? 'Leave blank to keep current password' : ''}
          />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
            Confirm Password {!user && '*'}
          </label>
          <input
            type="password"
            value={formData.confirm_password}
            onChange={(e) => setFormData({...formData, confirm_password: e.target.value})}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
              isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
            }`}
            required={!user}
          />
        </div>
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
          {user ? 'Update User' : 'Add User'}
        </button>
      </div>
    </form>
  );
};

export default SystemUsers;