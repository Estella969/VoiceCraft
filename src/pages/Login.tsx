import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { Sparkles } from 'lucide-react';

const MBTI_TYPES = [
  { value: 'INTJ', label: 'INTJ - 建筑师' },
  { value: 'INTP', label: 'INTP - 逻辑学家' },
  { value: 'ENTJ', label: 'ENTJ - 指挥官' },
  { value: 'ENTP', label: 'ENTP - 辩论家' },
  { value: 'INFJ', label: 'INFJ - 提倡者' },
  { value: 'INFP', label: 'INFP - 调停者' },
  { value: 'ENFJ', label: 'ENFJ - 主人公' },
  { value: 'ENFP', label: 'ENFP - 竞选者' },
  { value: 'ISTJ', label: 'ISTJ - 物流师' },
  { value: 'ISFJ', label: 'ISFJ - 守卫者' },
  { value: 'ESTJ', label: 'ESTJ - 总经理' },
  { value: 'ESFJ', label: 'ESFJ - 执政官' },
  { value: 'ISTP', label: 'ISTP - 鉴赏家' },
  { value: 'ISFP', label: 'ISFP - 探险家' },
  { value: 'ESTP', label: 'ESTP - 企业家' },
  { value: 'ESFP', label: 'ESFP - 表演者' }
];

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [selectedMbti, setSelectedMbti] = useState('');

  // 每次进入登录页都清空localStorage和上下文
  React.useEffect(() => {
    localStorage.removeItem('currentUser');
    setSelectedMbti(''); // 强制清空选择
  }, []);

  const handleMbtiSelect = () => {
    if (!selectedMbti) return;
    console.log('Selected MBTI:', selectedMbti);
    // 保存MBTI类型，直接进入场景选择
    const userData = { mbti: selectedMbti };
    localStorage.setItem('currentUser', JSON.stringify(userData));
    console.log('Saved user data:', userData);
    
    // 触发用户状态更新事件
    window.dispatchEvent(new Event('userChanged'));
    
    console.log('Navigating to scene-selection...');
    navigate('/scene-selection');
  };

  const handleOnlineTest = () => {
    // 清理之前数据，进入在线测试
    localStorage.removeItem('currentUser');
    navigate('/mbti-test');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#2e026d] via-[#15162c] to-[#0f172a] px-4">
      {/* 动态光斑背景 */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute left-1/4 top-1/4 w-64 h-64 md:w-96 md:h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute right-1/4 bottom-1/4 w-48 h-48 md:w-80 md:h-80 bg-blue-400/20 rounded-full blur-2xl animate-pulse delay-200" />
        <div className="absolute left-1/2 top-2/3 w-40 h-40 md:w-72 md:h-72 bg-pink-400/20 rounded-full blur-2xl animate-pulse delay-500" />
      </div>
      
      <div className="relative z-10 w-full max-w-md mx-auto">
        {/* 顶部标题 */}
        <div className="mb-8 flex flex-col items-center">
          <div className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 p-3 rounded-full shadow-lg mb-4 animate-fade-in">
            <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-white drop-shadow" />
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold text-center text-white tracking-tight animate-fade-in" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}>
            Welcome to VoiceCraft
          </h1>
          <p className="mt-2 text-purple-200 text-center text-sm md:text-base animate-fade-in delay-200">
            一键生成专属表达
          </p>
        </div>

        {/* 主卡片 */}
        <div className="rounded-3xl shadow-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 md:p-8 animate-fade-in-up">
          <div className="text-center mb-6">
            <h2 className="text-lg md:text-xl font-bold text-white mb-2">选择你的MBTI类型</h2>
            <p className="text-purple-200 text-sm">快速开始个性化表达体验</p>
          </div>
          
          <div className="mb-6">
            <select
              className="w-full p-3 md:p-4 rounded-xl bg-white/10 text-white focus:ring-2 focus:ring-purple-400/50 transition-all text-center text-sm md:text-base"
              value={selectedMbti}
              onChange={e => setSelectedMbti(e.target.value)}
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: 'white'
              }}
            >
              <option value="" style={{ backgroundColor: '#1f2937', color: 'white' }}>
                选择你的MBTI类型
              </option>
              {MBTI_TYPES.map(type => (
                <option 
                  key={type.value} 
                  value={type.value}
                  style={{ backgroundColor: '#1f2937', color: 'white' }}
                >
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          
          <Button 
            fullWidth 
            onClick={handleMbtiSelect} 
            disabled={!selectedMbti}
            className="text-base md:text-lg py-3 md:py-4 rounded-xl shadow-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 mb-4"
          >
            进入场景选择
          </Button>

          {/* 在线测试小字按钮 */}
          <div className="text-center">
            <button 
              type="button" 
              className="text-xs md:text-sm text-blue-200 underline hover:text-blue-400 transition-all" 
              onClick={handleOnlineTest}
            >
              不知道？在线测试
            </button>
          </div>
        </div>

        <div className="mt-6 md:mt-8 text-center text-xs text-purple-300/60 animate-fade-in-up delay-300">
          <span>© 2024 VoiceCraft. All rights reserved.</span>
        </div>
      </div>
      
      {/* 动画样式 */}
      <style>{`
        .animate-fade-in { animation: fadeIn 1s both; }
        .animate-fade-in-up { animation: fadeInUp 1s both; }
        .animate-fade-in-up.delay-200 { animation-delay: .2s; }
        .animate-fade-in-up.delay-300 { animation-delay: .3s; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(40px);} to { opacity: 1; transform: none; } }
      `}</style>
    </div>
  );
};

export default Login; 