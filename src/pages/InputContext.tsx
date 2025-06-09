import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import { ArrowLeft, RefreshCw, Sparkles, Tag, MessageCircle } from 'lucide-react';
import { scenes } from '../data/scenes';
import { v4 as uuidv4 } from 'uuid';
import { generateResponse, generatePrompt } from '../services/api';

const InputContext: React.FC = () => {
  const navigate = useNavigate();
  const { 
    contextInput, 
    setContextInput, 
    selectedScene,
    selectedCategory,
    toneSettings,
    mbtiType,
    setGeneratedTexts,
    setCurrentStep,
    addToHistory
  } = useAppContext();
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(0);
  
  const selectedSceneData = scenes.find(scene => scene.id === selectedScene);
  const selectedCategoryData = selectedSceneData?.categories.find(cat => cat.id === selectedCategory);
  
  const suggestions = selectedCategoryData?.examples || [
    "描述你的情境...",
    "需要帮助表达什么？",
    "在这里输入你的场景..."
  ];
  
  // Rotate placeholder text
  useEffect(() => {
    if (!contextInput) {
      const interval = setInterval(() => {
        setCurrentSuggestionIndex((prev) => (prev + 1) % suggestions.length);
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, [suggestions, contextInput]);
  
  const handleGenerate = async () => {
    if (!contextInput.trim()) return;
    
    setIsGenerating(true);
    
    try {
      // Generate three different variations with slightly different emotion levels
      const prompts = [
        generatePrompt(
          mbtiType,
          selectedSceneData?.title || '',
          selectedCategory || '',
          { restrained: toneSettings.restrained },
          contextInput
        ),
        generatePrompt(
          mbtiType,
          selectedSceneData?.title || '',
          selectedCategory || '',
          { restrained: Math.max(toneSettings.restrained - 20, 20) },
          contextInput
        ),
        generatePrompt(
          mbtiType,
          selectedSceneData?.title || '',
          selectedCategory || '',
          { restrained: Math.min(toneSettings.restrained + 20, 100) },
          contextInput
        )
      ];

      const responses = await Promise.all(prompts.map(prompt => generateResponse(prompt)));
      
      const generatedTexts = responses.map((text, index) => ({
        id: uuidv4(),
        text,
        scene: selectedScene || '',
        category: selectedCategory || '',
        tone: {
          restrained: index === 0 ? toneSettings.restrained :
                     index === 1 ? Math.max(toneSettings.restrained - 20, 20) :
                     Math.min(toneSettings.restrained + 20, 100)
        },
        isFavorite: false,
        createdAt: new Date()
      }));

      setGeneratedTexts(generatedTexts);
      generatedTexts.forEach(text => addToHistory(text));
      
      navigate('/results');
    } catch (error) {
      console.error('Error generating responses:', error);
      // You might want to show an error message to the user here
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleBack = () => {
    navigate('/scene-selection');
  };
  
  return (
    <div className="max-w-sm md:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto flex flex-col h-full">
      <div className="mb-4 md:mb-6 lg:mb-8 text-center">
        <h1 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold">描述你的情境</h1>
        <p className="text-purple-300 mt-2 text-sm md:text-base lg:text-lg xl:text-xl">
          告诉我们你想表达什么，我们将为你生成合适的表达方式
        </p>
      </div>
      
      <div className="mb-2 overflow-hidden">
        <div className="bg-white/5 px-3 md:px-4 lg:px-6 py-2 md:py-2.5 lg:py-3 rounded-full overflow-hidden whitespace-nowrap">
          <div className="animate-marquee inline-block text-xs md:text-sm lg:text-base">
            💡 提示：描述越具体，生成的内容越准确 | 可以使用@提及具体人物 | 可以使用#标记关键词
          </div>
        </div>
      </div>
      
      <GlassCard className="mb-4 md:mb-6 lg:mb-8 flex-grow">
        <div className="flex items-center gap-2 md:gap-3 lg:gap-4 mb-3 md:mb-4 lg:mb-6">
          <MessageCircle className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-purple-400" />
          <h3 className="font-medium text-sm md:text-base lg:text-lg xl:text-xl">输入你的情境</h3>
        </div>
        
        <textarea
          value={contextInput}
          onChange={(e) => setContextInput(e.target.value)}
          placeholder={suggestions[currentSuggestionIndex]}
          className="w-full h-24 md:h-32 lg:h-40 xl:h-48 bg-white/20 rounded-lg p-3 md:p-4 lg:p-6 text-white placeholder-purple-200/70 focus:outline-none focus:ring-2 focus:ring-purple-400/50 resize-none border border-white/10 focus:border-purple-400/50 transition-all text-sm md:text-base lg:text-lg xl:text-xl"
          style={{ 
            backdropFilter: 'blur(10px)',
            WebkitTextFillColor: 'white',
            color: 'white !important'
          }}
        />
      </GlassCard>
      
      <div className="flex flex-col md:flex-row gap-3 md:gap-4 lg:gap-6 mb-4 md:mb-6 lg:mb-8">
        <GlassCard className="flex-1 p-3 md:p-4 lg:p-6">
          <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
            <Tag className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-purple-400" />
            <h3 className="text-xs md:text-sm lg:text-base xl:text-lg font-medium">当前场景</h3>
          </div>
          <p className="text-xs md:text-sm lg:text-base xl:text-lg text-purple-300">
            {selectedSceneData?.title} {selectedCategoryData ? `- ${selectedCategoryData.name}` : ''}
          </p>
        </GlassCard>
        
        <GlassCard className="flex-1 p-3 md:p-4 lg:p-6">
          <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
            <Sparkles className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-purple-400" />
            <h3 className="text-xs md:text-sm lg:text-base xl:text-lg font-medium">生成风格</h3>
          </div>
          <div className="text-xs md:text-sm lg:text-base xl:text-lg text-purple-300">
            俏皮随意 + 自然平和 + 激动强烈
          </div>
        </GlassCard>
      </div>
      
      <div className="flex justify-between gap-3 md:gap-4 lg:gap-6 mt-auto">
        <Button 
          type="secondary" 
          onClick={handleBack}
          icon={<ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />}
          className="text-sm md:text-base lg:text-lg xl:text-xl py-2.5 md:py-3 lg:py-4"
        >
          返回
        </Button>
        
        <Button 
          onClick={handleGenerate}
          disabled={!contextInput.trim() || isGenerating}
          icon={<Sparkles className="w-4 h-4 md:w-5 md:h-5" />}
          className="text-sm md:text-base lg:text-lg xl:text-xl py-2.5 md:py-3 lg:py-4"
        >
          {isGenerating ? '生成中...' : '生成表达'}
        </Button>
      </div>
    </div>
  );
};

export default InputContext;