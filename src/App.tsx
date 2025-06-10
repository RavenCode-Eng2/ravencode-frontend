import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import MyCourses from './pages/MyCourses';
import NotFound from './pages/NotFound';
import Layout from './components/Layout';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Layout wrapper components
const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <Layout sidebarType="none">
        {children}
    </Layout>
);

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <Layout sidebarType="dashboard">
        {children}
    </Layout>
);

const CoursesLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <Layout sidebarType="courses">
        {children}
    </Layout>
);

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Public routes */}
                    <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
                    <Route path="/register" element={<PublicLayout><Register /></PublicLayout>} />
                    <Route path="/courses" element={<PublicLayout><Courses /></PublicLayout>} />

                    {/* Protected routes with dashboard layout */}
                    <Route path="/dashboard" element={
                        <ProtectedRoute>
                            <DashboardLayout>
                                <Dashboard />
                            </DashboardLayout>
                        </ProtectedRoute>
                    } />

                    <Route path="/my-courses" element={
                        <ProtectedRoute>
                            <DashboardLayout>
                                <MyCourses />
                            </DashboardLayout>
                        </ProtectedRoute>
                    } />

                    {/* Default route */}
                    <Route path="/" element={
                        <ProtectedRoute>
                            <DashboardLayout>
                                <Dashboard />
                            </DashboardLayout>
                        </ProtectedRoute>
                    } />

                    {/* 404 route */}
                    <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App; 