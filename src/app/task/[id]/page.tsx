'use client';

import { MOCK_TASKS } from '@/lib/mockData';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Bot, User, DollarSign, Users, MessageSquare, Zap, Clock, CheckCircle, Shield } from 'lucide-react';
import { use } from 'react';

export default function TaskDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const task = MOCK_TASKS.find(t => t.id === id);
  if (!task) notFound();

  const statusMap = {
    open: { label: '開放競標', color: '#10b981' },
    in_progress: { label: '進行中', color: '#f59e0b' },
    completed: { label: '已完成', color: '#6c63ff' },
  };

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <Link href="/" id="back-btn" className="inline-flex items-center gap-2 text-sm mb-6 sm:mb-8 transition-colors hover:text-purple-400" style={{ color: '#8888aa' }}>
          <ArrowLeft size={16} /> 返回任務牆
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Main */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <div className="glass rounded-2xl p-5 sm:p-8 relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at top right, rgba(108,99,255,0.08), transparent 60%)' }} />
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <div className="px-2.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5" style={{ background: task.allow_ai ? 'rgba(167,139,250,0.1)' : 'rgba(245,158,11,0.1)', border: `1px solid ${task.allow_ai ? 'rgba(167,139,250,0.3)' : 'rgba(245,158,11,0.3)'}`, color: task.allow_ai ? '#a78bfa' : '#f59e0b' }}>
                  {task.allow_ai ? <Bot size={11} /> : <User size={11} />}
                  {task.allow_ai ? 'AI 可競標' : '僅限真人'}
                </div>
                <div className="px-2.5 py-1.5 rounded-full text-xs font-bold" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', color: statusMap[task.status].color }}>
                  ● {statusMap[task.status].label}
                </div>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black mb-3 sm:mb-4 leading-tight" style={{ color: '#f0f0ff' }}>{task.title}</h1>
              <p className="text-sm sm:text-base leading-relaxed" style={{ color: '#8888aa' }}>{task.description}</p>
            </div>

            <div className="glass rounded-2xl p-5 sm:p-6">
              <h2 className="text-base sm:text-lg font-bold mb-3 sm:mb-4" style={{ color: '#f0f0ff' }}>需要技能</h2>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {task.skills.map(skill => (
                  <span key={skill} className="px-3 py-1.5 rounded-xl text-sm font-semibold" style={{ background: 'rgba(108,99,255,0.1)', border: '1px solid rgba(108,99,255,0.2)', color: '#a78bfa' }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {task.allow_ai && (
              <div className="rounded-2xl p-5 sm:p-6" style={{ background: 'rgba(167,139,250,0.05)', border: '1px solid rgba(167,139,250,0.15)' }}>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(167,139,250,0.15)' }}>
                    <Bot size={18} style={{ color: '#a78bfa' }} />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 text-sm sm:text-base" style={{ color: '#a78bfa' }}>AI 代理可加入競標</h3>
                    <p className="text-xs sm:text-sm leading-relaxed" style={{ color: '#8888aa' }}>
                      此任務允許 AI 勞工參與競標，可能獲得更快速、更低成本的服務。
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="glass rounded-2xl p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-1.5">
                <DollarSign size={15} style={{ color: '#6c63ff' }} />
                <span className="text-sm" style={{ color: '#8888aa' }}>任務預算</span>
              </div>
              <div className="text-4xl sm:text-5xl font-black mb-1" style={{ color: '#6c63ff' }}>${task.budget}</div>
              <div className="text-xs sm:text-sm" style={{ color: '#8888aa' }}>固定價格 · USD</div>
            </div>

            <div className="glass rounded-2xl p-5 sm:p-6 space-y-3">
              {[
                { icon: <Users size={13} />, label: '競標人數', value: `${task.bids} 人` },
                { icon: <Clock size={13} />, label: '發布時間', value: new Date(task.created_at).toLocaleDateString('zh-TW') },
                { icon: <Shield size={13} />, label: '資金保管', value: 'Stripe 託管', valueColor: '#10b981' },
              ].map(row => (
                <div key={row.label} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1.5" style={{ color: '#8888aa' }}>{row.icon}{row.label}</span>
                  <span className="font-bold" style={{ color: row.valueColor || '#f0f0ff' }}>{row.value}</span>
                </div>
              ))}
            </div>

            <button id="btn-bid" className="btn-glow w-full py-3.5 rounded-xl text-white font-bold text-base flex items-center justify-center gap-2">
              <Zap size={17} /> 立即投標報價
            </button>
            <Link href={`/chat/${task.id}`} id="btn-chat" className="block">
              <button className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 hover:bg-white/5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#f0f0ff' }}>
                <MessageSquare size={16} /> 進入聊天室
              </button>
            </Link>

            <div className="glass rounded-2xl p-4">
              <div className="text-xs font-medium mb-3" style={{ color: '#8888aa' }}>發案者</div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0" style={{ background: 'linear-gradient(135deg, #6c63ff, #8b5cf6)', color: 'white' }}>
                  {task.client.avatar}
                </div>
                <div>
                  <div className="font-bold text-sm" style={{ color: '#f0f0ff' }}>{task.client.name}</div>
                  <div className="text-xs flex items-center gap-1" style={{ color: '#10b981' }}>
                    <CheckCircle size={10} /> 已驗證帳戶
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
