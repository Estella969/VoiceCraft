import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, SpeakerWaveIcon } from '@heroicons/react/24/outline'

export default function PrivacyPolicy() {
  const navigate = useNavigate()

  return (
    <div className="bg-slate-900 min-h-screen">
      {/* 导航栏 */}
      <header className="border-b border-white/10">
        <nav className="mx-auto max-w-7xl px-6 lg:px-8" aria-label="Global">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeftIcon className="h-5 w-5" />
                <span>返回首页</span>
              </button>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-xl">
                <SpeakerWaveIcon className="h-6 w-6 text-white" />
              </div>
              <span className="text-lg font-bold text-white">VoiceCraft</span>
            </div>
          </div>
        </nav>
      </header>

      {/* 主要内容 */}
      <main className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            隐私政策
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-400">
            我们重视并保护您的隐私权
          </p>
        </div>

        <div className="prose prose-invert prose-lg max-w-none">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">生效日期</h2>
            <p className="text-gray-300">
              本隐私政策于 2024年 生效，并将持续有效，直至我们发布新版本。
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">关于我们</h2>
            <p className="text-gray-300 mb-4">
              VoiceCraft 是由<strong className="text-white">深圳不怕影子斜公司</strong>开发和运营的智能表达生成服务。
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-gray-300">
              <div>
                <strong className="text-white">公司地址：</strong>
                <br />厦门市集美区
              </div>
              <div>
                <strong className="text-white">联系邮箱：</strong>
                <br />
                <a href="mailto:support@vekka.asia" className="text-blue-400 hover:text-blue-300">
                  support@vekka.asia
                </a>
              </div>
              <div>
                <strong className="text-white">官方网站：</strong>
                <br />
                <a href="https://vekka.asia" className="text-blue-400 hover:text-blue-300" target="_blank" rel="noopener noreferrer">
                  vekka.asia
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">数据收集和使用</h2>
            <div className="space-y-4 text-gray-300">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">我们不收集用户个人数据</h3>
                <p>
                  我们承诺<strong className="text-white">不会收集、存储或处理您的个人身份信息</strong>。VoiceCraft 的设计理念是保护用户隐私，让您可以安心使用我们的服务。
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">MBTI 测试数据</h3>
                <p>
                  当您进行 MBTI 人格测试时，我们只在您的设备本地处理测试结果，用于为您生成个性化的表达建议。这些数据不会上传到我们的服务器。
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-2">生成的内容</h3>
                <p>
                  您使用 VoiceCraft 生成的文本内容仅在生成过程中临时处理，不会被永久存储或用于其他目的。
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">服务类型</h2>
            <div className="space-y-4 text-gray-300">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">免费版本</h3>
                <p>
                  我们提供免费版本，让用户体验基本的 AI 表达生成功能。
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">付费版本</h3>
                <p>
                  付费版本提供更高级的功能和更多的使用次数。所有付费信息都通过安全的第三方支付平台处理，我们不存储您的支付信息。
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Cookies 和分析</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                我们使用必要的 Cookies 来确保网站正常运行，以及匿名分析工具来改善服务质量。这些工具不会收集可识别个人身份的信息。
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>功能性 Cookies：保存您的偏好设置</li>
                <li>分析 Cookies：了解网站使用情况（匿名数据）</li>
                <li>您可以在浏览器设置中管理 Cookies</li>
              </ul>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">数据安全</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                尽管我们不收集个人数据，但我们仍然采取以下措施保护您的使用体验：
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>使用 HTTPS 加密连接</li>
                <li>定期更新安全措施</li>
                <li>限制对系统的访问权限</li>
                <li>监控异常活动</li>
              </ul>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">您的权利</h2>
            <div className="space-y-4 text-gray-300">
              <p>作为用户，您享有以下权利：</p>
              <ul className="list-disc list-inside space-y-2">
                <li>随时停止使用我们的服务</li>
                <li>清除浏览器中的 Cookies</li>
                <li>询问我们的数据处理方式</li>
                <li>对我们的隐私实践提出建议</li>
              </ul>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">政策更新</h2>
            <p className="text-gray-300">
              我们可能会不时更新本隐私政策。任何重大变更都会在网站上明显位置发布通知，并更新本页面的生效日期。
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">联系我们</h2>
            <p className="text-gray-300 mb-4">
              如果您对本隐私政策有任何问题或疑虑，请通过以下方式联系我们：
            </p>
            <div className="space-y-2 text-gray-300">
              <p>
                <strong className="text-white">邮箱：</strong>
                <a href="mailto:support@vekka.asia" className="text-blue-400 hover:text-blue-300 ml-2">
                  support@vekka.asia
                </a>
              </p>
              <p>
                <strong className="text-white">网站：</strong>
                <a href="https://vekka.asia" className="text-blue-400 hover:text-blue-300 ml-2" target="_blank" rel="noopener noreferrer">
                  vekka.asia
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 