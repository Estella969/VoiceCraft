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
    // 保存MBTI测试结果，直接进入场景选择
    const userData = { mbti: resultType };
    localStorage.setItem('currentUser', JSON.stringify(userData));
    console.log('Saved test result:', userData);
    
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
      <div className="flex flex-col items-center max-w-xl mx-auto">
        <GlassCard className="w-full text-center p-8">
          <div className="mb-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-purple-500/20 flex items-center justify-center">
              <Brain className="w-8 h-8 text-purple-300" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold mb-2">{resultType}</h2>
          <p className="text-purple-300 text-lg mb-6">
            {mbtiDescriptions[resultType]}
          </p>
          
          <Button
            onClick={handleContinue}
            fullWidth
            icon={<ChevronRight className="w-4 h-4" />}
          >
            继续
          </Button>
        </GlassCard>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col items-center max-w-xl mx-auto">
      <div className="w-full mb-6 flex items-center justify-between">
        <button 
          onClick={goBack}
          className="flex items-center text-purple-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          返回
        </button>
        
        <div className="text-sm text-purple-300">
          {currentQuestionIndex + 1} / {mbtiQuestions.length}
        </div>
      </div>
      
      <div className="w-full bg-white/10 h-2 rounded-full mb-10">
        <div 
          className="h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className={`transform transition-all duration-300 w-full ${animateOut ? 'opacity-0 translate-x-10' : 'opacity-100 translate-x-0'}`}>
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center">
            <Brain className="w-8 h-8 text-purple-300" />
          </div>
        </div>
        
        <h2 className="text-2xl font-semibold text-center mb-8">
          {currentQuestion.question}
        </h2>
        
        <div className="space-y-4">
          <GlassCard 
            className="hover:bg-white/20 transition-colors cursor-pointer min-h-[80px] flex items-center"
            onClick={() => handleAnswer('a')} 
          >
            <div className="flex items-center w-full">
              <div className="mr-4 w-8 h-8 rounded-full border-2 border-purple-400 flex items-center justify-center shrink-0">
                A
              </div>
              <p className="flex-grow py-2">{currentQuestion.options.a.text}</p>
              <ChevronRight className="w-5 h-5 text-purple-400 shrink-0" />
            </div>
          </GlassCard>
          
          <GlassCard 
            className="hover:bg-white/20 transition-colors cursor-pointer min-h-[80px] flex items-center"
            onClick={() => handleAnswer('b')}
          >
            <div className="flex items-center w-full">
              <div className="mr-4 w-8 h-8 rounded-full border-2 border-purple-400 flex items-center justify-center shrink-0">
                B
              </div>
              <p className="flex-grow py-2">{currentQuestion.options.b.text}</p>
              <ChevronRight className="w-5 h-5 text-purple-400 shrink-0" />
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default MbtiTest;