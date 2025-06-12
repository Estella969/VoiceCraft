import React, { createContext, useContext, useState, ReactNode } from 'react';

export type MbtiType = 'INTJ' | 'INTP' | 'ENTJ' | 'ENTP' | 'INFJ' | 'INFP' | 'ENFJ' | 'ENFP' | 'ISTJ' | 'ISFJ' | 'ESTJ' | 'ESFJ' | 'ISTP' | 'ISFP' | 'ESTP' | 'ESFP' | '' | '在线测试';

export type SceneType = 'friends' | 'daily' | 'relationship' | 'workplace';

export interface ToneSettings {
  restrained: number; // 0-100, 20=俏皮随意, 60=自然平和, 100=激动强烈
}

export interface GeneratedText {
  id: string;
  text: string;
  tone: ToneSettings;
  isFavorite: boolean;
  createdAt: Date;
  category?: string;
}

interface AppContextType {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  mbtiType: MbtiType;
  setMbtiType: (type: MbtiType) => void;
  selectedScene: SceneType | null;
  setSelectedScene: (scene: SceneType | null) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  toneSettings: ToneSettings;
  setToneSettings: (settings: ToneSettings) => void;
  contextInput: string;
  setContextInput: (input: string) => void;
  generatedTexts: GeneratedText[];
  setGeneratedTexts: (texts: GeneratedText[]) => void;
  favorites: GeneratedText[];
  favoriteTexts: GeneratedText[];
  addToFavorites: (text: GeneratedText) => void;
  removeFromFavorites: (id: string) => void;
  removeFavorite: (id: string) => void;
  history: GeneratedText[];
  historyTexts: GeneratedText[];
  addToHistory: (text: GeneratedText) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [mbtiType, setMbtiType] = useState<MbtiType>('');
  const [selectedScene, setSelectedScene] = useState<SceneType | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [toneSettings, setToneSettings] = useState<ToneSettings>({ restrained: 60 });
  const [contextInput, setContextInput] = useState('');
  const [generatedTexts, setGeneratedTexts] = useState<GeneratedText[]>([]);
  const [favorites, setFavorites] = useState<GeneratedText[]>([]);
  const [history, setHistory] = useState<GeneratedText[]>([]);

  // 重置所有状态的函数
  const resetAllStates = () => {
    setCurrentStep(0);
    setMbtiType('');
    setSelectedScene(null);
    setSelectedCategory(null);
    setToneSettings({ restrained: 60 });
    setContextInput('');
    setGeneratedTexts([]);
  };

  // 监听localStorage变化，当用户登出时重置状态
  React.useEffect(() => {
    const handleStorageChange = () => {
      const currentUser = localStorage.getItem('currentUser');
      if (!currentUser) {
        resetAllStates();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    // 初始检查：只有首次挂载且没有currentUser时才resetAllStates
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      resetAllStates();
    }
    // 有用户数据时不再强制重置，避免页面内跳转被打断

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const addToFavorites = (text: GeneratedText) => {
    setFavorites(prev => {
      if (prev.some(item => item.id === text.id)) {
        return prev;
      }
      return [...prev, { ...text, isFavorite: true }];
    });
  };

  const removeFromFavorites = (id: string) => {
    setFavorites(prev => prev.filter(item => item.id !== id));
  };

  const addToHistory = (text: GeneratedText) => {
    setHistory(prev => {
      if (prev.some(item => item.id === text.id)) {
        return prev;
      }
      return [...prev, text];
    });
  };

  return (
    <AppContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        mbtiType,
        setMbtiType,
        selectedScene,
        setSelectedScene,
        selectedCategory,
        setSelectedCategory,
        toneSettings,
        setToneSettings,
        contextInput,
        setContextInput,
        generatedTexts,
        setGeneratedTexts,
        favorites,
        favoriteTexts: favorites,
        addToFavorites,
        removeFromFavorites,
        removeFavorite: removeFromFavorites,
        history,
        historyTexts: history,
        addToHistory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};