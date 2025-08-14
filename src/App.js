import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Layout from './components/common/Layout';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Books from './pages/Books';
import Circulation from './pages/Circulation';
import Reservations from './pages/Reservations';
import LostBooks from './pages/LostBooks';
import Activity from './pages/Activity';
import Users from './pages/Users';
import SystemUsers from './pages/SystemUsers';
import Categories from './pages/Categories';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppProvider>
          <Router>
          <div className="App">
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<Login />} />
              
              {/* Protected routes */}
              <Route path="/" element={
                <ProtectedRoute>
                  <Layout>
                    <Navigate to="/dashboard" replace />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/books" element={
                <ProtectedRoute>
                  <Layout>
                    <Books />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/circulation" element={
                <ProtectedRoute>
                  <Layout>
                    <Circulation />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/reservations" element={
                <ProtectedRoute>
                  <Layout>
                    <Reservations />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/lost-books" element={
                <ProtectedRoute>
                  <Layout>
                    <LostBooks />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/activity" element={
                <ProtectedRoute>
                  <Layout>
                    <Activity />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/users" element={
                <ProtectedRoute>
                  <Layout>
                    <Users />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/system-users" element={
                <ProtectedRoute>
                  <Layout>
                    <SystemUsers />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/categories" element={
                <ProtectedRoute>
                  <Layout>
                    <Categories />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/reports" element={
                <ProtectedRoute>
                  <Layout>
                    <Reports />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/settings" element={
                <ProtectedRoute>
                  <Layout>
                    <Settings />
                  </Layout>
                </ProtectedRoute>
              } />
              
              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
          </Router>
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;