export interface MbtiQuestion {
  id: number;
  question: string;
  options: {
    a: { text: string; type: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P' };
    b: { text: string; type: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P' };
  };
}

// Simplified MBTI test with 8 questions
export const mbtiQuestions: MbtiQuestion[] = [
  {
    id: 1,
    question: "在社交场合中，你更倾向于：",
    options: {
      a: { text: "主动与他人交谈", type: "E" },
      b: { text: "等待他人来搭话", type: "I" }
    }
  },
  {
    id: 2,
    question: "做决定时，你更相信：",
    options: {
      a: { text: "具体的事实和经验", type: "S" },
      b: { text: "直觉和可能性", type: "N" }
    }
  },
  {
    id: 3,
    question: "处理问题时，你更看重：",
    options: {
      a: { text: "逻辑和公平", type: "T" },
      b: { text: "和谐与感受", type: "F" }
    }
  },
  {
    id: 4,
    question: "你更喜欢：",
    options: {
      a: { text: "按计划行事", type: "J" },
      b: { text: "随机应变", type: "P" }
    }
  },
  {
    id: 5,
    question: "与朋友相处时，你更喜欢：",
    options: {
      a: { text: "参加群体活动", type: "E" },
      b: { text: "一对一深入交谈", type: "I" }
    }
  },
  {
    id: 6,
    question: "你更关注：",
    options: {
      a: { text: "当下的实际情况", type: "S" },
      b: { text: "未来的可能性", type: "N" }
    }
  },
  {
    id: 7,
    question: "你认为更重要的是：",
    options: {
      a: { text: "保持客观理性", type: "T" },
      b: { text: "考虑他人感受", type: "F" }
    }
  },
  {
    id: 8,
    question: "工作时你更喜欢：",
    options: {
      a: { text: "明确的规划", type: "J" },
      b: { text: "灵活的安排", type: "P" }
    }
  }
];

export const mbtiDescriptions: { [key: string]: string } = {
  'INTJ': '独立思考的战略家',
  'INTP': '富有创造力的逻辑学家',
  'ENTJ': '果断的领导者',
  'ENTP': '善于辩论的创新者',
  'INFJ': '富有洞察力的理想主义者',
  'INFP': '敏感的梦想家',
  'ENFJ': '富有同理心的领袖',
  'ENFP': '热情洋溢的创意家',
  'ISTJ': '负责任的执行者',
  'ISFJ': '细心的守护者',
  'ESTJ': '高效的管理者',
  'ESFJ': '友善的协调者',
  'ISTP': '灵活的分析师',
  'ISFP': '艺术气质的探索者',
  'ESTP': '灵活的实干家',
  'ESFP': '活力四射的表演者'
};

export function calculateMbtiType(answers: { [key: number]: 'a' | 'b' }): string {
  const counts = {
    E: 0, I: 0,
    S: 0, N: 0,
    T: 0, F: 0,
    J: 0, P: 0
  };
  
  Object.entries(answers).forEach(([questionId, answer]) => {
    const question = mbtiQuestions.find(q => q.id === parseInt(questionId));
    if (question) {
      const type = question.options[answer].type;
      counts[type]++;
    }
  });
  
  return [
    counts.E > counts.I ? 'E' : 'I',
    counts.S > counts.N ? 'S' : 'N',
    counts.T > counts.F ? 'T' : 'F',
    counts.J > counts.P ? 'J' : 'P'
  ].join('');
}