import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import MyCourses from './pages/MyCourses';
import NotFound from './pages/NotFound';
import Layout from './components/Layout';
import Settings from './pages/Settings';

import ForgotPassword from './pages/ForgotPassword';

import Introduction from './pages/Module1/Introduction';
import Lesson1 from './pages/Module1/Lesson1';

import Lesson2 from './pages/Module1/Lesson2';
import Lesson3 from './pages/Module1/Lesson3';

import Lesson4 from './pages/Module1/Lesson4';
import Lesson5 from "./pages/Module1/Lesson5";
import Assesment1 from "./pages/Module1/Assesment1";
import AssessmentJudge1 from "./pages/Module1/assessment_judge1";

// Module 2 imports
import IntroductionModule2 from './pages/Module2/Introduction';
import Lesson1Module2 from './pages/Module2/Lesson1';
import Lesson2Module2 from './pages/Module2/Lesson2';
import Lesson3Module2 from './pages/Module2/Lesson3';
import Lesson4Module2 from './pages/Module2/Lesson4';
import Assessment2 from './pages/Module2/Assessment2';
import AssessmentJudge2 from './pages/Module2/assessment_judge2';

import MySubmissions from './pages/MySubmissions';

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';

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

const queryClient = new QueryClient();

function App() {
    return (
        <>
            <Toaster position="top-right" />
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <Router>
                        <Routes>
                            {/* Public routes */}
                            <Route path="/" element={<PublicLayout><Login /></PublicLayout>} />
                            <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
                            <Route path="/register" element={<PublicLayout><Register /></PublicLayout>} />
                            <Route path="/forgot-password" element={<PublicLayout><ForgotPassword /></PublicLayout>} />

                            {/* Protected routes */}
                            <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout><Dashboard /></DashboardLayout></ProtectedRoute>} />
                            <Route path="/courses" element={<ProtectedRoute><CoursesLayout><Courses /></CoursesLayout></ProtectedRoute>} />
                            <Route path="/my-courses" element={<ProtectedRoute><DashboardLayout><MyCourses /></DashboardLayout></ProtectedRoute>} />
                            <Route path="/settings" element={<ProtectedRoute><DashboardLayout><Settings /></DashboardLayout></ProtectedRoute>} />
                            <Route path="/my-submissions" element={<ProtectedRoute><DashboardLayout><MySubmissions /></DashboardLayout></ProtectedRoute>} />

                            {/* Module 1 routes */}
                            <Route path="/introduction" element={<ProtectedRoute><CoursesLayout><Introduction /></CoursesLayout></ProtectedRoute>} />
                            <Route path="/lesson1" element={<ProtectedRoute><CoursesLayout><Lesson1 /></CoursesLayout></ProtectedRoute>} />
                            <Route path="/lesson2" element={<ProtectedRoute><CoursesLayout><Lesson2 /></CoursesLayout></ProtectedRoute>} />
                            <Route path="/lesson3" element={<ProtectedRoute><CoursesLayout><Lesson3 /></CoursesLayout></ProtectedRoute>} />
                            <Route path="/lesson4" element={<ProtectedRoute><CoursesLayout><Lesson4 /></CoursesLayout></ProtectedRoute>} />
                            <Route path="/lesson5" element={<ProtectedRoute><CoursesLayout><Lesson5 /></CoursesLayout></ProtectedRoute>} />
                            <Route path="/Assesment1" element={<ProtectedRoute><CoursesLayout><Assesment1 /></CoursesLayout></ProtectedRoute>} />
                            <Route path="/AssessmentJudge1" element={<ProtectedRoute><CoursesLayout><AssessmentJudge1 /></CoursesLayout></ProtectedRoute>} />

                            {/* Module 2 routes */}
                            <Route path="/introduction-module2" element={<ProtectedRoute><CoursesLayout><IntroductionModule2 /></CoursesLayout></ProtectedRoute>} />
                            <Route path="/lesson1-module2" element={<ProtectedRoute><CoursesLayout><Lesson1Module2 /></CoursesLayout></ProtectedRoute>} />
                            <Route path="/lesson2-module2" element={<ProtectedRoute><CoursesLayout><Lesson2Module2 /></CoursesLayout></ProtectedRoute>} />
                            <Route path="/lesson3-module2" element={<ProtectedRoute><CoursesLayout><Lesson3Module2 /></CoursesLayout></ProtectedRoute>} />
                            <Route path="/lesson4-module2" element={<ProtectedRoute><CoursesLayout><Lesson4Module2 /></CoursesLayout></ProtectedRoute>} />
                            <Route path="/assessment2" element={<ProtectedRoute><CoursesLayout><Assessment2 /></CoursesLayout></ProtectedRoute>} />
                            <Route path="/AssessmentJudge2" element={<ProtectedRoute><CoursesLayout><AssessmentJudge2 /></CoursesLayout></ProtectedRoute>} />

                            {/* Catch all route */}
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Router>
                </AuthProvider>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </>
    );
}

export default App; 