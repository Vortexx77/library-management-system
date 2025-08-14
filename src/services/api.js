import axios from 'axios';
import { STORAGE_KEYS } from '../utils/constants';

// Mock API base URL
const API_BASE_URL = 'http://localhost:3001/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER_DATA);
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Mock API delay function
const mockDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API responses
export const mockApi = {
  // Auth endpoints
  login: async (credentials) => {
    await mockDelay();
    if (credentials.email === 'admin@school.ug' && credentials.password === 'password') {
      return {
        user: {
          id: '1',
          email: 'admin@school.ug',
          name: 'Library Administrator',
          role: 'librarian'
        },
        token: 'mock-jwt-token'
      };
    }
    throw new Error('Invalid credentials');
  },

  // Books endpoints
  getBooks: async (params = {}) => {
    await mockDelay();
    return mockBooks.filter(book => {
      if (params.search) {
        const query = params.search.toLowerCase();
        return book.title.toLowerCase().includes(query) ||
               book.author.toLowerCase().includes(query) ||
               book.isbn.includes(query);
      }
      if (params.status) {
        return book.status === params.status;
      }
      return true;
    });
  },

  getBook: async (id) => {
    await mockDelay();
    const book = mockBooks.find(b => b.id === id);
    if (!book) throw new Error('Book not found');
    return book;
  },

  createBook: async (bookData) => {
    await mockDelay();
    const newBook = {
      ...bookData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    mockBooks.push(newBook);
    return newBook;
  },

  updateBook: async (id, bookData) => {
    await mockDelay();
    const index = mockBooks.findIndex(b => b.id === id);
    if (index === -1) throw new Error('Book not found');
    mockBooks[index] = { ...mockBooks[index], ...bookData, updatedAt: new Date().toISOString() };
    return mockBooks[index];
  },

  deleteBook: async (id) => {
    await mockDelay();
    const index = mockBooks.findIndex(b => b.id === id);
    if (index === -1) throw new Error('Book not found');
    mockBooks.splice(index, 1);
    return { success: true };
  },

  // Users endpoints
  getUsers: async (params = {}) => {
    await mockDelay();
    return mockUsers.filter(user => {
      if (params.search) {
        const query = params.search.toLowerCase();
        return user.firstName.toLowerCase().includes(query) ||
               user.lastName.toLowerCase().includes(query) ||
               user.email.toLowerCase().includes(query);
      }
      if (params.role) {
        return user.role === params.role;
      }
      return true;
    });
  },

  getUser: async (id) => {
    await mockDelay();
    const user = mockUsers.find(u => u.id === id);
    if (!user) throw new Error('User not found');
    return user;
  },

  createUser: async (userData) => {
    await mockDelay();
    const newUser = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    mockUsers.push(newUser);
    return newUser;
  },

  updateUser: async (id, userData) => {
    await mockDelay();
    const index = mockUsers.findIndex(u => u.id === id);
    if (index === -1) throw new Error('User not found');
    mockUsers[index] = { ...mockUsers[index], ...userData, updatedAt: new Date().toISOString() };
    return mockUsers[index];
  },

  // Transactions endpoints
  getTransactions: async (params = {}) => {
    await mockDelay();
    return mockTransactions.filter(transaction => {
      if (params.userId) return transaction.userId === params.userId;
      if (params.bookId) return transaction.bookId === params.bookId;
      if (params.type) return transaction.type === params.type;
      return true;
    });
  },

  createTransaction: async (transactionData) => {
    await mockDelay();
    const newTransaction = {
      ...transactionData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    mockTransactions.push(newTransaction);
    return newTransaction;
  },

  // Dashboard stats
  getDashboardStats: async () => {
    await mockDelay();
    return {
      totalBooks: mockBooks.length,
      availableBooks: mockBooks.filter(b => b.status === 'available').length,
      checkedOutBooks: mockBooks.filter(b => b.status === 'checked_out').length,
      overdueBooks: mockTransactions.filter(t => 
        t.type === 'checkout' && 
        !t.returnDate && 
        new Date() > new Date(t.dueDate)
      ).length,
      totalUsers: mockUsers.length,
      activeLoans: mockTransactions.filter(t => t.type === 'checkout' && !t.returnDate).length
    };
  }
};

// Mock data
let mockBooks = [
  {
    id: '1',
    title: 'Things Fall Apart',
    author: 'Chinua Achebe',
    isbn: '978-0385474542',
    category: 'Literature',
    publisher: 'Heinemann',
    publishedYear: 1958,
    pages: 209,
    copies: 5,
    availableCopies: 3,
    status: 'available',
    condition: 'good',
    location: 'A-001',
    description: 'A classic African novel about pre-colonial life in Nigeria.',
    coverImage: null,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    title: 'Mathematics for Secondary Schools',
    author: 'John Mukasa',
    isbn: '978-9970020041',
    category: 'Mathematics',
    publisher: 'Fountain Publishers',
    publishedYear: 2020,
    pages: 456,
    copies: 10,
    availableCopies: 7,
    status: 'available',
    condition: 'new',
    location: 'M-015',
    description: 'Comprehensive mathematics textbook for O-Level students.',
    coverImage: null,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

let mockUsers = [
  {
    id: '1',
    firstName: 'Sarah',
    lastName: 'Nakato',
    email: 'sarah.nakato@school.ug',
    role: 'student',
    class: 'S4A',
    studentId: 'STU001',
    phone: '+256700123456',
    address: 'Kampala, Uganda',
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    firstName: 'David',
    lastName: 'Okello',
    email: 'david.okello@school.ug',
    role: 'teacher',
    department: 'Mathematics',
    employeeId: 'TCH001',
    phone: '+256700654321',
    address: 'Entebbe, Uganda',
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

let mockTransactions = [
  {
    id: '1',
    userId: '1',
    bookId: '1',
    type: 'checkout',
    checkoutDate: '2024-01-15T10:00:00Z',
    dueDate: '2024-01-29T10:00:00Z',
    returnDate: null,
    renewalCount: 0,
    fine: 0,
    status: 'active',
    createdAt: '2024-01-15T10:00:00Z'
  }
];

export default api;