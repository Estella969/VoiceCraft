import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, SpeakerWaveIcon, HeartIcon, LightBulbIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'

export default function About() {
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
      <main className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        {/* Hero 部分 */}
        <div className="text-center mb-20">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
            关于 VoiceCraft
          </h1>
          <p className="text-xl sm:text-2xl text-gray-400 leading-relaxed max-w-4xl mx-auto">
            我们致力于让 AI 技术真正理解每个人的独特个性，为每一次表达注入温度与力量
          </p>
        </div>

        {/* 公司介绍 */}
        <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-white/10 mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">我们的故事</h2>
              <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
                <p>
                  VoiceCraft 诞生于一个简单而深刻的观察：每个人都有自己独特的表达方式，但在数字化时代，我们常常为如何恰当地表达自己而苦恼。
                </p>
                <p>
                  基于 MBTI 人格理论，我们开发了这款智能表达生成工具，希望帮助每个人找到最适合自己个性的沟通方式，让技术真正服务于人的个性化需求。
                </p>
                <p>
                  我们相信，最好的 AI 不是要替代人类的表达，而是要放大人类个性的魅力。
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl blur-xl"></div>
              <div className="relative bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-8 border border-white/20">
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-white mb-2">16</div>
                    <div className="text-gray-400">人格类型</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white mb-2">∞</div>
                    <div className="text-gray-400">表达可能</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white mb-2">AI</div>
                    <div className="text-gray-400">智能分析</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white mb-2">❤️</div>
                    <div className="text-gray-400">用户至上</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 核心价值观 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">我们的价值观</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <HeartIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">以人为本</h3>
              <p className="text-gray-400 leading-relaxed">
                技术应该服务于人的个性化需求，而不是让人适应技术。我们始终将用户体验放在第一位。
              </p>
            </div>

            <div className="text-center group">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <LightBulbIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">持续创新</h3>
              <p className="text-gray-400 leading-relaxed">
                我们不断探索 AI 技术与人格心理学的结合，为用户带来更加精准和个性化的服务体验。
              </p>
            </div>

            <div className="text-center group">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheckIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">隐私保护</h3>
              <p className="text-gray-400 leading-relaxed">
                我们承诺不收集用户个人数据，让您可以安心使用我们的服务，保护您的隐私安全。
              </p>
            </div>
          </div>
        </div>

        {/* 公司信息 */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">公司信息</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">公司名称</h3>
                <p className="text-gray-300">深圳不怕影子斜公司</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">注册地址</h3>
                <p className="text-gray-300">厦门市集美区</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">成立时间</h3>
                <p className="text-gray-300">2024年</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">主营业务</h3>
                <p className="text-gray-300">AI 智能表达生成服务</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">联系我们</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">客服邮箱</h3>
                <a href="mailto:support@vekka.asia" className="text-blue-400 hover:text-blue-300 transition-colors">
                  support@vekka.asia
                </a>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">官方网站</h3>
                <a href="https://vekka.asia" className="text-blue-400 hover:text-blue-300 transition-colors" target="_blank" rel="noopener noreferrer">
                  vekka.asia
                </a>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">服务时间</h3>
                <p className="text-gray-300">7×24 小时在线服务</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">响应时间</h3>
                <p className="text-gray-300">通常在 24 小时内回复</p>
              </div>
            </div>
          </div>
        </div>

        {/* 服务特色 */}
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-white/10 mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">为什么选择我们</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-lg font-bold text-white mb-2">专业人格分析</h3>
              <p className="text-gray-300 text-sm">基于科学的 MBTI 理论</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-lg font-bold text-white mb-2">即时生成</h3>
              <p className="text-gray-300 text-sm">秒级响应，高效便捷</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-lg font-bold text-white mb-2">精准适配</h3>
              <p className="text-gray-300 text-sm">多场景智能切换</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-lg font-bold text-white mb-2">隐私安全</h3>
              <p className="text-gray-300 text-sm">不收集个人数据</p>
            </div>
          </div>
        </div>

        {/* 未来展望 */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-6">未来展望</h2>
          <p className="text-xl text-gray-400 leading-relaxed max-w-4xl mx-auto mb-8">
            我们将继续深耕 AI 技术与人格心理学的融合，不断优化算法精度，扩展应用场景，
            致力于成为全球领先的个性化 AI 表达服务平台。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/login')}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-2xl hover:from-blue-600 hover:to-purple-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 transition-all transform hover:scale-105"
            >
              立即体验 VoiceCraft
            </button>
            <button
              onClick={() => navigate('/privacy')}
              className="text-lg font-medium text-gray-300 hover:text-white transition-colors"
            >
              了解隐私政策
            </button>
          </div>
        </div>
      </main>
    </div>
  )
} 