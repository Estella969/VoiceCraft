import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import { ArrowLeft, Clock, Copy, Check, RefreshCw, Heart } from 'lucide-react';

const History: React.FC = () => {
  const navigate = useNavigate();
  const { 
    history, 
    addToFavorites, 
    removeFromFavorites,
    setContextInput
  } = useAppContext();
  
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  
  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };
  
  const toggleFavorite = (item: any) => {
    const newItem = { ...item, isFavorite: !item.isFavorite };
    if (newItem.isFavorite) {
      addToFavorites(newItem);
    } else {
      removeFromFavorites(item.id);
    }
  };
  
  const handleReuseText = (text: string) => {
    setContextInput(text);
    navigate('/input-context');
  };
  
  // Group history by date
  const groupedHistory = history.reduce((acc, item) => {
    const date = new Date(item.createdAt).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {} as Record<string, typeof history>);
  
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center bg-gradient-to-r from-purple-500/20 to-blue-500/20 px-4 py-2 rounded-full mb-2">
          <Clock className="w-4 h-4 mr-2 text-purple-300" />
          <span className="text-sm font-medium">历史记录</span>
        </div>
        <h1 className="text-2xl font-bold">历史生成记录</h1>
        <p className="text-purple-300 mt-2">
          你的历史生成记录会保留 30 天
        </p>
      </div>
      
      {history.length === 0 ? (
        <GlassCard className="text-center py-12">
          <p className="text-xl mb-4">暂无历史记录</p>
          <p className="text-purple-300 mb-6">
            你还没有生成过任何表达。
          </p>
          <Button 
            onClick={() => navigate('/input-context')}
            icon={<RefreshCw className="w-4 h-4" />}
          >
            去生成表达
          </Button>
        </GlassCard>
      ) : (
        <div className="space-y-8 mb-8">
          {Object.entries(groupedHistory).map(([date, items]) => (
            <div key={date}>
              <h2 className="text-lg font-medium mb-4 flex items-center">
                <div className="w-2 h-2 rounded-full bg-purple-400 mr-2"></div>
                {date}
              </h2>
              
              <div className="space-y-4">
                {items.map(item => (
                  <GlassCard key={item.id}>
                    <p className="mb-4">{item.text}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleCopy(item.id, item.text)}
                          className="p-2 rounded-full hover:bg-white/10 transition-colors"
                        >
                          {copiedId === item.id ? (
                            <Check className="w-4 h-4 text-green-400" />
                          ) : (
                            <Copy className="w-4 h-4 text-purple-300" />
                          )}
                        </button>
                        
                        <button 
                          onClick={() => toggleFavorite(item)}
                          className={`p-2 rounded-full hover:bg-white/10 transition-colors ${
                            item.isFavorite ? 'text-pink-400' : 'text-purple-300'
                          }`}
                        >
                          <Heart className="w-4 h-4" fill={item.isFavorite ? "#f472b6" : "none"} />
                        </button>
                      </div>
                      
                      <Button 
                        type="secondary"
                        onClick={() => handleReuseText(item.text)}
                      >
                        重新使用
                      </Button>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="flex justify-start">
        <Button 
          type="secondary" 
          onClick={() => navigate('/')}
          icon={<ArrowLeft className="w-4 h-4" />}
        >
          返回
        </Button>
      </div>
    </div>
  );
};

export default History;