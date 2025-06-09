import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext, MbtiType } from '../context/AppContext';
import { mbtiQuestions, calculateMbtiType, mbtiDescriptions } from '../data/mbtiQuestions';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import { Brain, ChevronRight, ArrowLeft } from 'lucide-react';

const MbtiTest: React.FC = () => {
  const navigate = useNavigate();
  const { setMbtiType, setCurrentStep } = useAppContext();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: 'a' | 'b' }>({});
  const [animateOut, setAnimateOut] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [resultType, setResultType] = useState('');
  
  const currentQuestion = mbtiQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / mbtiQuestions.length) * 100;
  
  const handleAnswer = (answer: 'a' | 'b') => {
    setAnimateOut(true);
    
    setTimeout(() => {
      setAnswers(prev => ({ ...prev, [currentQuestion.id]: answer }));
      
      if (currentQuestionIndex < mbtiQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setAnimateOut(false);
      } else {
        // Test completed
        const result = calculateMbtiType(answers);
        setResultType(result);
        setMbtiType(result as MbtiType);
        setShowResult(true);
      }
    }, 300);
  };
  
  const handleContinue = () => {
    console.log('Test result:', resultType);
    // 保存MBTI测试结果并标记测试完成，直接进入场景选择
    const userData = { mbti: resultType };
    localStorage.setItem('currentUser', JSON.stringify(userData));
    sessionStorage.setItem('testCompleted', 'true');
    console.log('Saved test result:', userData);
    console.log('Marked test as completed');
    
    // 触发用户状态更新事件
    window.dispatchEvent(new Event('userChanged'));
    
    // 更新AppContext中的MBTI类型
    setMbtiType(resultType as MbtiType);
    setCurrentStep(2);
    console.log('Navigating to scene-selection from test...');
    navigate('/scene-selection');
  };
  
  const goBack = () => {
    if (currentQuestionIndex > 0) {
      setAnimateOut(true);
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
        setAnimateOut(false);
      }, 300);
    } else {
      navigate('/');
    }
  };
  
  if (showResult) {
    return (
      <div className="flex flex-col items-center max-w-md md:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto">
        <GlassCard className="w-full text-center p-6 md:p-8 lg:p-10">
          <div className="mb-4 md:mb-6 lg:mb-8">
            <div className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 mx-auto rounded-full bg-purple-500/20 flex items-center justify-center">
              <Brain className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-purple-300" />
            </div>
          </div>
          
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 md:mb-3 lg:mb-4">{resultType}</h2>
          <p className="text-purple-300 text-sm md:text-lg lg:text-xl xl:text-2xl mb-4 md:mb-6 lg:mb-8">
            {mbtiDescriptions[resultType]}
          </p>
          
          <Button
            onClick={handleContinue}
            fullWidth
            icon={<ChevronRight className="w-4 h-4 md:w-5 md:h-5" />}
            className="text-sm md:text-base lg:text-lg xl:text-xl py-3 md:py-4 lg:py-5"
          >
            继续
          </Button>
        </GlassCard>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col items-center max-w-md md:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto">
      <div className="w-full mb-4 md:mb-6 lg:mb-8 flex items-center justify-between">
        <button 
          onClick={goBack}
          className="flex items-center text-purple-300 hover:text-white transition-colors text-sm md:text-base lg:text-lg"
        >
          <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 mr-1 md:mr-2" />
          返回
        </button>
        
        <div className="text-sm md:text-base lg:text-lg text-purple-300">
          {currentQuestionIndex + 1} / {mbtiQuestions.length}
        </div>
      </div>
      
      <div className="w-full bg-white/10 h-2 md:h-3 lg:h-4 rounded-full mb-8 md:mb-10 lg:mb-12">
        <div 
          className="h-2 md:h-3 lg:h-4 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className={`transform transition-all duration-300 w-full ${animateOut ? 'opacity-0 translate-x-10' : 'opacity-100 translate-x-0'}`}>
        <div className="flex justify-center mb-6 md:mb-8 lg:mb-10">
          <div className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full bg-purple-500/20 flex items-center justify-center">
            <Brain className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-purple-300" />
          </div>
        </div>
        
        <h2 className="text-lg md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-center mb-6 md:mb-8 lg:mb-10 leading-relaxed">
          {currentQuestion.question}
        </h2>
        
        <div className="space-y-3 md:space-y-4 lg:space-y-6">
          <GlassCard 
            className="hover:bg-white/20 transition-colors cursor-pointer min-h-[60px] md:min-h-[80px] lg:min-h-[100px] flex items-center p-4 md:p-5 lg:p-6"
            onClick={() => handleAnswer('a')} 
          >
            <div className="flex items-center w-full">
              <div className="mr-3 md:mr-4 lg:mr-6 w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full border-2 border-purple-400 flex items-center justify-center shrink-0 text-sm md:text-base lg:text-lg font-semibold">
                A
              </div>
              <p className="flex-grow py-2 text-sm md:text-base lg:text-lg xl:text-xl leading-relaxed">{currentQuestion.options.a.text}</p>
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-purple-400 shrink-0" />
            </div>
          </GlassCard>
          
          <GlassCard 
            className="hover:bg-white/20 transition-colors cursor-pointer min-h-[60px] md:min-h-[80px] lg:min-h-[100px] flex items-center p-4 md:p-5 lg:p-6"
            onClick={() => handleAnswer('b')}
          >
            <div className="flex items-center w-full">
              <div className="mr-3 md:mr-4 lg:mr-6 w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full border-2 border-purple-400 flex items-center justify-center shrink-0 text-sm md:text-base lg:text-lg font-semibold">
                B
              </div>
              <p className="flex-grow py-2 text-sm md:text-base lg:text-lg xl:text-xl leading-relaxed">{currentQuestion.options.b.text}</p>
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-purple-400 shrink-0" />
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default MbtiTest;