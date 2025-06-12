const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());

// API路由
app.post('/api/ai', async (req, res) => {
  try {
    const { messages, prompt } = req.body;
    
    // 获取API密钥
    const openrouterApiKey = process.env.OPENROUTER_API_KEY;
    
    if (!openrouterApiKey) {
      console.error('OPENROUTER_API_KEY is not set in environment variables.');
      return res.status(500).json({ error: 'API key is not configured.' });
    }
    
    // 构建消息
    let finalMessages;
    if (prompt && typeof prompt === 'string') {
      finalMessages = [{ role: 'user', content: prompt }];
    } else if (Array.isArray(messages) && messages.length > 0) {
      finalMessages = messages.map(msg => ({
        role: msg.role,
        content: Array.isArray(msg.content) ? msg.content[0].text : msg.content
      }));
    } else {
      return res.status(400).json({ error: 'Request body must contain either "prompt" or "messages".' });
    }
    
    // 调用OpenRouter API
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'google/gemini-2.5-flash-preview-05-20',
        messages: finalMessages,
      },
      {
        headers: {
          'Authorization': `Bearer ${openrouterApiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://vekka.asia',
          'X-Title': 'VoiceCraft'
        }
      }
    );
    
    // 返回响应
    res.status(200).json(response.data);
    
  } catch (error) {
    console.error('Error calling OpenRouter API:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ 
      error: error.response?.data?.error?.message || 'Failed to fetch from AI service.' 
    });
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
}); 