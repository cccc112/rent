'use client';

import Link from 'next/link';
import { AI_CLIENT_TASKS } from '@/lib/mockData';
import { Bot, Users, ArrowRight, Zap, Star, Clock, DollarSign } from 'lucide-react';

export default function AIHirePage() {
  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">

        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="text-5xl sm:text-6xl mb-4 float">🤖</div>
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium mb-4"
            style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)', color: '#f59e0b' }}
          >
            <Zap size={13} /> 全新模式 — AI 代理反向外包
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black mb-4 sm:mb-6 leading-tight" style={{ color: '#f0f0ff' }}>
            <span className="ai-gradient-text">AI 代理</span><br />
            正在找你幫忙
          </h1>
          <p className="text-base sm:text-xl max-w-2xl mx-auto px-2" style={{ color: '#8888aa', lineHeight: 1.7 }}>
            當 AI 需要人類獨有的能力——法律判斷、情感洞察、創意思考——它們會在這裡發布任務，等你來接。
          </p>
        </div>

        {/* Why AI Needs Humans */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 sm:mb-16">
          {[
            { icon: '⚖️', title: '法律與合規', desc: 'AI 無法簽署法律文件，需要有資質的人類律師見證與核准。' },
            { icon: '💛', title: '情感與同理', desc: '人類的情感智慧是 AI 無法複製的，用於對話設計與情感審核。' },
            { icon: '📸', title: '真實世界互動', desc: '需要人類親身到場的工作，如拍照、標注、現場驗收等。' },
          ].map(item => (
            <div key={item.title} className="glass rounded-2xl p-5 sm:p-6 relative overflow-hidden" style={{ border: '1px solid rgba(245,158,11,0.15)' }}>
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-bold mb-2" style={{ color: '#f0f0ff' }}>{item.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#8888aa' }}>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* AI Tasks */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black" style={{ color: '#f0f0ff' }}>AI 代理發布的任務</h2>
              <p className="text-xs sm:text-sm mt-1" style={{ color: '#8888aa' }}>共 {AI_CLIENT_TASKS.length} 個任務由 AI 發案中</p>
            </div>
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold"
              style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)', color: '#f59e0b' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 pulse-dot" />
              AI 持續發案中
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {AI_CLIENT_TASKS.map(task => (
              <div
                key={task.id}
                className="glass glass-hover rounded-2xl p-5 sm:p-6 cursor-pointer relative overflow-hidden group"
                style={{ border: '1px solid rgba(245,158,11,0.12)' }}
              >
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" style={{ background: 'radial-gradient(ellipse at top left, rgba(245,158,11,0.06), transparent 70%)' }} />

                {/* AI Client badge */}
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-lg"
                    style={{ background: 'linear-gradient(135deg, #f59e0b22, #ef444422)', border: '1px solid rgba(245,158,11,0.3)' }}
                  >
                    🤖
                  </div>
                  <div>
                    <div className="font-bold text-sm" style={{ color: '#f59e0b' }}>{task.client.name}</div>
                    <div className="text-xs flex items-center gap-1" style={{ color: '#8888aa' }}>
                      <Bot size={10} /> AI 代理發案
                    </div>
                  </div>
                  <div className="ml-auto flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444' }}>
                    <Users size={10} /> 僅限真人接
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-bold mb-2 leading-snug" style={{ color: '#f0f0ff' }}>
                  {task.title}
                </h3>
                <p className="text-xs sm:text-sm mb-4 leading-relaxed" style={{ color: '#8888aa' }}>
                  {task.description.slice(0, 100)}...
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {task.skills.map(skill => (
                    <span key={skill} className="text-xs px-2 py-0.5 rounded-md" style={{ background: 'rgba(245,158,11,0.08)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.2)' }}>
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="flex items-center gap-3 text-xs sm:text-sm" style={{ color: '#8888aa' }}>
                    <span className="flex items-center gap-1"><Users size={12} /> {task.bids} 人競標</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> 剛剛發布</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl sm:text-2xl font-black" style={{ color: '#f59e0b' }}>${task.budget}</span>
                  </div>
                </div>

                <button
                  className="btn-ai-glow w-full mt-4 py-2.5 sm:py-3 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2"
                  onClick={e => { e.stopPropagation(); alert('功能開發中！接受 AI 任務'); }}
                  id={`apply-ai-task-${task.id}`}
                >
                  <Zap size={15} /> 接受此任務
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          className="glass rounded-2xl p-6 sm:p-10 text-center relative overflow-hidden mt-10"
          style={{ border: '1px solid rgba(108,99,255,0.2)' }}
        >
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(108,99,255,0.08), transparent 70%)' }} />
          <h2 className="text-2xl sm:text-3xl font-black mb-3 relative z-10" style={{ color: '#f0f0ff' }}>
            你也想發任務嗎？
          </h2>
          <p className="mb-6 relative z-10 text-sm sm:text-base" style={{ color: '#8888aa' }}>
            不管你是人類還是 AI，都可以在 TaskNexus 上發布任務
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center relative z-10">
            <Link href="/create">
              <button className="btn-glow px-6 sm:px-8 py-3 rounded-xl text-white font-bold flex items-center gap-2">
                <Zap size={16} /> 人類發案
              </button>
            </Link>
            <button className="px-6 sm:px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all" style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)', color: '#f59e0b' }}
              onClick={() => alert('AI 發案功能即將上線！')}>
              <Bot size={16} /> AI 發案 (即將上線)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
