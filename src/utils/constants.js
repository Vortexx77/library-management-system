export const USER_ROLES = {
  LIBRARIAN: 'librarian',
  TEACHER: 'teacher',
  STUDENT: 'student'
};

export const BOOK_STATUS = {
  AVAILABLE: 'available',
  CHECKED_OUT: 'checked_out',
  RESERVED: 'reserved',
  LOST: 'lost',
  DAMAGED: 'damaged'
};

export const BOOK_CONDITION = {
  NEW: 'new',
  GOOD: 'good',
  FAIR: 'fair',
  POOR: 'poor',
  DAMAGED: 'damaged'
};

export const TRANSACTION_TYPES = {
  CHECKOUT: 'checkout',
  RETURN: 'return',
  RENEWAL: 'renewal',
  RESERVATION: 'reservation'
};

export const LOAN_PERIODS = {
  STUDENT: 14, // days
  TEACHER: 30, // days
  STAFF: 30 // days
};

export const NAVIGATION_ITEMS = [
  { path: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
  { path: '/books', label: 'Books', icon: 'book' },
  { path: '/circulation', label: 'Circulation', icon: 'circulation' },
  { path: '/activity', label: 'Activity', icon: 'activity' },
  { path: '/users', label: 'Users', icon: 'users' },
  { path: '/reports', label: 'Reports', icon: 'reports' },
  { path: '/settings', label: 'Settings', icon: 'settings' }
];

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  CACHED_BOOKS: 'cached_books',
  CACHED_USERS: 'cached_users',
  OFFLINE_TRANSACTIONS: 'offline_transactions'
};