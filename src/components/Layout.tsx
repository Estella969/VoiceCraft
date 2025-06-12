import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { MicIcon, BookmarkIcon, ClockIcon, Heart } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const { currentStep } = useAppContext();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-slate-800 via-purple-800 to-slate-900 text-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-6 lg:py-8 flex flex-col min-h-screen max-w-4xl">
        <header className="flex items-center justify-between mb-6 md:mb-8 lg:mb-10">
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => navigate('/')}
          >
            <MicIcon className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-purple-400 mr-2 md:mr-3" />
            <h1 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-white" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}>
              声绘 VoiceCraft
            </h1>
          </div>
          <div className="flex gap-2 md:gap-3 lg:gap-4">
            <button 
              onClick={() => navigate('/app/favorites')}
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            >
              <Heart className="w-4 h-4" />
              <span className="text-sm">收藏</span>
            </button>
            
            <button 
              onClick={() => navigate('/app/history')}
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            >
              <ClockIcon className="w-4 h-4" />
              <span className="text-sm">历史</span>
            </button>
          </div>
        </header>
        
        {currentStep > 0 && currentStep <= 4 && (
          <div className="mb-6 md:mb-8 lg:mb-10">
            <div className="flex justify-between items-center mb-2 md:mb-3">
              <span className="text-xs md:text-sm lg:text-base text-purple-300">步骤 {currentStep}/4</span>
              <span className="text-xs md:text-sm lg:text-base text-purple-300">{getStepName(currentStep)}</span>
            </div>
            <div className="w-full bg-white/10 h-1 md:h-1.5 lg:h-2 rounded-full overflow-hidden">
              <div 
                className="h-1 md:h-1.5 lg:h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${currentStep * 25}%` }}
              ></div>
            </div>
          </div>
        )}
        
        <main className="flex-grow flex flex-col">
          {children}
        </main>
        
        <footer className="mt-auto pt-6 md:pt-8 lg:pt-10 pb-4 md:pb-6 lg:pb-8 text-center text-xs md:text-sm lg:text-base text-purple-300/60">
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