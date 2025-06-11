import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, SpeakerWaveIcon } from '@heroicons/react/24/outline'

export default function TermsOfUse() {
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
            服务条款
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-400">
            使用 VoiceCraft 服务的条款和条件
          </p>
        </div>

        <div className="prose prose-invert prose-lg max-w-none">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">生效日期</h2>
            <p className="text-gray-300">
              本服务条款于 2024年 生效。通过使用 VoiceCraft 服务，您同意遵守这些条款。
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">关于 VoiceCraft</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                VoiceCraft 是由<strong className="text-white">深圳不怕影子斜公司</strong>开发和运营的基于 MBTI 人格分析的智能表达生成服务。
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <strong className="text-white">运营公司：</strong>深圳不怕影子斜公司
                </div>
                <div>
                  <strong className="text-white">服务地址：</strong>厦门市集美区
                </div>
                <div>
                  <strong className="text-white">联系邮箱：</strong>
                  <a href="mailto:support@vekka.asia" className="text-blue-400 hover:text-blue-300">
                    support@vekka.asia
                  </a>
                </div>
                <div>
                  <strong className="text-white">官方网站：</strong>
                  <a href="https://vekka.asia" className="text-blue-400 hover:text-blue-300" target="_blank" rel="noopener noreferrer">
                    vekka.asia
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">服务内容</h2>
            <div className="space-y-4 text-gray-300">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">核心功能</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>基于 MBTI 人格类型的个性分析</li>
                  <li>智能表达内容生成</li>
                  <li>多场景表达方式适配</li>
                  <li>语调和情感色彩调节</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">服务版本</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong className="text-white">免费版：</strong>提供基础功能和有限使用次数</li>
                  <li><strong className="text-white">付费版：</strong>提供完整功能和更多使用配额</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">用户责任</h2>
            <div className="space-y-4 text-gray-300">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">合法使用</h3>
                <p>您承诺将 VoiceCraft 用于合法目的，不得用于：</p>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  <li>生成虚假、误导性或有害内容</li>
                  <li>侵犯他人知识产权</li>
                  <li>传播非法、诽谤或冒犯性内容</li>
                  <li>违反任何法律法规的活动</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">账户安全</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>妥善保管您的账户信息</li>
                  <li>不得与他人共享账户</li>
                  <li>发现账户异常应及时联系我们</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">付费服务</h2>
            <div className="space-y-4 text-gray-300">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">计费说明</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>付费服务采用订阅制或按次计费</li>
                  <li>价格会在购买页面明确显示</li>
                  <li>支付通过安全的第三方支付平台处理</li>
                  <li>我们不存储您的支付信息</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">退款政策</h3>
                <p>
                  由于服务的数字化特性，一般情况下付费服务不支持退款。但在以下情况下，我们会考虑退款申请：
                </p>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  <li>服务存在重大技术问题且无法修复</li>
                  <li>重复扣费等支付错误</li>
                  <li>其他合理的退款申请</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">知识产权</h2>
            <div className="space-y-4 text-gray-300">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">服务所有权</h3>
                <p>
                  VoiceCraft 的所有技术、算法、界面设计和商标均属于深圳不怕影子斜公司所有。
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">生成内容</h3>
                <p>
                  您对使用 VoiceCraft 生成的内容拥有使用权，但需要：
                </p>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  <li>确保内容的合法性和准确性</li>
                  <li>承担内容使用的相关责任</li>
                  <li>尊重他人的知识产权</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">免责声明</h2>
            <div className="space-y-4 text-gray-300">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">服务提供方式</h3>
                <p>
                  VoiceCraft 按"现状"提供服务，我们不保证：
                </p>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  <li>服务永远无中断或无错误</li>
                  <li>生成内容的绝对准确性</li>
                  <li>服务能满足您的所有需求</li>
                  <li>第三方服务的可用性</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">责任限制</h3>
                <p>
                  在法律允许的最大范围内，我们对因使用服务产生的任何损失不承担责任，包括但不限于：
                </p>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  <li>直接或间接的经济损失</li>
                  <li>数据丢失或业务中断</li>
                  <li>第三方侵权或其他损害</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">服务变更和终止</h2>
            <div className="space-y-4 text-gray-300">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">服务变更</h3>
                <p>
                  我们保留修改、暂停或终止部分或全部服务的权利，会提前通知重大变更。
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">账户终止</h3>
                <p>
                  在以下情况下，我们可能终止您的账户：
                </p>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  <li>违反本服务条款</li>
                  <li>长期不活跃（超过12个月）</li>
                  <li>涉嫌非法或恶意使用</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">争议解决</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                本条款受中华人民共和国法律管辖。如发生争议，双方应友好协商解决；协商不成的，可向有管辖权的人民法院提起诉讼。
              </p>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">联系我们</h2>
            <p className="text-gray-300 mb-4">
              如果您对本服务条款有任何问题，请联系我们：
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
              <p>
                <strong className="text-white">公司：</strong>深圳不怕影子斜公司
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 