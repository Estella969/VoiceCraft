// Converted from .js to .cjs
//代码修改
const axios = require('axios');

module.exports = async (req, res) => {
  // 只允许 POST 请求
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    // 兼容旧格式和新格式
    const { prompt, messages: incomingMessages, scene, lang, tone } = req.body;

    let messages;

    // 优先使用 prompt 构建 messages
    if (prompt && typeof prompt === 'string') {
      messages = [{ role: 'user', content: prompt }];
    } else if (Array.isArray(incomingMessages) && incomingMessages.length > 0) {
      messages = incomingMessages;
    } else {
      return res.status(400).json({ error: 'Request body must contain either "prompt" or "messages".' });
    }
    
    const openrouterApiKey = process.env.OPENROUTER_API_KEY;
    
    if (!openrouterApiKey) {
      console.error('OPENROUTER_API_KEY is not set in Vercel environment variables.');
      return res.status(500).json({ error: 'API key is not configured.' });
    }
    
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'google/gemini-2.5-flash-preview-05-20',
        messages,
      },
      {
        headers: {
          'Authorization': `Bearer ${openrouterApiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://vekka.asia', // 您的生产环境域名
          'X-Title': 'VoiceCraft'
        }
      }
    );
 
    // 将 OpenRouter 的响应直接转发给客户端
    res.status(200).json(response.data);

  } catch (err) {
    console.error('Error proxying to OpenRouter:', err.response?.data || err.message);
    res.status(err.response?.status || 500).json({ 
      error: err.response?.data?.error?.message || 'Failed to fetch from AI service.' 
    });
  }
}; 