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

  // 每次进入登录页都清空localStorage和sessionStorage
  React.useEffect(() => {
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('testCompleted');
    setSelectedMbti(''); // 强制清空选择
  }, []);

  const handleMbtiSelect = () => {
    if (!selectedMbti) return;
    console.log('Selected MBTI:', selectedMbti);
    // 保存MBTI类型并标记测试完成
    const userData = { mbti: selectedMbti };
    localStorage.setItem('currentUser', JSON.stringify(userData));
    sessionStorage.setItem('testCompleted', 'true');
    console.log('Saved user data:', userData);
    console.log('Marked test as completed');
    
    // 触发用户状态更新事件
    window.dispatchEvent(new Event('userChanged'));
    
    console.log('Navigating to app/scene-selection...');
    navigate('/app/scene-selection');
  };

  const handleOnlineTest = () => {
    // 清理之前数据，进入在线测试
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('testCompleted');
    navigate('/mbti-test');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-purple-900 via-slate-800 via-purple-800 to-slate-900 px-4 md:px-6 lg:px-8">
      {/* 动态光斑背景 */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute left-1/4 top-1/4 w-32 h-32 md:w-64 md:h-64 lg:w-96 lg:h-96 xl:w-[500px] xl:h-[500px] bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute right-1/4 bottom-1/4 w-24 h-24 md:w-48 md:h-48 lg:w-80 lg:h-80 xl:w-[400px] xl:h-[400px] bg-blue-400/20 rounded-full blur-2xl animate-pulse delay-200" />
        <div className="absolute left-1/2 top-2/3 w-20 h-20 md:w-40 md:h-40 lg:w-72 lg:h-72 xl:w-[350px] xl:h-[350px] bg-pink-400/20 rounded-full blur-2xl animate-pulse delay-500" />
      </div>
      
      <div className="relative z-10 w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
        {/* 顶部标题 */}
        <div className="mb-6 md:mb-8 lg:mb-10 xl:mb-12 flex flex-col items-center">
          <div className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 p-2.5 md:p-3 lg:p-4 xl:p-5 rounded-full shadow-lg mb-3 md:mb-4 lg:mb-6 animate-fade-in">
            <Sparkles className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 xl:w-10 xl:h-10 text-white drop-shadow" />
          </div>
          <h1 className="text-xl md:text-2xl lg:text-4xl xl:text-5xl font-extrabold text-center text-white tracking-tight animate-fade-in" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}>
            Welcome to VoiceCraft
          </h1>
          <p className="mt-2 md:mt-3 lg:mt-4 text-purple-200 text-center text-xs md:text-sm lg:text-base xl:text-lg animate-fade-in delay-200">
            一键生成专属表达
          </p>
        </div>

        {/* 主卡片 */}
        <div className="rounded-2xl md:rounded-3xl lg:rounded-3xl shadow-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-4 md:p-6 lg:p-8 xl:p-10 animate-fade-in-up">
          <div className="text-center mb-4 md:mb-6 lg:mb-8">
            <h2 className="text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-white mb-2 md:mb-3">选择你的MBTI类型</h2>
            <p className="text-purple-200 text-xs md:text-sm lg:text-base xl:text-lg">快速开始个性化表达体验</p>
          </div>
          
          <div className="mb-4 md:mb-6 lg:mb-8">
            <select
              className="w-full p-2.5 md:p-3 lg:p-4 xl:p-5 rounded-lg md:rounded-xl lg:rounded-xl bg-white/10 text-white focus:ring-2 focus:ring-purple-400/50 transition-all text-center text-xs md:text-sm lg:text-base xl:text-lg"
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
            className="text-sm md:text-base lg:text-lg xl:text-xl py-2.5 md:py-3 lg:py-4 xl:py-5 rounded-lg md:rounded-xl lg:rounded-xl shadow-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 mb-3 md:mb-4 lg:mb-6"
          >
            进入场景选择
          </Button>

          {/* 在线测试小字按钮 */}
          <div className="text-center">
            <button 
              type="button" 
              className="text-xs md:text-sm lg:text-base xl:text-lg text-blue-200 underline hover:text-blue-400 transition-all" 
              onClick={handleOnlineTest}
            >
              不知道？在线测试
            </button>
          </div>
        </div>

        <div className="mt-4 md:mt-6 lg:mt-8 xl:mt-10 text-center text-xs md:text-sm lg:text-base text-purple-300/60 animate-fade-in-up delay-300">
          <span>© 2025 VoiceCraft. All rights reserved.</span>
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