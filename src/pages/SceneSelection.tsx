import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { scenes } from '../data/scenes';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import { ArrowLeft, ArrowRight, Users, Heart, Briefcase, LifeBuoy, Megaphone } from 'lucide-react';

const iconComponents = {
  Users,
  Heart,
  Briefcase,
  LifeBuoy,
  Megaphone
};

const SceneSelection: React.FC = () => {
  const navigate = useNavigate();
  const { selectedScene, setSelectedScene, setCurrentStep, mbtiType, setMbtiType } = useAppContext();
  
  // 从localStorage读取MBTI类型
  React.useEffect(() => {
    setSelectedScene(null); // 每次进入都重置
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      try {
        const userObj = JSON.parse(currentUser);
        if (userObj.mbti && userObj.mbti !== mbtiType) {
          setMbtiType(userObj.mbti as any);
        }
      } catch (e) {
        console.error('Failed to parse user data:', e);
      }
    }
  }, [setMbtiType, mbtiType, setSelectedScene]);
  
  const handleSceneSelect = (sceneId: any) => {
    setSelectedScene(sceneId);
  };
  
  const handleContinue = () => {
    if (selectedScene) {
      setCurrentStep(4);
      navigate('/input-context');
    }
  };
  
  const handleBack = () => {
    // 返回登录页
    localStorage.removeItem('currentUser');
    navigate('/login');
  };
  
  const getIconComponent = (iconName: string) => {
    const IconComponent = iconComponents[iconName as keyof typeof iconComponents];
    return IconComponent ? <IconComponent className="w-6 h-6" /> : null;
  };
  
  return (
    <div className="max-w-sm md:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto px-3 md:px-4 lg:px-6">
      <div className="mb-4 md:mb-6 lg:mb-8 text-center">
        <div className="inline-block bg-gradient-to-r from-purple-500/20 to-blue-500/20 px-3 md:px-4 py-1.5 md:py-2 rounded-full mb-3 md:mb-4">
          <span className="text-xs md:text-sm lg:text-base font-medium text-white/90">你的 MBTI 类型: <span className="text-purple-200 font-semibold">{mbtiType}</span></span>
        </div>
        <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-extrabold text-white mb-2 md:mb-3 tracking-wide" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}>选择你的场景</h1>
        <p className="text-white/90 mt-2 text-sm md:text-base lg:text-lg xl:text-xl font-medium" style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.6)' }}>不同场景有不同的表达方式，选择最符合你需求的场景</p>
      </div>
      
      <div className="grid grid-cols-1 gap-3 md:gap-4 lg:gap-5 mb-6 md:mb-8 lg:mb-10">
        {scenes.map(scene => (
          <GlassCard
            key={scene.id}
            className={`cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-1 md:hover:-translate-y-2 hover:scale-[1.02] md:hover:scale-105 p-4 md:p-5 lg:p-6 xl:p-8 group ${
              selectedScene === scene.id 
                ? 'ring-1 md:ring-2 ring-purple-400 bg-gradient-to-br from-purple-500/25 to-blue-500/20 shadow-lg shadow-purple-500/20' 
                : 'hover:bg-white/15 hover:shadow-lg hover:shadow-purple-500/10'
            }`}
            onClick={() => handleSceneSelect(scene.id)}
          >
            <div className="flex items-start">
              <div className={`mr-3 md:mr-4 lg:mr-5 p-2 md:p-2.5 lg:p-3 xl:p-4 rounded-full shrink-0 transition-all duration-300 ${
                selectedScene === scene.id 
                  ? 'bg-gradient-to-br from-purple-400/50 to-blue-400/50 text-white shadow-lg' 
                  : 'bg-gradient-to-br from-purple-500/30 to-blue-500/30 text-purple-300 group-hover:from-purple-400/40 group-hover:to-blue-400/40 group-hover:text-purple-200'
              }`}>
                {getIconComponent(scene.icon)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className={`font-semibold text-base md:text-lg lg:text-xl xl:text-2xl mb-1 md:mb-2 transition-colors duration-300 ${
                  selectedScene === scene.id ? 'text-white' : 'text-white/90 group-hover:text-white'
                }`}>{scene.title}</h3>
                <p className={`text-xs md:text-sm lg:text-base xl:text-lg mb-2 md:mb-3 lg:mb-4 transition-colors duration-300 ${
                  selectedScene === scene.id ? 'text-purple-100/90' : 'text-purple-300/80 group-hover:text-purple-200/90'
                }`}>{scene.description}</p>
                <div className="flex flex-wrap gap-1 md:gap-2">
                  {scene.categories?.flatMap(category => category.examples).slice(0, 3).map((example, i) => (
                    <span key={i} className={`text-xs md:text-sm px-2 md:px-2.5 lg:px-3 py-0.5 md:py-1 rounded-full transition-all duration-300 ${
                      selectedScene === scene.id 
                        ? 'bg-white/20 text-white/90 shadow-sm' 
                        : 'bg-white/10 text-white/70 group-hover:bg-white/15 group-hover:text-white/80'
                    }`}>
                      {example}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* 选中状态指示器 */}
            {selectedScene === scene.id && (
              <div className="absolute top-2 md:top-3 right-2 md:right-3 w-2 h-2 md:w-3 md:h-3 bg-purple-400 rounded-full shadow-lg animate-pulse"></div>
            )}
          </GlassCard>
        ))}
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between gap-3 md:gap-4 lg:gap-6">
        <Button 
          type="secondary" 
          onClick={handleBack}
          icon={<ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />}
          className="px-6 md:px-8 lg:px-10 py-3 md:py-4 lg:py-5 text-sm md:text-base lg:text-lg xl:text-xl font-medium transition-all hover:scale-105 hover:shadow-lg"
        >
          返回
        </Button>
        
        <Button 
          onClick={handleContinue}
          disabled={!selectedScene}
          icon={<ArrowRight className="w-4 h-4 md:w-5 md:h-5" />}
          className={`px-6 md:px-8 lg:px-10 py-3 md:py-4 lg:py-5 text-sm md:text-base lg:text-lg xl:text-xl font-semibold transition-all ${
            selectedScene 
              ? 'hover:scale-105 hover:shadow-xl bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-lg shadow-purple-500/30' 
              : 'opacity-50 cursor-not-allowed'
          }`}
        >
          继续
        </Button>
      </div>
    </div>
  );
};

export default SceneSelection;