import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import MbtiTest from './pages/MbtiTest';
import SceneSelection from './pages/SceneSelection';
import ToneAdjustment from './pages/ToneAdjustment';
import InputContext from './pages/InputContext';
import Results from './pages/Results';
import Favorites from './pages/Favorites';
import History from './pages/History';
import Login from './pages/Login';

const AppRoutes: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    // 只在首次加载时检查用户状态
    const user = localStorage.getItem('currentUser');
    console.log('Initial load - Current path:', location.pathname);
    console.log('Initial load - User data from localStorage:', user);
    
    if (user) {
      try {
        const userObj = JSON.parse(user);
        console.log('Setting current user:', userObj);
        setCurrentUser(userObj);
      } catch (e) {
        console.log('User data corrupted, clearing...');
        localStorage.removeItem('currentUser');
        setCurrentUser(null);
      }
    }
    setIsLoading(false);
  }, []); // 只在首次加载时执行

  // 实时监听localStorage变化，更新currentUser状态
  useEffect(() => {
    const handleStorageChange = () => {
      const user = localStorage.getItem('currentUser');
      if (user) {
        try {
          const userObj = JSON.parse(user);
          setCurrentUser(userObj);
        } catch (e) {
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // 也监听自定义事件，用于同页面localStorage变化
    const checkUser = () => {
      const user = localStorage.getItem('currentUser');
      if (user) {
        try {
          setCurrentUser(JSON.parse(user));
        } catch (e) {
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
    };
    
    window.addEventListener('userChanged', checkUser);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userChanged', checkUser);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-purple-300">载入中...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/mbti-test" element={<Layout><MbtiTest /></Layout>} />
      {currentUser ? (
        <Route
          path="/*"
          element={
        <Layout>
          <Routes>
                <Route path="/" element={<SceneSelection />} />
            <Route path="/scene-selection" element={<SceneSelection />} />
            <Route path="/tone-adjustment" element={<ToneAdjustment />} />
            <Route path="/input-context" element={<InputContext />} />
            <Route path="/results" element={<Results />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </Layout>
          }
        />
      ) : (
        <Route path="*" element={<Login />} />
      )}
    </Routes>
  );
};

function App() {
  return (
    <AppProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AppProvider>
  );
}

export default App;