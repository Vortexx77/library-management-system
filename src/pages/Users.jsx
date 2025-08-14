import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import Modal from '../components/common/Modal';

const Users = () => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('students');
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Enhanced mock data based on database schema
  useEffect(() => {
    setStudents([
      {
        student_id: 1,
        admission_number: 'STU001',
        first_name: 'John',
        last_name: 'Doe',
        class: 'Form 4',
        stream: 'A',
        date_of_birth: '2007-03-15',
        contact_phone: '+256-712-345678',
        parent_contact: '+256-701-234567',
        address: 'Kampala, Uganda',
        enrollment_date: '2021-02-01',
        is_active: true,
        current_loans: 2,
        overdue_books: 0
      },
      {
        student_id: 2,
        admission_number: 'STU002',
        first_name: 'Jane',
        last_name: 'Smith',
        class: 'Form 3',
        stream: 'B',
        date_of_birth: '2008-07-22',
        contact_phone: '+256-734-567890',
        parent_contact: '+256-702-345678',
        address: 'Entebbe, Uganda',
        enrollment_date: '2022-02-01',
        is_active: true,
        current_loans: 1,
        overdue_books: 1
      },
      {
        student_id: 3,
        admission_number: 'STU003',
        first_name: 'Alice',
        last_name: 'Johnson',
        class: 'Form 2',
        stream: 'A',
        date_of_birth: '2009-11-08',
        contact_phone: '+256-756-789012',
        parent_contact: '+256-703-456789',
        address: 'Jinja, Uganda',
        enrollment_date: '2023-02-01',
        is_active: true,
        current_loans: 3,
        overdue_books: 0
      },
      {
        student_id: 4,
        admission_number: 'STU004',
        first_name: 'Michael',
        last_name: 'Brown',
        class: 'Form 1',
        stream: 'C',
        date_of_birth: '2010-05-12',
        contact_phone: '+256-778-901234',
        parent_contact: '+256-704-567890',
        address: 'Mbarara, Uganda',
        enrollment_date: '2024-02-01',
        is_active: true,
        current_loans: 1,
        overdue_books: 0
      },
      {
        student_id: 5,
        admission_number: 'STU005',
        first_name: 'Sarah',
        last_name: 'Wilson',
        class: 'Form 4',
        stream: 'B',
        date_of_birth: '2007-09-30',
        contact_phone: '+256-790-123456',
        parent_contact: '+256-705-678901',
        address: 'Gulu, Uganda',
        enrollment_date: '2021-02-01',
        is_active: false,
        current_loans: 0,
        overdue_books: 0
      }
    ]);

    setTeachers([
      {
        teacher_id: 1,
        employee_id: 'TCH001',
        first_name: 'Mary',
        last_name: 'Johnson',
        title: 'Mrs.',
        department: 'Mathematics',
        subjects_taught: 'Mathematics, Statistics',
        contact_phone: '+256-712-111222',
        email: 'mary.johnson@school.edu',
        address: 'Kampala, Uganda',
        hire_date: '2020-01-15',
        is_active: true,
        current_loans: 5,
        overdue_books: 0
      },
      {
        teacher_id: 2,
        employee_id: 'TCH002',
        first_name: 'Robert',
        last_name: 'Wilson',
        title: 'Mr.',
        department: 'Science',
        subjects_taught: 'Physics, Chemistry',
        contact_phone: '+256-734-222333',
        email: 'robert.wilson@school.edu',
        address: 'Entebbe, Uganda',
        hire_date: '2019-08-20',
        is_active: true,
        current_loans: 8,
        overdue_books: 1
      },
      {
        teacher_id: 3,
        employee_id: 'TCH003',
        first_name: 'Sarah',
        last_name: 'Brown',
        title: 'Ms.',
        department: 'Languages',
        subjects_taught: 'English, Literature',
        contact_phone: '+256-756-333444',
        email: 'sarah.brown@school.edu',
        address: 'Jinja, Uganda',
        hire_date: '2021-03-10',
        is_active: true,
        current_loans: 3,
        overdue_books: 0
      },
      {
        teacher_id: 4,
        employee_id: 'TCH004',
        first_name: 'David',
        last_name: 'Taylor',
        title: 'Dr.',
        department: 'History',
        subjects_taught: 'History, Geography',
        contact_phone: '+256-778-444555',
        email: 'david.taylor@school.edu',
        address: 'Mbarara, Uganda',
        hire_date: '2018-06-01',
        is_active: true,
        current_loans: 10,
        overdue_books: 0
      },
      {
        teacher_id: 5,
        employee_id: 'TCH005',
        first_name: 'Linda',
        last_name: 'Davis',
        title: 'Mrs.',
        department: 'Science',
        subjects_taught: 'Biology, Environmental Science',
        contact_phone: '+256-790-555666',
        email: 'linda.davis@school.edu',
        address: 'Gulu, Uganda',
        hire_date: '2022-01-20',
        is_active: false,
        current_loans: 0,
        overdue_books: 0
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
    if (activeTab === 'students') {
      setStudents(students.map(s =>
        s.student_id === user.student_id
          ? { ...s, is_active: !s.is_active }
          : s
      ));
    } else {
      setTeachers(teachers.map(t =>
        t.teacher_id === user.teacher_id
          ? { ...t, is_active: !t.is_active }
          : t
      ));
    }
  };

  const filteredUsers = (activeTab === 'students' ? students : teachers).filter(user => {
    const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
    const searchFields = activeTab === 'students'
      ? [fullName, user.admission_number.toLowerCase(), user.class.toLowerCase(), user.stream.toLowerCase()]
      : [fullName, user.employee_id.toLowerCase(), user.department.toLowerCase(), user.email.toLowerCase()];

    const matchesSearch = !searchTerm || searchFields.some(field => field.includes(searchTerm.toLowerCase()));

    const matchesClassOrDept = activeTab === 'students'
      ? !filterClass || user.class === filterClass
      : !filterDepartment || user.department === filterDepartment;

    const matchesStatus = !filterStatus || (filterStatus === 'active' ? user.is_active : !user.is_active);

    return matchesSearch && matchesClassOrDept && matchesStatus;
  });

  const getUniqueClasses = () => [...new Set(students.map(s => s.class))].sort();
  const getUniqueDepartments = () => [...new Set(teachers.map(t => t.department))].sort();

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Library Users
          </h1>
          <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Manage students and teachers who have access to library resources
          </p>
        </div>

        {/* Enhanced Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="ml-4">
                <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Students
                </p>
                <p className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {students.length}
                </p>
                <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  {students.filter(s => s.is_active).length} active
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
                  Teachers
                </p>
                <p className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {teachers.length}
                </p>
                <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  {teachers.filter(t => t.is_active).length} active
                </p>
              </div>
            </div>
          </div>

          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-yellow-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="ml-4">
                <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Total Loans
                </p>
                <p className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {[...students, ...teachers].reduce((sum, user) => sum + (user.current_loans || 0), 0)}
                </p>
                <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  Active borrowings
                </p>
              </div>
            </div>
          </div>

          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Overdue Books
                </p>
                <p className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {[...students, ...teachers].reduce((sum, user) => sum + (user.overdue_books || 0), 0)}
                </p>
                <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  Need attention
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => {
                setActiveTab('students');
                setSearchTerm('');
                setFilterClass('');
                setFilterDepartment('');
                setFilterStatus('');
              }}
              className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${activeTab === 'students'
                ? 'border-green-500 text-green-600'
                : `border-transparent ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`
                }`}
            >
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span>Students ({students.length})</span>
              </div>
            </button>
            <button
              onClick={() => {
                setActiveTab('teachers');
                setSearchTerm('');
                setFilterClass('');
                setFilterDepartment('');
                setFilterStatus('');
              }}
              className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${activeTab === 'teachers'
                ? 'border-green-500 text-green-600'
                : `border-transparent ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`
                }`}
            >
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Teachers ({teachers.length})</span>
              </div>
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
              />
              <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {activeTab === 'students' ? (
              <select
                value={filterClass}
                onChange={(e) => setFilterClass(e.target.value)}
                className={`px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
              >
                <option value="">All Classes</option>
                {getUniqueClasses().map(cls => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
            ) : (
              <select
                value={filterDepartment}
                onChange={(e) => setFilterDepartment(e.target.value)}
                className={`px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
              >
                <option value="">All Departments</option>
                {getUniqueDepartments().map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            )}

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={`px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
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
            Add {activeTab === 'students' ? 'Student' : 'Teacher'}
          </button>
        </div>

        {/* Enhanced Table */}
        <div className={`bg-white rounded-lg shadow overflow-hidden ${isDark ? 'bg-gray-800' : ''}`}>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className={`${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <tr>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                    User
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                    {activeTab === 'students' ? 'Class & Stream' : 'Department'}
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                    Contact Info
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                    Library Activity
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                    Status
                  </th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'bg-gray-800 divide-gray-700' : 'bg-white divide-gray-200'}`}>
                {filteredUsers.map((user) => (
                  <tr key={activeTab === 'students' ? user.student_id : user.teacher_id}
                    className={`hover:${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className={`h-10 w-10 rounded-full flex items-center justify-center ${activeTab === 'students' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                            } ${isDark ? 'bg-opacity-20' : ''}`}>
                            {user.first_name.charAt(0).toUpperCase()}{user.last_name.charAt(0).toUpperCase()}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {user.first_name} {user.last_name}
                          </div>
                          <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {activeTab === 'students' ? user.admission_number : user.employee_id}
                          </div>
                          {activeTab === 'teachers' && user.title && (
                            <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                              {user.title}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {activeTab === 'students' ? (
                        <div>
                          <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {user.class} {user.stream}
                          </div>
                          <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Enrolled: {new Date(user.enrollment_date).getFullYear()}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {user.department}
                          </div>
                          <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {user.subjects_taught}
                          </div>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>
                        {user.contact_phone}
                      </div>
                      {activeTab === 'teachers' && (
                        <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {user.email}
                        </div>
                      )}
                      {activeTab === 'students' && user.parent_contact && (
                        <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          Parent: {user.parent_contact}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${user.current_loans > 0
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                            }`}>
                            {user.current_loans} loans
                          </span>
                        </div>
                        {user.overdue_books > 0 && (
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">
                            {user.overdue_books} overdue
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${user.is_active
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                        }`}>
                        {user.is_active ? 'Active' : 'Inactive'}
                      </span>
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
                          className={`${user.is_active
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
            <h3 className="mt-2 text-sm font-medium">No {activeTab} found</h3>
            <p className="mt-1 text-sm">Try adjusting your search or filter criteria.</p>
          </div>
        )}

        {/* Add User Modal */}
        <Modal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          title={`Add New ${activeTab === 'students' ? 'Student' : 'Teacher'}`}
        >
          <UserForm
            userType={activeTab}
            onClose={() => setShowAddModal(false)}
            onSave={(userData) => {
              if (activeTab === 'students') {
                const newStudent = {
                  student_id: Math.max(...students.map(s => s.student_id)) + 1,
                  ...userData,
                  is_active: true,
                  current_loans: 0,
                  overdue_books: 0
                };
                setStudents([...students, newStudent]);
              } else {
                const newTeacher = {
                  teacher_id: Math.max(...teachers.map(t => t.teacher_id)) + 1,
                  ...userData,
                  is_active: true,
                  current_loans: 0,
                  overdue_books: 0
                };
                setTeachers([...teachers, newTeacher]);
              }
            }}
          />
        </Modal>

        {/* Edit User Modal */}
        <Modal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          title={`Edit ${activeTab === 'students' ? 'Student' : 'Teacher'}`}
        >
          <UserForm
            userType={activeTab}
            user={selectedUser}
            onClose={() => setShowEditModal(false)}
            onSave={(userData) => {
              if (activeTab === 'students') {
                setStudents(students.map(s =>
                  s.student_id === selectedUser.student_id
                    ? { ...s, ...userData }
                    : s
                ));
              } else {
                setTeachers(teachers.map(t =>
                  t.teacher_id === selectedUser.teacher_id
                    ? { ...t, ...userData }
                    : t
                ));
              }
            }}
          />
        </Modal>
      </div>
    </div>
  );
};

const UserForm = ({ userType, user, onClose, onSave }) => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    ...(userType === 'students' ? {
      admission_number: user?.admission_number || '',
      class: user?.class || 'Form 1',
      stream: user?.stream || 'A',
      date_of_birth: user?.date_of_birth || '',
      contact_phone: user?.contact_phone || '',
      parent_contact: user?.parent_contact || '',
      address: user?.address || '',
      enrollment_date: user?.enrollment_date || new Date().toISOString().split('T')[0]
    } : {
      employee_id: user?.employee_id || '',
      title: user?.title || 'Mr.',
      department: user?.department || '',
      subjects_taught: user?.subjects_taught || '',
      contact_phone: user?.contact_phone || '',
      email: user?.email || '',
      address: user?.address || '',
      hire_date: user?.hire_date || new Date().toISOString().split('T')[0]
    })
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
            First Name *
          </label>
          <input
            type="text"
            value={formData.first_name}
            onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
            required
          />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
            Last Name *
          </label>
          <input
            type="text"
            value={formData.last_name}
            onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              }`}
            required
          />
        </div>
      </div>

      {userType === 'students' ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
                Admission Number *
              </label>
              <input
                type="text"
                value={formData.admission_number}
                onChange={(e) => setFormData({ ...formData, admission_number: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
                placeholder="STU001"
                required
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
                Class *
              </label>
              <select
                value={formData.class}
                onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
                required
              >
                <option value="Form 1">Form 1</option>
                <option value="Form 2">Form 2</option>
                <option value="Form 3">Form 3</option>
                <option value="Form 4">Form 4</option>
              </select>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
                Stream
              </label>
              <select
                value={formData.stream}
                onChange={(e) => setFormData({ ...formData, stream: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
              >
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
                Date of Birth
              </label>
              <input
                type="date"
                value={formData.date_of_birth}
                onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
                Enrollment Date *
              </label>
              <input
                type="date"
                value={formData.enrollment_date}
                onChange={(e) => setFormData({ ...formData, enrollment_date: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
                Student Phone
              </label>
              <input
                type="tel"
                value={formData.contact_phone}
                onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
                placeholder="+256-712-345678"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
                Parent/Guardian Phone
              </label>
              <input
                type="tel"
                value={formData.parent_contact}
                onChange={(e) => setFormData({ ...formData, parent_contact: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
                placeholder="+256-701-234567"
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
                Employee ID *
              </label>
              <input
                type="text"
                value={formData.employee_id}
                onChange={(e) => setFormData({ ...formData, employee_id: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
                placeholder="TCH001"
                required
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
                Title
              </label>
              <select
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
              >
                <option value="Mr.">Mr.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Ms.">Ms.</option>
                <option value="Dr.">Dr.</option>
                <option value="Prof.">Prof.</option>
              </select>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
                Hire Date *
              </label>
              <input
                type="date"
                value={formData.hire_date}
                onChange={(e) => setFormData({ ...formData, hire_date: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
                Department *
              </label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
                required
              >
                <option value="">Select Department</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Science">Science</option>
                <option value="Languages">Languages</option>
                <option value="History">History</option>
                <option value="Arts">Arts</option>
                <option value="Physical Education">Physical Education</option>
              </select>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
                Subjects Taught
              </label>
              <input
                type="text"
                value={formData.subjects_taught}
                onChange={(e) => setFormData({ ...formData, subjects_taught: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
                placeholder="Mathematics, Statistics"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.contact_phone}
                onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
                placeholder="+256-712-111222"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
                  }`}
                placeholder="teacher@school.edu"
              />
            </div>
          </div>
        </>
      )}

      <div>
        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>
          Address
        </label>
        <textarea
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          rows={3}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
            }`}
          placeholder="Full address"
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
          {user ? 'Update' : 'Add'} {userType === 'students' ? 'Student' : 'Teacher'}
        </button>
      </div>
    </form>
  );
};

export default Users;