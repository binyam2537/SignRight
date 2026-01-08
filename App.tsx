import React from 'react';
import { HashRouter as Router, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import Landing from './pages/Landing';
import Dojo from './pages/Dojo';
import Dashboard from './pages/Dashboard';
import Learn from './pages/Learn';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import Dictionary from './pages/Dictionary';
import Converse from './pages/Converse';
import Onboarding from './pages/Onboarding';
import Sidebar from './components/Sidebar';
import RightPanel from './components/RightPanel';
import Nav from './components/Nav';
import { UserProvider } from './contexts/UserContext';

const MainLayout: React.FC = () => {
  const location = useLocation();
  const isDojo = location.pathname === '/dojo' || location.pathname === '/conversation';

  return (
    <div className="flex h-screen bg-app-bg text-ink overflow-hidden font-sans">
      {/* 1. Left Sidebar (Navigation) */}
      <Sidebar />

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <Nav />
        
        <main className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth relative">
           <Outlet />
        </main>
      </div>

      {/* 3. Right Panel (Gamification) - Hidden in Dojo/Converse to maximize space */}
      {!isDojo && <RightPanel />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          
          {/* Auth & Onboarding Routes (No Layout) */}
          <Route path="/login" element={<Onboarding initialStep="auth" initialMode="login" />} />
          <Route path="/signup" element={<Onboarding initialStep="auth" initialMode="signup" />} />
          <Route path="/onboarding" element={<Onboarding initialStep="wizard" />} />

          {/* App Routes (With Layout) */}
          <Route element={<MainLayout />}>
             <Route path="/learn" element={<Learn />} />
             <Route path="/dojo" element={<Dojo />} />
             <Route path="/conversation" element={<Converse />} />
             <Route path="/dashboard" element={<Dashboard />} />
             <Route path="/leaderboard" element={<Leaderboard />} />
             <Route path="/dictionary" element={<Dictionary />} />
             <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;