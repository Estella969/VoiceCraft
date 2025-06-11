'use client'

import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, SpeakerWaveIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'

const navigation = [
  { name: '产品特色', href: '#features' },
  { name: '使用场景', href: '#scenes' },
  { name: '关于我们', href: '/about' },
  { name: '帮助', href: '#help' },
]

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleGetStarted = () => {
    navigate('/login')
  }

  const handleLearnMore = () => {
    navigate('/login')
  }

  const handleNavigation = (href: string) => {
    if (href.startsWith('/')) {
      navigate(href)
    } else {
      const element = document.querySelector(href)
      element?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="bg-slate-900 min-h-screen relative overflow-hidden">
      {/* 几何装饰元素 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-32 w-64 h-64 bg-gradient-to-br from-purple-500/15 to-pink-500/15 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-1/4 w-48 h-48 bg-gradient-to-br from-indigo-500/10 to-blue-500/10 rounded-full blur-xl"></div>
        
        {/* 几何多边形装饰 */}
        <div className="absolute top-1/4 right-1/3 w-32 h-32 transform rotate-45">
          <div className="w-full h-full bg-gradient-to-br from-blue-400/10 to-purple-400/10 clip-polygon"></div>
        </div>
        <div className="absolute bottom-1/3 left-1/4 w-24 h-24 transform -rotate-12">
          <div className="w-full h-full bg-gradient-to-br from-purple-400/8 to-pink-400/8 clip-polygon"></div>
        </div>
      </div>

      {/* 导航栏 - 优化更紧凑 */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav aria-label="Global" className="flex items-center justify-between p-4 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5 flex items-center space-x-3">
              <span className="sr-only">VoiceCraft</span>
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-xl shadow-lg">
                <SpeakerWaveIcon className="h-7 w-7 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-wide">VoiceCraft</span>
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-300 hover:text-white transition-colors"
            >
              <span className="sr-only">打开主菜单</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-8">
            {navigation.map((item) => (
              <button 
                key={item.name} 
                onClick={() => handleNavigation(item.href)}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group cursor-pointer"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <button 
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
            >
              开始体验
            </button>
          </div>
        </nav>

        {/* 移动端菜单 */}
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-slate-900/95 backdrop-blur-lg p-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5 flex items-center space-x-3">
                <span className="sr-only">VoiceCraft</span>
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                  <SpeakerWaveIcon className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">VoiceCraft</span>
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-300"
              >
                <span className="sr-only">关闭菜单</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => {
                        handleNavigation(item.href)
                        setMobileMenuOpen(false)
                      }}
                      className="-mx-3 block rounded-lg px-3 py-3 text-lg font-medium text-gray-300 hover:bg-white/10 hover:text-white transition-colors w-full text-left"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
                <div className="py-6">
                  <button
                    onClick={handleGetStarted}
                    className="-mx-3 block rounded-lg px-3 py-3 text-lg font-medium text-gray-300 hover:bg-white/10 w-full text-left"
                  >
                    开始体验
                  </button>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      {/* 主要内容区域 */}
      <main className="relative z-10">
        {/* Hero 部分 - 优化间距 */}
        <div className="relative isolate px-6 pt-16 lg:px-8 min-h-screen flex items-center">
          <div className="mx-auto max-w-6xl text-center">
            {/* 顶部标签 */}
            <div className="mb-6 sm:mb-8 flex justify-center">
              <div className="relative rounded-full px-4 py-2 text-sm text-blue-200 ring-1 ring-white/10 hover:ring-white/20 backdrop-blur-sm bg-white/5">
                🎉 基于MBTI的智能表达生成器现已上线
                <button onClick={handleLearnMore} className="ml-2 font-semibold text-blue-300 hover:text-white transition-colors">
                  了解更多 <span aria-hidden="true">&rarr;</span>
                </button>
              </div>
            </div>

            {/* 主标题 - 超大字体 */}
            <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight text-white mb-4 leading-tight">
              <span className="block">让AI读懂</span>
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                你的个性
              </span>
            </h1>

            {/* 副标题 - 确保不换行 */}
            <div className="text-xl sm:text-2xl lg:text-3xl text-gray-300 mb-6 leading-relaxed font-light px-4">
              <span className="inline-block">VoiceCraft 结合 MBTI 人格分析，为每个场景智能生成最适合你个性的表达方式</span>
            </div>

            {/* 描述文字 */}
            <p className="text-lg sm:text-xl text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed">
              无论是工作汇报、朋友圈发文，还是日常交流，让你的话语更有温度、更具说服力
            </p>

            {/* 按钮组 */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <button
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-2xl hover:from-blue-600 hover:to-purple-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 transition-all transform hover:scale-105 hover:shadow-blue-500/25"
              >
                立即开始体验
              </button>
              <button 
                onClick={handleLearnMore} 
                className="text-lg font-medium text-gray-300 hover:text-white transition-colors group"
              >
                了解更多 
                <span aria-hidden="true" className="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
              </button>
            </div>
          </div>
        </div>

        {/* 产品特色部分 */}
        <div id="features" className="py-24 sm:py-32 relative">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center mb-20">
              <h2 className="text-base font-semibold leading-7 text-blue-400 uppercase tracking-wide mb-4">核心功能</h2>
              <p className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
                为什么选择 
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent ml-4">
                  VoiceCraft
                </span>
              </p>
              <p className="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
                我们基于 MBTI 人格理论，结合 AI 技术，为你的每一次表达提供最贴切的个性化建议
              </p>
            </div>

            {/* 功能网格 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all hover:bg-white/10">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
                      <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3">MBTI 个性分析</h3>
                    <p className="text-gray-400 leading-relaxed text-lg">
                      基于16种人格类型，深度理解你的沟通偏好和表达风格，生成真正符合你个性的内容
                    </p>
                  </div>
                </div>
              </div>

              <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all hover:bg-white/10">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 shadow-lg">
                      <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3A2.25 2.25 0 008.25 5.25v3.131" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3">多场景适配</h3>
                    <p className="text-gray-400 leading-relaxed text-lg">
                      工作汇报、朋友圈发文、日常聊天...针对不同场景调整语调和表达方式
                    </p>
                  </div>
                </div>
              </div>

              <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all hover:bg-white/10">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-blue-600 shadow-lg">
                      <SpeakerWaveIcon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3">智能语调调节</h3>
                    <p className="text-gray-400 leading-relaxed text-lg">
                      从正式到轻松，从严肃到幽默，一键调节表达的语调和情感色彩
                    </p>
                  </div>
                </div>
              </div>

              <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all hover:bg-white/10">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-r from-pink-500 to-red-600 shadow-lg">
                      <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3">即时生成</h3>
                    <p className="text-gray-400 leading-relaxed text-lg">
                      输入关键信息，AI 瞬间生成多个版本的个性化表达，告别措辞困扰
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA 部分 */}
        <div className="relative py-24 sm:py-32">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm"></div>
          <div className="relative mx-auto max-w-4xl text-center px-6 lg:px-8">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-8">
              准备好开始你的
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                个性化表达之旅
              </span>
              了吗？
            </h2>
            <p className="text-xl sm:text-2xl text-gray-400 mb-12 leading-relaxed max-w-3xl mx-auto">
              加入我们，让 AI 读懂你的个性，让每一次表达都更有力量
            </p>
            <button
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-10 py-5 rounded-xl text-xl font-semibold shadow-2xl hover:from-blue-600 hover:to-purple-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 transition-all transform hover:scale-105 hover:shadow-blue-500/25"
            >
              免费开始使用
            </button>
          </div>
        </div>

        {/* 页脚链接 */}
        <footer className="bg-slate-800/50 border-t border-white/10">
          <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
            <div className="xl:grid xl:grid-cols-3 xl:gap-8">
              <div className="space-y-8">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-xl">
                    <SpeakerWaveIcon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-xl font-bold text-white">VoiceCraft</span>
                </div>
                <p className="text-sm leading-6 text-gray-400">
                  让AI读懂你的个性，定制专属表达方式
                </p>
              </div>
              <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                <div className="md:grid md:grid-cols-2 md:gap-8">
                  <div>
                    <h3 className="text-sm font-semibold leading-6 text-white">公司</h3>
                    <ul role="list" className="mt-6 space-y-4">
                      <li>
                        <button 
                          onClick={() => navigate('/about')}
                          className="text-sm leading-6 text-gray-400 hover:text-white transition-colors"
                        >
                          关于我们
                        </button>
                      </li>
                      <li>
                        <a href="mailto:support@vekka.asia" className="text-sm leading-6 text-gray-400 hover:text-white transition-colors">
                          联系我们
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-10 md:mt-0">
                    <h3 className="text-sm font-semibold leading-6 text-white">法律</h3>
                    <ul role="list" className="mt-6 space-y-4">
                      <li>
                        <button 
                          onClick={() => navigate('/privacy')}
                          className="text-sm leading-6 text-gray-400 hover:text-white transition-colors"
                        >
                          隐私政策
                        </button>
                      </li>
                      <li>
                        <button 
                          onClick={() => navigate('/terms')}
                          className="text-sm leading-6 text-gray-400 hover:text-white transition-colors"
                        >
                          服务条款
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
              <p className="text-xs leading-5 text-gray-400">
                &copy; 2024 深圳不怕影子斜公司. 保留所有权利.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
} 