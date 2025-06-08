import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import { ArrowLeft, ArrowRight, Sliders } from 'lucide-react';
import { scenes } from '../data/scenes';

const ToneAdjustment: React.FC = () => {
  const navigate = useNavigate();
  const { 
    toneSettings, 
    setToneSettings, 
    setCurrentStep, 
    selectedScene,
    mbtiType
  } = useAppContext();
  
  const selectedSceneData = scenes.find(scene => scene.id === selectedScene);
  
  const handleEmotionLevel = (level: number) => {
    setToneSettings({
      ...toneSettings,
      restrained: level
    });
  };
  
  const handleContinue = () => {
    setCurrentStep(4);
    navigate('/input-context');
  };
  
  const handleBack = () => {
    setCurrentStep(2);
    navigate('/scene-selection');
  };
  
  const getEmotionLevelDescription = (level: number) => {
    if (level >= 80) return '激动强烈';
    if (level >= 40) return '自然平和';
    return '俏皮随意';
  };
  
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center bg-gradient-to-r from-purple-500/20 to-blue-500/20 px-4 py-2 rounded-full mb-2">
          <Sliders className="w-4 h-4 mr-2 text-purple-300" />
          <span className="text-sm font-medium">调整表达语气</span>
        </div>
        <h1 className="text-2xl font-bold">定制你的表达风格</h1>
        <p className="text-purple-300 mt-2">
          选择合适的情感强度，让表达更贴合场景
        </p>
      </div>
      
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <GlassCard className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">当前性格</h3>
            <span className="text-sm bg-purple-500/20 px-3 py-1 rounded-full">
              {mbtiType}
            </span>
          </div>
          <p className="text-sm text-purple-300">
            基于你的性格特质，我们会调整表达的基础风格
          </p>
        </GlassCard>
        
        <GlassCard className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">当前场景</h3>
            <span className="text-sm bg-purple-500/20 px-3 py-1 rounded-full">
              {selectedSceneData?.title}
            </span>
          </div>
          <p className="text-sm text-purple-300">
            {selectedSceneData?.description}
          </p>
        </GlassCard>
      </div>
      
      <GlassCard className="mb-8">
        <h3 className="font-medium mb-6">情感强度</h3>
        
        <div className="space-y-4">
          {[20, 60, 100].map((level) => (
            <button
              key={level}
              onClick={() => handleEmotionLevel(level)}
              className={`w-full p-4 rounded-lg transition-all duration-300 ${
                toneSettings.restrained === level
                  ? 'bg-purple-500/30 border-2 border-purple-400'
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">
                  {getEmotionLevelDescription(level)}
                </span>
                <div className="flex">
                  {Array.from({ length: Math.ceil(level / 40) }).map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full bg-purple-400 ml-1"
                    />
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>
      </GlassCard>
      
      <div className="flex justify-between">
        <Button 
          type="secondary" 
          onClick={handleBack}
          icon={<ArrowLeft className="w-4 h-4" />}
        >
          返回
        </Button>
        
        <Button 
          onClick={handleContinue}
          icon={<ArrowRight className="w-4 h-4" />}
        >
          继续
        </Button>
      </div>
    </div>
  );
};

export default ToneAdjustment;