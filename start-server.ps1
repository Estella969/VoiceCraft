# 自动杀掉所有node进程
Get-Process node -ErrorAction SilentlyContinue | ForEach-Object { $_.Kill() }

# 设置API密钥并启动后端服务
$env:OPENROUTER_API_KEY = "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"

Write-Host "已设置 OPENROUTER_API_KEY，正在启动 server.cjs..."

node server.cjs 