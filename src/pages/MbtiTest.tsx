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
    navigate('/app/scene-selection');
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
      <div className="flex flex-col items-center w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto">
        <GlassCard className="w-full text-center p-8 md:p-12">
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto rounded-full bg-purple-500/20 flex items-center justify-center">
              <Brain className="w-10 h-10 text-purple-300" />
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{resultType}</h2>
          <p className="text-purple-300 text-lg md:text-xl mb-8">
            {mbtiDescriptions[resultType]}
          </p>
          
          <Button
            onClick={handleContinue}
            fullWidth
            icon={<ChevronRight className="w-6 h-6" />}
            className="text-xl py-4"
          >
            继续
          </Button>
        </GlassCard>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col items-center max-w-2xl mx-auto">
      <div className="w-full mb-8 flex items-center justify-between">
        <button 
          onClick={goBack}
          className="flex items-center text-purple-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          返回
        </button>
        
        <div className="text-sm text-purple-300">
          {currentQuestionIndex + 1} / {mbtiQuestions.length}
        </div>
      </div>
      
      <div className="w-full bg-white/10 h-3 rounded-full mb-10">
        <div 
          className="h-3 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className={`transform transition-all duration-300 w-full ${animateOut ? 'opacity-0 translate-x-10' : 'opacity-100 translate-x-0'}`}>
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center">
            <Brain className="w-8 h-8 text-purple-300" />
          </div>
        </div>
        
        <h2 className="text-xl font-semibold text-center mb-10 leading-relaxed">
          {currentQuestion.question}
        </h2>
        
        <div className="grid grid-cols-1 gap-4">
          <GlassCard 
            className="hover:bg-white/20 transition-colors cursor-pointer flex items-center p-6"
            onClick={() => handleAnswer('a')}
          >
            <div className="flex items-center w-full">
              <div className="mr-4 w-8 h-8 rounded-full border-2 border-purple-400 flex items-center justify-center shrink-0 text-sm font-semibold">
                A
              </div>
              <p className="flex-grow py-2 text-base leading-relaxed">{currentQuestion.options.a.text}</p>
              <ChevronRight className="w-5 h-5 text-purple-400 shrink-0" />
            </div>
          </GlassCard>
          
          <GlassCard 
            className="hover:bg-white/20 transition-colors cursor-pointer flex items-center p-6"
            onClick={() => handleAnswer('b')}
          >
            <div className="flex items-center w-full">
              <div className="mr-4 w-8 h-8 rounded-full border-2 border-purple-400 flex items-center justify-center shrink-0 text-sm font-semibold">
                B
              </div>
              <p className="flex-grow py-2 text-base leading-relaxed">{currentQuestion.options.b.text}</p>
              <ChevronRight className="w-5 h-5 text-purple-400 shrink-0" />
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default MbtiTest;