export async function fetchAIResult(prompt: string) {
  // 将字符串prompt转换为messages数组格式
  const messages = [
    {
      role: 'user',
      content: prompt
    }
  ];
  
  const res = await fetch('/api/ai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  });
  
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'AI请求失败');
  }
  
  const data = await res.json();
  // 返回AI回复的内容
  return data.choices?.[0]?.message?.content || '生成失败，请重试';
} 