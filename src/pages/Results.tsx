import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext, MbtiType, SceneType, GeneratedText } from '../context/AppContext';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import { fetchAIResult } from '../services/aiService';
import { v4 as uuidv4 } from 'uuid';
import { ArrowLeft, Sparkles, Send, Loader2, Copy, Heart, RefreshCw, MessageSquare, Layout, Check } from 'lucide-react';
import { scenes } from '../data/scenes';

interface StyleCard {
  id: string;
  title: string;
  description: string;
  content: string;
  recommend: string;
  bgGradient: string;
  intensity: 'playful' | 'natural' | 'passionate';
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  styleCards?: StyleCard[];
  isInitial?: boolean;
}

type ReplyMode = 'card' | 'chat';
type ChatStyle = 'playful' | 'natural' | 'passionate';

const Results: React.FC = () => {
  const navigate = useNavigate();
  const { 
    mbtiType,
    selectedScene,
    toneSettings,
    contextInput,
    setMbtiType,
    favorites,
    addToFavorites,
  } = useAppContext();
  
  // 多轮对话消息流
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [favoritedIds, setFavoritedIds] = useState<Set<string>>(new Set());
  const [replyMode, setReplyMode] = useState<ReplyMode>('card');
  const [selectedChatStyle, setSelectedChatStyle] = useState<ChatStyle>('natural');
  const [showButtons, setShowButtons] = useState<Record<string, boolean>>({});
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const isGeneratingRef = useRef(false); // 新增 Ref 用于防抖

  const mbtiOptions = [
    'INTJ', 'INTP', 'ENTJ', 'ENTP',
    'INFJ', 'INFP', 'ENFJ', 'ENFP',
    'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
    'ISTP', 'ISFP', 'ESTP', 'ESFP',
    '在线测试'
  ];

  // 首次自动请求 AI 回复
  useEffect(() => {
    // 移除 initialGenerated state，使用 isGeneratingRef.current 防抖
    if (!isGeneratingRef.current && contextInput && contextInput.trim() && messages.length === 0) {
      handleInitialGeneration();
    }
  }, [contextInput, messages.length]);

  // 滚动到底部
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // 从风格的 mood 或 title 中提取强度
  const getIntensityFromStyle = (style: any): ChatStyle => {
    const mood = (style.mood || '').toLowerCase();
    const title = (style.title || '').toLowerCase();
  
    if (mood.includes('俏皮') || title.includes('俏皮') || mood.includes('playful') || title.includes('文艺')) return 'playful';
    if (mood.includes('激动') || title.includes('激动') || mood.includes('passionate') || title.includes('情感')) return 'passionate';
    
    return 'natural'; // 默认或 "自然"
  };

  const handleMbtiChange = (newType: MbtiType) => {
    if (newType === '在线测试') {
      navigate('/mbti-test');
    } else {
      setMbtiType(newType);
    }
  };

  const handleRegenerate = () => {
    if (messages.length > 0 && messages[0].isInitial) {
      handleInitialGeneration();
    }
  };

  // 获取简短犀利推荐语
  const getContentRecommendation = useCallback((content: string, intensity: ChatStyle) => {
    // 简短犀利的8字内推荐语
    const sharpRecommendations = {
      'playful': [
        '轻松有趣', '俏皮可爱', '幽默风趣', '活泼生动',
        '亲和力强', '轻松愉快', '有趣得体', '俏皮实用',
        '灵动活泼', '童趣十足', '诙谐幽默', '轻快自然'
      ],
      'natural': [
        '自然得体', '温和舒适', '稳重大方', '清晰易懂',
        '平和有礼', '朴实真诚', '优雅涵养', '可靠安全',
        '中庸平和', '简洁明了', '质朴真实', '恰到好处'
      ],
      'passionate': [
        '力度强劲', '震撼人心', '感染力强', '气势十足',
        '热情澎湃', '情感浓烈', '说服力强', '显现决心',
        '激情四射', '铿锵有力', '慷慨激昂', '振奋人心'
      ]
    };
    
    const intensityWords = sharpRecommendations[intensity] || sharpRecommendations['natural'];
    const randomIndex = Math.floor(Math.random() * intensityWords.length);
    // 确保推荐语不超过8个字
    return intensityWords[randomIndex];
  }, []);

  // 首次生成
  const handleInitialGeneration = useCallback(async () => {
    if (isGeneratingRef.current) return;
    isGeneratingRef.current = true;

    setMessages([]); // 清空旧消息，防止堆积
    setError(null);
    setLoading(true);
    
    // 根据场景确定是否为朋友圈
    const isCircleOfFriends = selectedScene === 'friends';
    const charLimit = isCircleOfFriends ? 30 : 50;
    
    try {
      const userMsg: ChatMessage = {
        id: uuidv4(),
        role: 'user',
        content: `请根据我的MBTI类型（${mbtiType}）、场景（${selectedScene}）、语气（${JSON.stringify(toneSettings)}），帮我润色表达：${contextInput}`,
        isInitial: true
      };
      
      setMessages([userMsg]);
      
      // 根据场景调整prompt
      let prompt = '';
      if (selectedScene === 'daily') {
        prompt = `请你完全化身为${mbtiType}性格类型的人，根据我的性格优势，将原始表达优化为三种不同风格的表达建议。禁止出现任何AI自述、对话、AI腔调，只输出优化后的表达本身，不改变原文语意。

【风格要求】
1. 俏皮随意：轻松幽默，表达自然，体现${mbtiType}的活泼特质。
2. 自然平和：温和得体，表达真诚，体现${mbtiType}的稳重特质。
3. 激动强烈：情感充沛，表达有力，体现${mbtiType}的热情特质。

【输出格式】严格按照如下JSON格式输出，不要添加任何解释或多余内容：
{
  "styles": [
    { "title": "俏皮随意", "content": "表达建议1", "recommend": "8字内推荐语" },
    { "title": "自然平和", "content": "表达建议2", "recommend": "8字内推荐语" },
    { "title": "激动强烈", "content": "表达建议3", "recommend": "8字内推荐语" }
  ]
}

原始表达：${contextInput}`;
            } else if (selectedScene === 'friends') {
        prompt = `请你完全化身为${mbtiType}性格类型的人，运用我的性格优势，将原始内容优化为三种朋友圈风格文案。要求创意表达，避免口语化对话，追求简短精炼（20字内），禁止AI自述。

【朋友圈专有风格】
1. 文艺诗意：运用诗意化描写、巧妙比喻、典故化用，富有意境
2. 创意文案：独特视角、巧妙表达、引人思考，展现才华
3. 情感独白：真挚情感、内心表达、共鸣感强烈

【要求】
- 字数控制在20字以内
- 避免直白表达，追求文学性
- 可融入古风元素或文学典故
- 绝对禁止口语化对话
- 体现${mbtiType}的性格魅力

【输出格式】严格按照如下JSON格式输出：
{
  "styles": [
    { "title": "文艺诗意", "mood": "playful", "content": "表达建议1", "recommend": "8字内推荐语" },
    { "title": "创意文案", "mood": "natural", "content": "表达建议2", "recommend": "8字内推荐语" },
    { "title": "情感独白", "mood": "passionate", "content": "表达建议3", "recommend": "8字内推荐语" }
  ]
}

原始表达：${contextInput}`;
      } else if (selectedScene === 'workplace') {
        prompt = `请你完全化身为${mbtiType}性格类型的职场专家，运用我的性格优势，将用户的原始表达直接优化为三种专业职场沟通风格。只对用户的表达内容进行优化润色，不要改变原文语意，不要变成其他语境，绝对禁止AI自述、对话腔调。

【关键要求】
- 保持用户原始表达的语意和语境不变
- 如果用户说"我将评价为优秀员工"，优化后仍是关于"我去评价别人为优秀员工"，不是"我被评价"
- 如果用户说"你可以撩拨我吗"，优化后仍是关于"请求撩拨"的表达，不是回应这个请求

【职场专有沟通风格】
1. 简洁汇报：三段式结构（进度/问题/下一步），逻辑清晰，重点突出
2. 数据支撑：融入统计数据、对比分析、量化结论，增强说服力
3. 积极推进：肯定现状→明确需求→行动号召，推动执行

【要求】
- 语言专业严谨，符合职场规范
- 体现${mbtiType}的职场优势
- 每个表达控制在80字以内
- 禁止口语化，保持正式商务语调
- 不要输出括号及括号内的内容

【输出格式】严格按照如下JSON格式输出：
{
  "styles": [
    { "title": "简洁汇报", "content": "表达建议1", "recommend": "8字内推荐语" },
    { "title": "数据支撑", "content": "表达建议2", "recommend": "8字内推荐语" },
    { "title": "积极推进", "content": "表达建议3", "recommend": "8字内推荐语" }
  ]
}

原始表达：${contextInput}`;
      } else {
        prompt = `请你完全化身为${mbtiType}性格类型的人，运用我的性格优势，将用户的原始表达直接优化为三种不同风格建议。只对用户的表达内容进行优化润色，不要改变原文语意，不要变成其他语境，禁止AI自述、对话、AI腔调，只输出优化后的表达本身。

【关键要求】
- 保持用户原始表达的语意和语境不变
- 如果用户说"你可以撩拨我吗"，优化后仍是关于"请求撩拨"的表达，不是回应这个请求
- 如果用户说"我爱你"，优化后仍是表达"我爱你"，不是回应"我也爱你"

【风格要求】结合${mbtiType}性格特质：
1. 俏皮随意：体现性格的轻松活泼面
2. 自然平和：体现性格的稳重理性面  
3. 激动强烈：体现性格的热情坚定面

【要求】
- 不要输出括号及括号内的内容
- 语言要自然真实，避免AI腔调

【输出格式】严格按照如下JSON格式输出：
{
  "styles": [
    { "title": "俏皮随意", "content": "表达建议1", "recommend": "8字内推荐语" },
    { "title": "自然平和", "content": "表达建议2", "recommend": "8字内推荐语" },
    { "title": "激动强烈", "content": "表达建议3", "recommend": "8字内推荐语" }
  ]
}

原始表达：${contextInput}`;
      }

      const response = await fetchAIResult(prompt);
      
      // 尝试解析JSON响应
      let parsedResponse;
      try {
        console.log('AI原始响应:', response);
        
        // 更强的清理逻辑
        let cleanResponse = response.trim();
        
        // 移除markdown代码块标记
        cleanResponse = cleanResponse.replace(/```json\n?|\n?```/g, '');
        
        // 移除可能的前后文本，只保留JSON部分
        const jsonStart = cleanResponse.indexOf('{');
        const jsonEnd = cleanResponse.lastIndexOf('}');
        
        if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
          cleanResponse = cleanResponse.substring(jsonStart, jsonEnd + 1);
        }
        
        console.log('清理后的响应:', cleanResponse);
        parsedResponse = JSON.parse(cleanResponse);
      } catch (parseError) {
        console.error('JSON解析失败:', parseError, '原始响应:', response);
        
        // 如果JSON解析失败，尝试手动构造响应
        const fallbackResponse = {
          styles: [
            {
              title: "俏皮随意",
              content: response.substring(0, 100) + '...',
              recommend: "格式错误"
            },
            {
              title: "自然平和", 
              content: "AI返回格式错误，请重新生成",
              recommend: "重试建议"
            },
            {
              title: "激动强烈",
              content: "系统正在处理中...",
              recommend: "稍后重试"
            }
          ]
        };
        
        parsedResponse = fallbackResponse;
        console.log('使用备用响应格式');
      }

      if (parsedResponse.styles && Array.isArray(parsedResponse.styles)) {
        const styleCards: StyleCard[] = parsedResponse.styles.map((style: any, index: number) => {
          const intensity = getIntensityFromStyle(style);
          
          return {
            id: uuidv4(),
            title: style.title || `风格${index + 1}`,
            description: style.atmosphere || '',
            content: style.content || '',
            recommend: style.recommend || getContentRecommendation(style.content || '', intensity as ChatStyle),
            bgGradient: '',
            intensity: intensity
          };
        });

        const aiMsg: ChatMessage = {
          id: uuidv4(),
          role: 'assistant',
          content: `基于你的${mbtiType}类型，我为你生成了3种不同风格的表达方式：`,
          styleCards
        };

        setMessages(prev => [...prev, aiMsg]);
      } else {
        throw new Error('AI 返回数据格式不正确');
      }
    } catch (error) {
      console.error('生成失败:', error);
      setError(error instanceof Error ? error.message : '生成失败，请重试');
    } finally {
      setLoading(false);
      isGeneratingRef.current = false; // 生成结束
    }
  }, [mbtiType, selectedScene, toneSettings, contextInput, getContentRecommendation]);

  // 发送消息
  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    setError(null);
    setLoading(true);
    
    try {
      const userMsg: ChatMessage = {
        id: uuidv4(),
        role: 'user',
        content: input
      };
      
      setMessages(prev => [...prev, userMsg]);
      setInput('');
      
      let prompt = '';
      
      if (replyMode === 'card') {
        // 卡片模式 - 生成三种风格
        if (selectedScene === 'friends') {
          prompt = `用户追问：${input}
          
基于之前的朋友圈文案上下文，请完全化身为${mbtiType}性格类型的人，为这个追问生成3种不同的创意朋友圈文案。运用我的性格优势，创造独特表达。

【朋友圈专有风格】
1. 文艺诗意：运用诗意化描写、巧妙比喻、典故化用，富有意境
2. 创意文案：独特视角、巧妙表达、引人思考，展现才华  
3. 情感独白：真挚情感、内心表达、共鸣感强烈

请严格按照以下JSON格式输出，不要添加任何解释或额外文字：
{
  "styles": [
    {
      "title": "朋友圈风格名（从上述3种中选择）",
      "mood": "playful/natural/passionate 中的一个",
      "content": "简短创意朋友圈内容（20字内）",
      "recommend": "8字内推荐语"
    },
    {
      "title": "朋友圈风格名（从上述3种中选择）",
      "mood": "playful/natural/passionate 中的一个",
      "content": "简短创意朋友圈内容（20字内）",
      "recommend": "8字内推荐语"
    },
    {
      "title": "朋友圈风格名（从上述3种中选择）",
      "mood": "playful/natural/passionate 中的一个",
      "content": "简短创意朋友圈内容（20字内）",
      "recommend": "8字内推荐语"
    }
  ]
}

要求：
- 体现${mbtiType}的性格魅力
- 绝对禁止口语化对话
- 追求创意和文学性
- 字数严格控制在20字以内`;
        } else if (selectedScene === 'workplace') {
          prompt = `用户想要优化这句表达：${input}

请你完全化身为${mbtiType}性格类型的职场专家，运用我的性格优势，将用户这句表达优化为3种不同的专业职场沟通风格。只对用户的表达内容进行优化润色，不要改变原文语意，不要与用户对话或回应，绝对禁止AI自述、对话腔调。

【关键要求】
- 保持用户原始表达的语意和语境不变
- 只优化表达方式，不要变成其他语境
- 如果用户说"我将评价为优秀员工"，优化后仍是关于"我去评价别人为优秀员工"
- 不要输出括号及括号内的内容

【职场专有沟通风格】
1. 简洁汇报：三段式结构（进度/问题/下一步），逻辑清晰，重点突出
2. 数据支撑：融入统计数据、对比分析、量化结论，增强说服力
3. 积极推进：肯定现状→明确需求→行动号召，推动执行

请按照以下格式回复：

{
  "styles": [
    {
      "title": "简洁汇报",
      "content": "优化后的职场表达内容",
      "recommend": "8字内推荐语"
    },
    {
      "title": "数据支撑",
      "content": "优化后的职场表达内容", 
      "recommend": "8字内推荐语"
    },
    {
      "title": "积极推进",
      "content": "优化后的职场表达内容",
      "recommend": "8字内推荐语"
    }
  ]
}

要求：
- 体现${mbtiType}职场优势
- 语言要专业严谨，符合职场规范，禁止口语化
- 每个表达控制在80字以内`;
        } else {
          prompt = `用户想要优化这句表达：${input}

请你完全化身为${mbtiType}性格类型的人，运用我的性格优势，将用户这句表达优化为3种不同风格的表达建议。只对用户的表达内容进行优化润色，不要改变原文语意，不要与用户对话或回应，禁止AI自述、对话腔调，只输出优化后的表达本身。

【关键要求】
- 保持用户原始表达的语意和语境不变
- 只优化表达方式，不要变成其他语境
- 如果用户说"你可以撩拨我吗"，优化后仍是关于"请求撩拨"的表达，不是回应这个请求
- 如果用户说"我爱你"，优化后仍是表达"我爱你"，不是回应"我也爱你"
- 不要输出括号及括号内的内容

【风格要求】结合${mbtiType}性格特质：
1. 俏皮随意：体现性格的轻松活泼面
2. 自然平和：体现性格的稳重理性面  
3. 激动强烈：体现性格的热情坚定面

请按照以下格式回复：

{
  "styles": [
    {
      "title": "俏皮随意",
      "content": "优化后的表达内容",
      "recommend": "8字内推荐语"
    },
    {
      "title": "自然平和",
      "content": "优化后的表达内容", 
      "recommend": "8字内推荐语"
    },
    {
      "title": "激动强烈",
      "content": "优化后的表达内容",
      "recommend": "8字内推荐语"
    }
  ]
}

要求：
- 体现${mbtiType}优势
- 保持不同风格的差异性
- 语言要自然真实，避免AI腔调和对话
- 每个表达控制在50字以内`;
        }
      } else {
        // 聊天模式 - 单一风格表达优化
        const stylePrompt = selectedChatStyle === 'playful' ? '俏皮随意' : 
                           selectedChatStyle === 'passionate' ? '激动强烈' : '自然平和';
        
        prompt = `用户想要优化这句表达：${input}

请你完全化身为${mbtiType}性格类型的人，运用我的性格优势，将这句话优化为${stylePrompt}风格的表达。禁止AI自述、对话腔调，只输出优化后的表达本身。

要求：
- 不要与用户对话，只优化表达内容
- 体现${mbtiType}性格特质的${stylePrompt}面
- 语言要自然真实，避免AI腔调
- 控制在50字以内
- 保持原文的核心意思，只改善表达方式

直接输出优化后的表达内容，不要任何解释。`;
      }
      
      const response = await fetchAIResult(prompt);
      
      if (replyMode === 'card') {
        // 尝试解析JSON
        try {
          console.log('追问AI原始响应:', response);
          
          let cleanResponse = response.trim();
          cleanResponse = cleanResponse.replace(/```json\n?|\n?```/g, '');
          
          const jsonStart = cleanResponse.indexOf('{');
          const jsonEnd = cleanResponse.lastIndexOf('}');
          
          if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
            cleanResponse = cleanResponse.substring(jsonStart, jsonEnd + 1);
          }
          
          console.log('追问清理后的响应:', cleanResponse);
          const parsedResponse = JSON.parse(cleanResponse);
          
          if (parsedResponse.styles && Array.isArray(parsedResponse.styles)) {
            const styleCards: StyleCard[] = parsedResponse.styles.map((style: any, index: number) => {
              const intensity = getIntensityFromStyle(style);
              
              return {
                id: uuidv4(),
                title: style.title || `风格${index + 1}`,
                description: getCardGradient(intensity),
                content: style.content || '',
                recommend: style.recommend || getContentRecommendation(style.content || '', intensity as ChatStyle),
                bgGradient: '',
                intensity: intensity
              };
            });

            const aiMsg: ChatMessage = {
              id: uuidv4(),
              role: 'assistant',
              content: '基于你的追问，我提供了以下建议：',
              styleCards
            };

            setMessages(prev => [...prev, aiMsg]);
          } else {
            throw new Error('格式解析失败');
          }
        } catch (parseError) {
          console.error('追问JSON解析失败:', parseError);
          // JSON解析失败时，作为普通文本回复
          const aiMsg: ChatMessage = {
            id: uuidv4(),
            role: 'assistant',
            content: response
          };
          setMessages(prev => [...prev, aiMsg]);
        }
      } else {
        // 聊天模式，直接添加文本回复
        const aiMsg: ChatMessage = {
          id: uuidv4(),
          role: 'assistant', 
          content: response
        };
        setMessages(prev => [...prev, aiMsg]);
      }
    } catch (error) {
      console.error('发送失败:', error);
      setError(error instanceof Error ? error.message : '发送失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  // 复制功能
  const handleCopy = (content: string, cardId: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(cardId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // 切换按钮显示
  const toggleButtons = (cardId: string) => {
    setShowButtons(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  const getIntensityIcon = (intensity: string) => {
    switch (intensity) {
      case 'playful': return '🎈';
      case 'natural': return '🌿'; 
      case 'passionate': return '🔥';
      default: return '✨';
    }
  };

  const getCardGradient = (intensity: string) => {
    switch (intensity) {
      case 'playful': return 'from-pink-500/25 to-amber-500/25';
      case 'natural': return 'from-emerald-500/25 to-cyan-500/25';
      case 'passionate': return 'from-red-600/25 to-fuchsia-600/25';
      default: return 'from-purple-500/25 to-blue-500/25';
    }
  };

  const handleFavorite = (card: StyleCard) => {
    const newFavorite: GeneratedText = {
      id: card.id,
      text: card.content,
      tone: toneSettings,
      isFavorite: true,
      createdAt: new Date(),
      category: selectedScene || 'other',
    };
    addToFavorites(newFavorite);
    setFavoritedIds(prev => new Set(prev).add(card.id));
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8">
      {/* 恢复的 Header */}
      <header className="text-center space-y-2 md:space-y-4 mb-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white">
          像自己，又比自己更会说
        </h1>
        <h2 className="text-sm md:text-base lg:text-lg text-white/80">
          基于 {mbtiType} 性格特质 · {scenes.find(s => s.id === selectedScene)?.title || '日常表达'} 场景
        </h2>
      </header>

      {/* 重新设计的控件区域 */}
      <div className="flex flex-col md:flex-row items-start md:items-end gap-4 md:gap-6 mb-8 p-4 bg-slate-800/50 rounded-xl border border-white/10">
        <div className="w-full md:w-auto">
          <label className="block text-sm font-medium text-gray-300 mb-2 text-left">回复模式</label>
          <div className="flex items-center bg-slate-700/50 p-1 rounded-lg">
            <Button
              type={replyMode === 'card' ? 'primary' : 'secondary'}
              onClick={() => setReplyMode('card')}
              icon={<Layout className="w-4 h-4" />}
              className="flex-1 !py-2 !px-3"
            >
              卡片
            </Button>
            <Button
              type={replyMode === 'chat' ? 'primary' : 'secondary'}
              onClick={() => setReplyMode('chat')}
              icon={<MessageSquare className="w-4 h-4" />}
              className="flex-1 !py-2 !px-3"
            >
              聊天
            </Button>
          </div>
        </div>
        
        <div className="w-full md:w-auto">
          <label className="block text-sm font-medium text-gray-300 mb-2 text-left">MBTI 类型</label>
          <select
            value={mbtiType || ''}
            onChange={(e) => handleMbtiChange(e.target.value as MbtiType)}
            className="w-full bg-slate-700/50 text-white border border-transparent rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
          >
            {mbtiOptions.map(option => (
              <option key={option} value={option} className="bg-slate-800">
                {option === '在线测试' ? '重新测试' : option}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-grow"></div>

        <div className="w-full md:w-auto">
          <Button
            onClick={handleRegenerate}
            icon={<RefreshCw className="w-4 h-4" />}
            className="!py-2"
            fullWidth
          >
            重新生成
          </Button>
        </div>
      </div>

      {/* 对话窗格 - 响应式设计 */}
      <div className="flex justify-center">
        <div 
          ref={chatContainerRef}
          className="relative bg-gradient-to-br from-purple-900/60 to-indigo-900/40 rounded-xl md:rounded-2xl lg:rounded-3xl p-3 md:p-4 lg:p-6 border border-white/20 md:border-2 backdrop-blur-lg shadow-xl md:shadow-2xl shadow-purple-800/50 overflow-y-auto w-full max-w-sm md:max-w-2xl lg:max-w-4xl xl:max-w-5xl h-[300px] md:h-[400px] lg:h-[430px]"
          style={{
            position: 'relative',
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(147, 51, 234, 0.4) rgba(0, 0, 0, 0.1)'
          }}
        >
          {/* 顶部装饰线 */}
          <div className="absolute inset-x-0 top-0 h-px bg-white/10"></div>
          
          {messages.map(msg => (
            <div key={msg.id} className={`mb-3 md:mb-4 lg:mb-6 flex justify-start`}>
              {msg.role === 'user' ? (
                <div className="text-left max-w-[85%] md:max-w-[80%] px-3 md:px-4 py-2 md:py-3 rounded-xl md:rounded-2xl bg-gradient-to-r from-purple-500/90 to-blue-500/90 text-white shadow-lg md:shadow-xl border border-white/20 text-xs md:text-sm">
                  {msg.content}
                </div>
              ) : (
                <div className="max-w-full w-full">
                  {msg.styleCards ? (
                    <>
                      <div className="text-left mb-2 md:mb-4 text-purple-200 font-medium text-xs md:text-sm">{msg.content}</div>
                      
                      {/* StyleCard 网格 - 移动优先响应式设计 */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 lg:gap-4">
                        {msg.styleCards.map(card => (
                          <div key={card.id} className="group relative">
                            <div 
                              className={`flex flex-col h-full p-3 md:p-4 lg:p-6 rounded-lg md:rounded-xl lg:rounded-2xl bg-gradient-to-br ${getCardGradient(card.intensity)} backdrop-blur-lg border border-white/15 md:border-2 shadow-lg md:shadow-xl hover:-translate-y-1 hover:shadow-2xl transition-all duration-200 cursor-pointer`}
                              onClick={() => toggleButtons(card.id)}
                            >
                              {/* 头部 Bar */}
                              <div className="flex items-center justify-between mb-2 md:mb-3 lg:mb-4">
                                <div className="flex items-center">
                                  <h3 className="font-semibold text-white text-xs md:text-sm lg:text-base">{card.title}</h3>
                                </div>
                                
                                {/* 操作按钮组 */}
                                <div className={`flex gap-1 transition-opacity duration-200 ${showButtons[card.id] ? 'opacity-100' : 'opacity-100 md:opacity-60 lg:group-hover:opacity-100'}`}>
                                  <button 
                                    onClick={e => {e.stopPropagation(); handleCopy(card.content, card.id);}} 
                                    className="p-1.5 md:p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200" 
                                    title="复制内容"
                                    aria-label="复制内容"
                                  >
                                    {copiedId === card.id ? (
                                      <div className="w-2.5 h-2.5 md:w-3 md:h-3 text-green-300 font-bold text-xs">✓</div>
                                    ) : (
                                      <Copy className="w-2.5 h-2.5 md:w-3 md:h-3 text-white" />
                                    )}
                                  </button>
                                  <button 
                                    onClick={() => handleFavorite(card)}
                                    disabled={favoritedIds.has(card.id) || favorites.some(f => f.id === card.id)}
                                    className="p-1.5 md:p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200" 
                                    title="收藏表达"
                                    aria-label="收藏表达"
                                  >
                                    <Heart className={`w-2.5 h-2.5 md:w-3 md:h-3 ${favoritedIds.has(card.id) || favorites.some(f => f.id === card.id) ? 'text-pink-500 fill-current' : 'text-white'}`} />
                                  </button>
                                </div>
                              </div>
                              
                              {/* 正文区域 */}
                              <div className="flex-1 overflow-y-auto text-xs md:text-sm leading-relaxed text-white break-words max-h-20 md:max-h-24 lg:max-h-32 mb-2 md:mb-3 lg:mb-4">
                                <p>{card.content}</p>
                              </div>
                              
                              {/* Footer Tag */}
                              <div className="text-xs text-purple-200/80 text-center">
                                <span className="inline-block bg-white/10 px-2 md:px-3 py-0.5 md:py-1 rounded-full text-xs">
                                  {card.recommend}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="max-w-[95%] md:max-w-[90%] px-3 md:px-4 py-2 md:py-3 rounded-xl md:rounded-2xl bg-white/10 backdrop-blur-sm text-white border border-white/10">
                      <p className="leading-relaxed text-xs md:text-sm">{msg.content}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
          
          {loading && (
            <div className="flex justify-start mb-3 md:mb-4">
              <div className="max-w-[95%] md:max-w-[90%] px-3 md:px-4 py-2 md:py-3 rounded-xl md:rounded-2xl bg-white/10 backdrop-blur-sm text-white flex items-center gap-2">
                <Loader2 className="animate-spin w-3 h-3 md:w-4 md:h-4" />
                <span className="text-xs md:text-sm">AI 正在精心为你打造表达...</span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
      </div>

      {/* 错误提示 */}
      {error && (
        <div className="text-red-400 text-center p-3 md:p-4 bg-red-500/10 rounded-lg border border-red-500/20 max-w-full md:max-w-2xl mx-auto text-xs md:text-sm">
          {error}
        </div>
      )}

      {/* 底部输入区域和按钮 - Restored to bottom */}
      <div className="mt-auto pt-6 max-w-full md:max-w-4xl mx-auto">
        <form className="flex flex-col gap-3" onSubmit={e => { e.preventDefault(); handleSend(); }}>
          <div className="relative flex items-center">
            <input
              className="w-full rounded-lg md:rounded-xl px-4 md:px-6 py-3 md:py-4 bg-white/10 backdrop-blur-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400/50 border border-white/10 transition-all hover:bg-white/20 focus:bg-white/20 text-sm md:text-base pr-20"
              placeholder={`输入需要优化的表达...`}
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-purple-600/80 hover:bg-purple-700/80 text-white p-2 rounded-lg disabled:bg-gray-500/50 transition-colors"
              aria-label="发送"
            >
              <Send className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </form>
        
        {/* 底部返回按钮 */}
        <div className="flex justify-center gap-4 pt-4">
          <Button 
            type="secondary" 
            onClick={() => navigate('/app/input-context')}
            icon={<ArrowLeft className="w-3 h-3 md:w-4 md:h-4" />}
            className="px-4 md:px-6 py-2 text-xs md:text-sm transition-all hover:scale-105"
          >
            返回
          </Button>
          <Button 
            type="secondary"
            onClick={() => {localStorage.removeItem('currentUser'); navigate('/login');}}
            className="px-4 md:px-6 py-2 text-xs md:text-sm transition-all hover:scale-105"
          >
            回到登录
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;