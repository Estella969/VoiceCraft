import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { MicIcon, BookmarkIcon, ClockIcon } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const { currentStep } = useAppContext();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 text-white">
      <div className="container mx-auto px-4 py-6 flex flex-col min-h-screen max-w-3xl">
        <header className="flex items-center justify-between mb-8">
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => navigate('/')}
          >
            <MicIcon className="w-6 h-6 text-purple-400 mr-2" />
            <h1 className="text-2xl font-bold text-white" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}>
              声绘 VoiceCraft
            </h1>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => navigate('/favorites')}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <BookmarkIcon className="w-5 h-5 text-purple-300" />
            </button>
            <button 
              onClick={() => navigate('/history')}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <ClockIcon className="w-5 h-5 text-purple-300" />
            </button>
          </div>
        </header>
        
        {currentStep > 0 && currentStep <= 4 && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-purple-300">步骤 {currentStep}/4</span>
              <span className="text-xs text-purple-300">{getStepName(currentStep)}</span>
            </div>
            <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
              <div 
                className="h-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${currentStep * 25}%` }}
              ></div>
            </div>
          </div>
        )}
        
        <main className="flex-grow">
          {children}
        </main>
        
        <footer className="mt-auto pt-8 pb-4 text-center text-sm text-purple-300/60">
          声绘 VoiceCraft © 2025 | 隐私政策 | 用户协议
        </footer>
      </div>
    </div>
  );
};

function getStepName(step: number): string {
  switch (step) {
    case 1: return "MBTI 快测";
    case 2: return "场景选择";
    case 3: return "Tone 调节";
    case 4: return "情境输入";
    default: return "";
  }
}

export default Layout;