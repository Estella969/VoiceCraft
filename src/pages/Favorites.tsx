import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext, GeneratedText } from '../context/AppContext';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import { ArrowLeft, Bookmark, Copy, Check, Trash, RefreshCw, Plus } from 'lucide-react';
import { scenes } from '../data/scenes';

const Favorites: React.FC = () => {
  const navigate = useNavigate();
  const { favorites, removeFromFavorites, contextInput, setContextInput } = useAppContext();
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  
  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };
  
  const handleRemove = (id: string) => {
    removeFromFavorites(id);
  };
  
  const handleReuseText = (text: string) => {
    setContextInput(text);
    navigate('/app/input-context');
  };
  
  // Group favorites by scene
  const groupedFavorites = favorites.reduce((acc, favorite) => {
    const sceneId = favorite.scene || 'other';
    if (!acc[sceneId]) {
      acc[sceneId] = [];
    }
    acc[sceneId].push(favorite);
    return acc;
  }, {} as Record<string, typeof favorites>);
  
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center bg-gradient-to-r from-purple-500/20 to-blue-500/20 px-4 py-2 rounded-full mb-2">
          <Bookmark className="w-4 h-4 mr-2 text-purple-300" />
          <span className="text-sm font-medium">我的收藏</span>
        </div>
        <h1 className="text-2xl font-bold">收藏的表达</h1>
        <p className="text-purple-300 mt-2">
          你收藏的所有表达方式都保存在这里
        </p>
      </div>
      
      {favorites.length === 0 ? (
        <GlassCard className="text-center py-12">
          <p className="text-xl mb-4">暂无收藏</p>
          <p className="text-purple-300 mb-6">
            你还没有收藏任何表达。生成表达后，点击心形图标进行收藏。
          </p>
          <Button 
            onClick={() => navigate('/app/input-context')}
            icon={<Plus className="w-4 h-4 md:w-5 md:h-5" />}
            className="text-sm md:text-base py-2 md:py-3 px-4 md:px-6 transition-all hover:scale-105"
          >
            新的表达
          </Button>
        </GlassCard>
      ) : (
        <div className="space-y-8 mb-8">
          {Object.entries(groupedFavorites).map(([sceneId, items]) => (
            <div key={sceneId}>
              <h2 className="text-lg font-medium mb-4 flex items-center">
                <div className="w-2 h-2 rounded-full bg-purple-400 mr-2"></div>
                {scenes.find(s => s.id === sceneId)?.title || '其他场景'}
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
                          onClick={() => handleRemove(item.id)}
                          className="p-2 rounded-full hover:bg-white/10 transition-colors"
                        >
                          <Trash className="w-4 h-4 text-purple-300" />
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

export default Favorites;