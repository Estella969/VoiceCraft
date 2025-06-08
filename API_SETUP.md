# VoiceCraft API 配置说明

## 环境变量配置

为了保护API密钥安全，本项目使用环境变量来存储敏感信息。

### 设置步骤

1. **复制环境变量模板**
   ```bash
   cp .env.example .env.local
   ```

2. **编辑 .env.local 文件**
   在项目根目录找到 `.env.local` 文件，将 `your_openrouter_api_key_here` 替换为您的真实API密钥：

3. **获取 OpenRouter API Key**
   - 访问 [OpenRouter](https://openrouter.ai/)
   - 注册账户并获取API密钥
   - 确保您的账户有足够的额度

### 文件说明

- `.env.local` - 本地环境变量文件（包含敏感信息，不会被提交到Git）
- `.env.example` - 环境变量模板文件（可以安全提交到Git）
- `server.cjs` - 后端服务器文件（已配置为从环境变量读取API密钥）

### 安全提示

⚠️ **重要**: 
- 永远不要将真实的API密钥提交到Git仓库
- `.env.local` 文件已在 `.gitignore` 中被忽略
- 定期检查并轮换您的API密钥

### 启动项目

配置完成后，按正常流程启动项目：

```bash
# 启动后端服务器
node server.cjs

# 启动前端应用（新终端窗口）
npm run dev
```
