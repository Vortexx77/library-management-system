import { useState, useEffect } from 'react';

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue, removeValue];
};

export const useOfflineStorage = () => {
  const [offlineData, setOfflineData] = useLocalStorage('offline_data', {
    transactions: [],
    books: [],
    users: [],
    lastSync: null
  });

  const addOfflineTransaction = (transaction) => {
    setOfflineData(prev => ({
      ...prev,
      transactions: [...prev.transactions, { ...transaction, id: Date.now(), offline: true }]
    }));
  };

  const clearOfflineData = () => {
    setOfflineData({
      transactions: [],
      books: [],
      users: [],
      lastSync: new Date().toISOString()
    });
  };

  const syncOfflineData = async (syncFunction) => {
    try {
      if (offlineData.transactions.length > 0) {
        await syncFunction(offlineData.transactions);
        clearOfflineData();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Sync failed:', error);
      return false;
    }
  };

  return {
    offlineData,
    addOfflineTransaction,
    clearOfflineData,
    syncOfflineData,
    hasOfflineData: offlineData.transactions.length > 0
  };
};