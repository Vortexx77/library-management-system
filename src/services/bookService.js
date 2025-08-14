import { mockApi } from './api';

export const bookService = {
  getAllBooks: async (params = {}) => {
    try {
      return await mockApi.getBooks(params);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch books');
    }
  },

  getBookById: async (id) => {
    try {
      return await mockApi.getBook(id);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch book');
    }
  },

  createBook: async (bookData) => {
    try {
      return await mockApi.createBook(bookData);
    } catch (error) {
      throw new Error(error.message || 'Failed to create book');
    }
  },

  updateBook: async (id, bookData) => {
    try {
      return await mockApi.updateBook(id, bookData);
    } catch (error) {
      throw new Error(error.message || 'Failed to update book');
    }
  },

  deleteBook: async (id) => {
    try {
      return await mockApi.deleteBook(id);
    } catch (error) {
      throw new Error(error.message || 'Failed to delete book');
    }
  },

  searchBooks: async (query) => {
    try {
      return await mockApi.getBooks({ search: query });
    } catch (error) {
      throw new Error(error.message || 'Failed to search books');
    }
  },

  getBooksByCategory: async (category) => {
    try {
      const books = await mockApi.getBooks();
      return books.filter(book => book.category === category);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch books by category');
    }
  },

  getBooksByStatus: async (status) => {
    try {
      return await mockApi.getBooks({ status });
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch books by status');
    }
  },

  checkAvailability: async (bookId) => {
    try {
      const book = await mockApi.getBook(bookId);
      return {
        available: book.availableCopies > 0,
        availableCopies: book.availableCopies,
        totalCopies: book.copies
      };
    } catch (error) {
      throw new Error(error.message || 'Failed to check book availability');
    }
  },

  getPopularBooks: async (limit = 10) => {
    try {
      // Mock popular books based on checkout frequency
      const books = await mockApi.getBooks();
      return books.slice(0, limit);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch popular books');
    }
  },

  getRecentlyAdded: async (limit = 10) => {
    try {
      const books = await mockApi.getBooks();
      return books
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, limit);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch recently added books');
    }
  }
};