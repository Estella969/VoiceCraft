import { Scene, scenes } from '../data/scenes';

interface Message {
  role: 'user' | 'assistant';
  content: {
    type: 'text';
    text: string;
  }[];
}

interface ApiResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

// 恢复原始配置：前端调用本地后端
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3002';

export async function generateResponse(prompt: string): Promise<string> {
  try {
    console.log('Calling backend API at:', `${API_BASE_URL}/api/ai`);
    
    const response = await fetch(`${API_BASE_URL}/api/ai`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: prompt
              }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data: ApiResponse = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating response:', error);
    throw error;
  }
}

export function generatePrompt(
  mbtiType: string,
  scene: string,
  category: string,
  tone: { restrained: number },
  context: string
): string {
  const emotionLevel = getEmotionLevel(tone.restrained);
  const mbtiStyle = getMbtiStyle(mbtiType);
  const sceneStyle = getSceneStyle(scene, category);
  
  let basePrompt = `作为一个${mbtiType}性格类型的人，在${scene}场景下，需要${sceneStyle}地表达以下内容：

${context}

要求：
- ${emotionLevel}
- ${mbtiStyle}
- 字数不超过50字
`;

  // 朋友圈场景特殊处理，需要更优美的表达
  if (scene === '朋友圈表达') {
    basePrompt += `
- 运用优美的修辞手法，可以是：
  * 诗意化的描写
  * 巧妙的比喻
  * 典故或谚语的化用
  * 富有意境的表达
- 避免直白的表达，追求文学性和艺术感
- 语言要优美流畅，带有诗意
- 可以适当融入古风元素或文学典故
`;
  } else {
    basePrompt += `
- 表达要清晰准确
- 语气要符合场景需求
- 重点突出，逻辑清晰
`;
  }

  return basePrompt + '\n直接返回内容，不要包含任何解释或标记。';
}

function getEmotionLevel(restrained: number): string {
  if (restrained >= 80) {
    return '情感强烈热烈，语气坚定有力';
  } else if (restrained >= 40) {
    return '情感自然平和，语气温和有度';
  } else {
    return '情感俏皮活泼，语气轻松愉快';
  }
}

function getMbtiStyle(mbtiType: string): string {
  const styles = {
    'INTJ': '用理性中带着深邃的思考，适当引用经典',
    'INTP': '用独特的视角和巧妙的比喻',
    'ENTJ': '用富有气势的表达，带领情绪',
    'ENTP': '用机智幽默的方式，巧妙转化',
    'INFJ': '用优美细腻的笔触，描绘内心',
    'INFP': '用梦幻浪漫的意象，表达感受',
    'ENFJ': '用温暖感人的话语，传递共鸣',
    'ENFP': '用活力四射的文字，感染他人',
    'ISTJ': '用简练优雅的表达，点到为止',
    'ISFJ': '用温柔细致的描写，表达关怀',
    'ESTJ': '用干练有力的句式，突出重点',
    'ESFJ': '用亲切温馨的语言，拉近距离',
    'ISTP': '用简洁利落的文字，暗含机锋',
    'ISFP': '用艺术感性的表达，突出美感',
    'ESTP': '用生动活泼的描述，带动气氛',
    'ESFP': '用轻快愉悦的语言，感染他人'
  };
  
  return styles[mbtiType as keyof typeof styles] || '用自然真诚的方式表达';
}

function getSceneStyle(scene: string, category: string): string {
  const styles: Record<string, Record<string, string>> = {
    '朋友圈表达': {
      'post': '优雅地记录生活，展现文采',
      'reply': '巧妙地互动回应，富有诗意'
    },
    '亲密关系表达': {
      'argument': '理性而坚定地表达立场',
      'conflict': '温和而坚定地化解矛盾',
      'love': '真挚而动人地传达情感'
    },
    '职场沟通': {
      'email': '专业而得体地进行沟通',
      'chat': '清晰而友善地交流工作'
    },
    '场景救援': {
      'awkward': '圆滑而巧妙地化解尴尬',
      'defense': '坚定而理性地维护立场'
    }
  };
  
  return styles[scene]?.[category] || '恰当地';
}