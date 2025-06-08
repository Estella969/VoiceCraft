import { SceneType } from '../context/AppContext';

export interface Scene {
  id: SceneType;
  title: string;
  description: string;
  icon: string;
  categories: {
    id: string;
    name: string;
    examples: string[];
  }[];
}

export const scenes: Scene[] = [
  {
    id: 'friends',
    title: '朋友圈文案',
    description: '生成适合各种心情和场景的朋友圈内容',
    icon: 'Megaphone',
    categories: [
      {
        id: 'post',
        name: '发布动态',
        examples: [
          '分享美食打卡',
          '记录生活点滴',
          '旅行游记分享'
        ]
      },
      {
        id: 'mood',
        name: '心情记录',
        examples: [
          '深夜感慨',
          '小确幸瞬间',
          '正能量分享'
        ]
      }
    ]
  },
  {
    id: 'daily',
    title: '日常表达',
    description: '日常社交和回应他人的内容',
    icon: 'Users',
    categories: [
      {
        id: 'reply',
        name: '回应赞美',
        examples: [
          '如何高情商回复',
          '幽默化解尴尬',
          '得体表达感谢'
        ]
      },
      {
        id: 'chat',
        name: '日常闲聊',
        examples: [
          '开启有趣话题',
          '如何接话茬',
          '有分寸的调侃'
        ]
      }
    ]
  },
  {
    id: 'relationship',
    title: '亲密关系表达',
    description: '处理与亲密关系中的沟通场景',
    icon: 'Heart',
    categories: [
      {
        id: 'argument',
        name: '帮我吵架',
        examples: [
          '理性表达不满',
          '据理力争',
          '化解冲突'
        ]
      },
      {
        id: 'conflict',
        name: '解决矛盾',
        examples: [
          '和解对话',
          '消除误会',
          '达成共识'
        ]
      },
      {
        id: 'love',
        name: '表达爱意',
        examples: [
          '甜蜜告白',
          '日常撒娇',
          '感恩感谢'
        ]
      }
    ]
  },
  {
    id: 'workplace',
    title: '职场沟通',
    description: '工作中的邮件往来与同事交流',
    icon: 'Briefcase',
    categories: [
      {
        id: 'email',
        name: '邮件往来',
        examples: [
          '请假申请',
          '工作汇报',
          '会议通知'
        ]
      },
      {
        id: 'chat',
        name: '同事交流',
        examples: [
          '工作协调',
          '任务分配',
          '意见反馈'
        ]
      }
    ]
  }
];