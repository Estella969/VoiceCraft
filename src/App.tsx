import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import MbtiTest from './pages/MbtiTest';
import SceneSelection from './pages/SceneSelection';
import ToneAdjustment from './pages/ToneAdjustment';
import InputContext from './pages/InputContext';
import Results from './pages/Results';
import Favorites from './pages/Favorites';
import History from './pages/History';
import Login from './pages/Login';
import About from './pages/About';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';

const AppRoutes: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [hasCompletedTest, setHasCompletedTest] = useState(false);

  useEffect(() => {
    // 检查用户状态和测试完成状态
    const user = localStorage.getItem('currentUser');
    const testCompleted = sessionStorage.getItem('testCompleted');
    
    console.log('Initial load - Current path:', location.pathname);
    console.log('Initial load - User data from localStorage:', user);
    console.log('Initial load - Test completed:', testCompleted);
    
    if (user && testCompleted) {
      try {
        const userObj = JSON.parse(user);
        console.log('Setting current user with test completed:', userObj);
        setCurrentUser(userObj);
        setHasCompletedTest(true);
      } catch (e) {
        console.log('User data corrupted, clearing...');
        localStorage.removeItem('currentUser');
        sessionStorage.removeItem('testCompleted');
        setCurrentUser(null);
        setHasCompletedTest(false);
      }
    } else {
      // 清理无效状态
      if (!testCompleted) {
        localStorage.removeItem('currentUser');
      }
      setCurrentUser(null);
      setHasCompletedTest(false);
    }
    setIsLoading(false);
  }, []); // 只在首次加载时执行

  // 实时监听localStorage变化，更新currentUser状态
  useEffect(() => {
    const handleStorageChange = () => {
      const user = localStorage.getItem('currentUser');
      const testCompleted = sessionStorage.getItem('testCompleted');
      
      if (user && testCompleted) {
        try {
          const userObj = JSON.parse(user);
          setCurrentUser(userObj);
          setHasCompletedTest(true);
        } catch (e) {
          setCurrentUser(null);
          setHasCompletedTest(false);
        }
      } else {
        setCurrentUser(null);
        setHasCompletedTest(false);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // 也监听自定义事件，用于同页面localStorage变化
    const checkUser = () => {
      const user = localStorage.getItem('currentUser');
      const testCompleted = sessionStorage.getItem('testCompleted');
      
      if (user && testCompleted) {
        try {
          setCurrentUser(JSON.parse(user));
          setHasCompletedTest(true);
        } catch (e) {
          setCurrentUser(null);
          setHasCompletedTest(false);
        }
      } else {
        setCurrentUser(null);
        setHasCompletedTest(false);
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-purple-300">载入中...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsOfUse />} />
      <Route path="/mbti-test" element={<Layout><MbtiTest /></Layout>} />
      {currentUser && hasCompletedTest ? (
        <Route
          path="/app/*"
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
      ) : null}
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