import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/Sidebar';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';
import SubjectLayout from './layouts/SubjectLayout';

// Lazy load pages for better performance
const LandingPage = lazy(() => import('./pages/LandingPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const SubjectsListPage = lazy(() => import('./pages/SubjectsListPage'));
const SubjectPage = lazy(() => import('./pages/SubjectPage'));
const ChatPage = lazy(() => import('./pages/ChatPage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Simple loading component
const PageLoader = () => (
  <div className="flex h-screen items-center justify-center bg-background-light dark:bg-background-dark">
    <div className="flex flex-col items-center gap-4">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent shadow-lg shadow-primary/20"></div>
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <AuthProvider>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public Routes without Layout */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth/login" element={<SignupPage />} />

            {/* Protected Routes without Layouts (Pages have their own fully mapped exact UI) */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dashboard/subjects" element={<SubjectsListPage />} />

            {/* Subject Inner Pages */}
            <Route path="/dashboard/subjects/:subjectId" element={<Navigate to="materials" replace />} />
            <Route path="/dashboard/subjects/:subjectId/materials" element={<SubjectPage />} />
            <Route path="/dashboard/subjects/:subjectId/chat" element={<ChatPage />} />
            <Route path="/dashboard/subjects/:subjectId/quizzes" element={
              <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display antialiased overflow-hidden w-full h-screen m-0 p-0 text-left flex">
                <div className="flex h-full w-full">
                  <Sidebar />
                  <div className="flex-1 p-6 md:p-10 flex items-center justify-center h-full relative">
                    <p className="text-slate-500">Quizzes Coming Soon...</p>
                  </div>
                </div>
              </div>
            } />

            {/* Other Dashboard Pages */}
            <Route path="/dashboard/chat-history" element={<ChatPage />} />
            <Route path="/dashboard/api-settings" element={<SettingsPage />} />
            <Route path="/dashboard/profile" element={<ProfilePage />} />

            {/* Catch-all Not Found Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </Router>
  );
}

export default App;
