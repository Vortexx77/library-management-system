import { mockApi } from './api';

export const userService = {
  getAllUsers: async (params = {}) => {
    try {
      return await mockApi.getUsers(params);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch users');
    }
  },

  getUserById: async (id) => {
    try {
      return await mockApi.getUser(id);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch user');
    }
  },

  createUser: async (userData) => {
    try {
      return await mockApi.createUser(userData);
    } catch (error) {
      throw new Error(error.message || 'Failed to create user');
    }
  },

  updateUser: async (id, userData) => {
    try {
      return await mockApi.updateUser(id, userData);
    } catch (error) {
      throw new Error(error.message || 'Failed to update user');
    }
  },

  deleteUser: async (id) => {
    try {
      const users = await mockApi.getUsers();
      const userIndex = users.findIndex(u => u.id === id);
      if (userIndex === -1) throw new Error('User not found');
      users.splice(userIndex, 1);
      return { success: true };
    } catch (error) {
      throw new Error(error.message || 'Failed to delete user');
    }
  },

  searchUsers: async (query) => {
    try {
      return await mockApi.getUsers({ search: query });
    } catch (error) {
      throw new Error(error.message || 'Failed to search users');
    }
  },

  getUsersByRole: async (role) => {
    try {
      return await mockApi.getUsers({ role });
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch users by role');
    }
  },

  getStudents: async () => {
    try {
      return await mockApi.getUsers({ role: 'student' });
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch students');
    }
  },

  getTeachers: async () => {
    try {
      return await mockApi.getUsers({ role: 'teacher' });
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch teachers');
    }
  },

  getUserBorrowingHistory: async (userId) => {
    try {
      return await mockApi.getTransactions({ userId });
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch user borrowing history');
    }
  },

  getUserCurrentLoans: async (userId) => {
    try {
      const transactions = await mockApi.getTransactions({ userId });
      return transactions.filter(t => t.type === 'checkout' && !t.returnDate);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch user current loans');
    }
  },

  getUserOverdueBooks: async (userId) => {
    try {
      const transactions = await mockApi.getTransactions({ userId });
      const now = new Date();
      return transactions.filter(t => 
        t.type === 'checkout' && 
        !t.returnDate && 
        new Date(t.dueDate) < now
      );
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch user overdue books');
    }
  }
};