import { mockApi } from './api';

export const authService = {
  login: async (credentials) => {
    try {
      const response = await mockApi.login(credentials);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Login failed');
    }
  },

  logout: () => {
    // Clear any stored tokens or session data
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
  },

  getCurrentUser: () => {
    try {
      const userData = localStorage.getItem('user_data');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      return null;
    }
  },

  isAuthenticated: () => {
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');
    return !!(token && userData);
  },

  hasPermission: (permission) => {
    const user = authService.getCurrentUser();
    if (!user) return false;
    
    // Mock permission system
    const rolePermissions = {
      librarian: ['read', 'write', 'delete', 'admin'],
      teacher: ['read', 'write'],
      student: ['read']
    };
    
    const userPermissions = rolePermissions[user.role] || [];
    return userPermissions.includes(permission);
  },

  canAccessRoute: (route) => {
    const user = authService.getCurrentUser();
    if (!user) return false;
    
    // Define route access by role
    const routeAccess = {
      '/dashboard': ['librarian', 'teacher'],
      '/books': ['librarian', 'teacher', 'student'],
      '/circulation': ['librarian', 'teacher'],
      '/users': ['librarian'],
      '/reports': ['librarian', 'teacher'],
      '/settings': ['librarian']
    };
    
    const allowedRoles = routeAccess[route] || [];
    return allowedRoles.includes(user.role);
  }
};