'use client'

import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
  SpeakerWaveIcon,
  HeartIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  CheckIcon,
} from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'

const navigation = [
  { name: '关于我们', href: '#about' },
  { name: '产品特色', href: '#features' },
  { name: '价格', href: '#pricing' },
  { name: '隐私政策', href: '/privacy' },
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
    setMobileMenuOpen(false)
  }

  return (
    <div className="bg-slate-900 min-h-screen relative overflow-hidden">
      {/* 几何装饰元素 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-32 w-64 h-64 bg-gradient-to-br from-purple-500/15 to-pink-500/15 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-1/4 w-48 h-48 bg-gradient-to-br from-indigo-500/10 to-blue-500/10 rounded-full blur-xl"></div>
      </div>

      {/* 导航栏 */}
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
             {/* '开始体验' button removed per request */}
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
                      onClick={() => handleNavigation(item.href)}
                      className="-mx-3 block rounded-lg px-3 py-3 text-lg font-medium text-gray-300 hover:bg-white/10 hover:text-white transition-colors w-full text-left"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
                 <div className="py-6">
                    {/* '开始体验' button removed per request */}
                 </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      {/* 主要内容区域 */}
      <main className="relative z-10">
        {/* Hero 部分 - Restored to original */}
        <div className="relative isolate px-6 pt-16 lg:px-8 min-h-screen flex items-center">
          <div className="mx-auto max-w-6xl text-center">
            <div className="mb-6 sm:mb-8 flex justify-center">
              <div className="relative rounded-full px-4 py-2 text-sm text-blue-200 ring-1 ring-white/10 hover:ring-white/20 backdrop-blur-sm bg-white/5">
                🎉 基于MBTI的智能表达生成器现已上线
                <button onClick={handleLearnMore} className="ml-2 font-semibold text-blue-300 hover:text-white transition-colors">
                  了解更多 <span aria-hidden="true">&rarr;</span>
                </button>
              </div>
            </div>
            <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight text-white mb-4 leading-tight">
              <span className="block">让AI读懂</span>
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                你的个性
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed">
              无论是工作汇报、朋友圈发文，还是日常交流，让你的话语更有温度、更具说服力
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <button
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-2xl hover:from-blue-600 hover:to-purple-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 transition-all transform hover:scale-105 hover:shadow-blue-500/25"
              >
                开始体验
              </button>
            </div>
          </div>
        </div>

        {/* NEW Embedded About Us Section (Moved Up) */}
        <div id="about" className="py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            {/* 公司介绍 */}
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-white/10 mb-16">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-6">我们的故事</h2>
                  <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
                    <p>
                      VoiceCraft
                      诞生于一个简单而深刻的观察：每个人都有自己独特的表达方式，但在数字化时代，我们常常为如何恰当地表达自己而苦恼。
                    </p>
                    <p>
                      基于 MBTI
                      人格理论，我们开发了这款智能表达生成工具，希望帮助每个人找到最适合自己个性的沟通方式，让技术真正服务于人的个性化需求。
                    </p>
                    <p>我们相信，最好的 AI 不是要替代人类的表达，而是要放大人类个性的魅力。</p>
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
          </div>
        </div>

        {/* 产品特色部分 - 减少间距 */}
        <div id="features" className="py-20 sm:py-24 relative">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center mb-20">
              <h2 className="text-base font-semibold leading-7 text-blue-400 uppercase tracking-wide mb-4"></h2>
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
            {/* 功能网格 - Expanded to 4 items */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all hover:bg-white/10">
                <h3 className="text-2xl font-bold text-white mb-3">MBTI 个性分析</h3>
                <p className="text-gray-400 leading-relaxed text-lg">
                  基于16种人格类型，深度理解你的沟通偏好和表达风格。
                </p>
              </div>
              <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all hover:bg-white/10">
                <h3 className="text-2xl font-bold text-white mb-3">多场景适配</h3>
                <p className="text-gray-400 leading-relaxed text-lg">
                  工作汇报、朋友圈发文、日常聊天...针对不同场景调整语调。
                </p>
              </div>
              <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all hover:bg-white/10">
                <h3 className="text-2xl font-bold text-white mb-3">语气风格调整</h3>
                <p className="text-gray-400 leading-relaxed text-lg">
                  从俏皮、自然到专业、激情，精细控制每一次表达的情感强度。
                </p>
              </div>
              <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all hover:bg-white/10">
                <h3 className="text-2xl font-bold text-white mb-3">历史记录收藏</h3>
                <p className="text-gray-400 leading-relaxed text-lg">
                  轻松回顾和收藏每一次的灵感表达，构建你的专属个性化语料库。
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* NEW Pricing Section - Moved to bottom with 3 tiers */}
        <div id="pricing" className="py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center mb-16">
              <h2 className="text-base font-semibold leading-7 text-blue-400 uppercase tracking-wide"></h2>
              <p className="mt-2 text-4xl sm:text-5xl font-bold tracking-tight text-white">选择适合你的计划</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {/* Free Plan */}
              <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 flex flex-col h-full">
                <h3 className="text-2xl font-bold text-white">免费版</h3>
                <p className="mt-4 text-gray-400">基础功能，即刻开始体验。</p>
                <p className="mt-6 text-5xl font-bold text-white">
                  ¥0<span className="text-lg font-medium text-gray-400">/月</span>
                </p>
                <ul className="mt-8 space-y-4 text-gray-300">
                  <li className="flex items-center gap-2">
                    <CheckIcon className="w-5 h-5 text-green-400" /> 每日 10 次生成
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="w-5 h-5 text-green-400" /> 基础 MBTI 分析
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="w-5 h-5 text-green-400" /> 标准场景模板
                  </li>
                  <li className="flex items-center gap-2 text-gray-500">
                    <XMarkIcon className="w-5 h-5" /> 历史记录云同步
                  </li>
                </ul>
                <div className="mt-auto pt-8">
                  <button
                    onClick={handleGetStarted}
                    className="w-full bg-slate-700 text-white py-3 rounded-lg font-semibold hover:bg-slate-600 transition-colors"
                  >
                    开始使用
                  </button>
                </div>
              </div>

              {/* Pro Plan */}
              <div className="group bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl p-8 border-2 border-purple-400 flex flex-col shadow-2xl h-full transform scale-105">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold text-white">专业版</h3>
                  <span className="bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                    推荐
                  </span>
                </div>
                <p className="mt-4 text-purple-300">解锁全部高级功能，释放个性魅力。</p>
                <p className="mt-6 text-5xl font-bold text-white">
                  ¥29<span className="text-lg font-medium text-gray-400">/月</span>
                </p>
                <ul className="mt-8 space-y-4 text-gray-300">
                  <li className="flex items-center gap-2">
                    <CheckIcon className="w-5 h-5 text-green-400" /> 无限次生成
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="w-5 h-5 text-green-400" /> 深度 MBTI 分析与建议
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="w-5 h-5 text-green-400" /> 所有场景与语气模板
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="w-5 h-5 text-green-400" /> 历史记录云同步
                  </li>
                </ul>
                <div className="mt-auto pt-8">
                  <button
                    onClick={handleGetStarted}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105"
                  >
                    升级到专业版
                  </button>
                </div>
              </div>

              {/* Team Plan */}
              <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 flex flex-col h-full">
                <h3 className="text-2xl font-bold text-white">团队版</h3>
                <p className="mt-4 text-gray-400">协同合作，提升团队沟通效率。</p>
                <p className="mt-6 text-5xl font-bold text-white">
                  ¥99<span className="text-lg font-medium text-gray-400">/月/席</span>
                </p>
                <ul className="mt-8 space-y-4 text-gray-300">
                  <li className="flex items-center gap-2">
                    <CheckIcon className="w-5 h-5 text-green-400" /> 专业版所有功能
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="w-5 h-5 text-green-400" /> 团队成员管理
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="w-5 h-5 text-green-400" /> 共享语料库
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="w-5 h-5 text-green-400" /> 优先技术支持
                  </li>
                </ul>
                <div className="mt-auto pt-8">
                  <button
                    onClick={handleGetStarted}
                    className="w-full bg-slate-700 text-white py-3 rounded-lg font-semibold hover:bg-slate-600 transition-colors"
                  >
                    联系我们
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-slate-900/50 border-t border-white/10 mt-24">
        <div className="mx-auto max-w-7xl overflow-hidden px-6 py-12 sm:py-16 lg:px-8">
          <nav className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
            {navigation.map(item => (
              <div key={item.name} className="pb-6">
                <button
                  onClick={() => handleNavigation(item.href)}
                  className="text-sm leading-6 text-gray-400 hover:text-white transition-colors"
                >
                  {item.name}
                </button>
              </div>
            ))}
          </nav>
          <div className="mt-10 flex justify-center space-x-10">
            {/* Placeholder for social icons */}
            <a href="#" className="text-gray-500 hover:text-gray-400">
              <span className="sr-only">Facebook</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            {/* ... other social icons */}
          </div>
          <p className="mt-10 text-center text-xs leading-5 text-gray-500">
            &copy; 2025 VoiceCraft. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
} 