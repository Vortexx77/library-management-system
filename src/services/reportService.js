import { mockApi } from './api';

export const reportService = {
  getDashboardStats: async () => {
    try {
      return await mockApi.getDashboardStats();
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch dashboard stats');
    }
  },

  getOverdueReport: async () => {
    try {
      const transactions = await mockApi.getTransactions();
      const books = await mockApi.getBooks();
      const users = await mockApi.getUsers();
      
      const now = new Date();
      const overdueTransactions = transactions.filter(t => 
        t.type === 'checkout' && 
        !t.returnDate && 
        new Date(t.dueDate) < now
      );

      return overdueTransactions.map(transaction => {
        const book = books.find(b => b.id === transaction.bookId);
        const user = users.find(u => u.id === transaction.userId);
        const daysOverdue = Math.ceil((now - new Date(transaction.dueDate)) / (1000 * 60 * 60 * 24));
        
        return {
          ...transaction,
          book,
          user,
          daysOverdue,
          fine: daysOverdue * 500 // 500 UGX per day
        };
      });
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch overdue report');
    }
  },

  getPopularBooksReport: async (limit = 20) => {
    try {
      const transactions = await mockApi.getTransactions();
      const books = await mockApi.getBooks();
      
      // Count checkouts per book
      const bookCheckouts = {};
      transactions.forEach(t => {
        if (t.type === 'checkout') {
          bookCheckouts[t.bookId] = (bookCheckouts[t.bookId] || 0) + 1;
        }
      });

      // Sort books by checkout count
      const popularBooks = Object.entries(bookCheckouts)
        .map(([bookId, checkoutCount]) => {
          const book = books.find(b => b.id === bookId);
          return { book, checkoutCount };
        })
        .sort((a, b) => b.checkoutCount - a.checkoutCount)
        .slice(0, limit);

      return popularBooks;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch popular books report');
    }
  },

  getClassReport: async (className) => {
    try {
      const users = await mockApi.getUsers();
      const transactions = await mockApi.getTransactions();
      const books = await mockApi.getBooks();
      
      const classStudents = users.filter(u => u.role === 'student' && u.class === className);
      const classTransactions = transactions.filter(t => 
        classStudents.some(s => s.id === t.userId)
      );

      const report = {
        className,
        totalStudents: classStudents.length,
        activeReaders: new Set(classTransactions.map(t => t.userId)).size,
        totalCheckouts: classTransactions.filter(t => t.type === 'checkout').length,
        currentLoans: classTransactions.filter(t => t.type === 'checkout' && !t.returnDate).length,
        overdueBooks: classTransactions.filter(t => 
          t.type === 'checkout' && 
          !t.returnDate && 
          new Date(t.dueDate) < new Date()
        ).length,
        students: classStudents.map(student => {
          const studentTransactions = classTransactions.filter(t => t.userId === student.id);
          const currentLoans = studentTransactions.filter(t => t.type === 'checkout' && !t.returnDate);
          const overdueLoans = currentLoans.filter(t => new Date(t.dueDate) < new Date());
          
          return {
            ...student,
            totalCheckouts: studentTransactions.filter(t => t.type === 'checkout').length,
            currentLoans: currentLoans.length,
            overdueBooks: overdueLoans.length,
            totalFines: overdueLoans.reduce((sum, loan) => {
              const daysOverdue = Math.ceil((new Date() - new Date(loan.dueDate)) / (1000 * 60 * 60 * 24));
              return sum + (daysOverdue * 500);
            }, 0)
          };
        })
      };

      return report;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch class report');
    }
  },

  getMonthlyReport: async (year, month) => {
    try {
      const transactions = await mockApi.getTransactions();
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);
      
      const monthlyTransactions = transactions.filter(t => {
        const transactionDate = new Date(t.createdAt);
        return transactionDate >= startDate && transactionDate <= endDate;
      });

      return {
        period: `${year}-${month.toString().padStart(2, '0')}`,
        totalTransactions: monthlyTransactions.length,
        checkouts: monthlyTransactions.filter(t => t.type === 'checkout').length,
        returns: monthlyTransactions.filter(t => t.type === 'return').length,
        renewals: monthlyTransactions.filter(t => t.type === 'renewal').length,
        newUsers: 0, // Would need user creation dates
        dailyStats: this.getDailyStats(monthlyTransactions, startDate, endDate)
      };
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch monthly report');
    }
  },

  getDailyStats: (transactions, startDate, endDate) => {
    const dailyStats = [];
    const currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      const dayTransactions = transactions.filter(t => {
        const transactionDate = new Date(t.createdAt);
        return transactionDate.toDateString() === currentDate.toDateString();
      });
      
      dailyStats.push({
        date: currentDate.toISOString().split('T')[0],
        transactions: dayTransactions.length,
        checkouts: dayTransactions.filter(t => t.type === 'checkout').length,
        returns: dayTransactions.filter(t => t.type === 'return').length
      });
      
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return dailyStats;
  },

  exportReport: async (reportType, data) => {
    // Mock export functionality
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would generate and download the file
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${reportType}-report-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      return { success: true, message: 'Report exported successfully' };
    } catch (error) {
      throw new Error(error.message || 'Failed to export report');
    }
  }
};