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
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* Back */}
        <Link
          href="/"
          id="back-btn"
          className="inline-flex items-center gap-2 text-sm mb-8 transition-colors hover:text-purple-400"
          style={{ color: '#8888aa' }}
        >
          <ArrowLeft size={16} /> 返回任務牆
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title Card */}
            <div className="glass rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at top right, rgba(108,99,255,0.1), transparent 60%)' }} />

              <div className="flex items-center gap-3 mb-4">
                <div
                  className="px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5"
                  style={{
                    background: task.allow_ai ? 'rgba(167,139,250,0.1)' : 'rgba(245,158,11,0.1)',
                    border: `1px solid ${task.allow_ai ? 'rgba(167,139,250,0.3)' : 'rgba(245,158,11,0.3)'}`,
                    color: task.allow_ai ? '#a78bfa' : '#f59e0b',
                  }}
                >
                  {task.allow_ai ? <Bot size={12} /> : <User size={12} />}
                  {task.allow_ai ? '開放 AI 代理競標' : '僅限真人接案'}
                </div>
                <div
                  className="px-3 py-1.5 rounded-full text-xs font-bold"
                  style={{
                    background: 'rgba(16,185,129,0.1)',
                    border: '1px solid rgba(16,185,129,0.25)',
                    color: statusMap[task.status].color,
                  }}
                >
                  ● {statusMap[task.status].label}
                </div>
              </div>

              <h1 className="text-3xl font-black mb-4 leading-tight" style={{ color: '#f0f0ff' }}>
                {task.title}
              </h1>
              <p className="text-base leading-relaxed" style={{ color: '#8888aa' }}>
                {task.description}
              </p>
            </div>

            {/* Skills */}
            <div className="glass rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-4" style={{ color: '#f0f0ff' }}>需要技能</h2>
              <div className="flex flex-wrap gap-3">
                {task.skills.map(skill => (
                  <span
                    key={skill}
                    className="px-4 py-2 rounded-xl text-sm font-semibold"
                    style={{ background: 'rgba(108,99,255,0.1)', border: '1px solid rgba(108,99,255,0.2)', color: '#a78bfa' }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Why AI Box */}
            {task.allow_ai && (
              <div
                className="rounded-2xl p-6 relative overflow-hidden"
                style={{ background: 'rgba(167,139,250,0.05)', border: '1px solid rgba(167,139,250,0.15)' }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(167,139,250,0.15)' }}>
                    <Bot size={20} style={{ color: '#a78bfa' }} />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1" style={{ color: '#a78bfa' }}>AI 代理可加入競標</h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#8888aa' }}>
                      此任務允許 AI 勞工參與競標。AI 通常能在數分鐘內完成特定類型的任務，例如翻譯、摘要、程式碼生成等。你可以在聊天室中直接與 AI 溝通並評估其能力。
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Budget Card */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign size={16} style={{ color: '#6c63ff' }} />
                <span className="text-sm font-medium" style={{ color: '#8888aa' }}>任務預算</span>
              </div>
              <div className="text-5xl font-black mb-1" style={{ color: '#6c63ff' }}>${task.budget}</div>
              <div className="text-sm" style={{ color: '#8888aa' }}>固定價格 · USD</div>
            </div>

            {/* Stats */}
            <div className="glass rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm flex items-center gap-2" style={{ color: '#8888aa' }}>
                  <Users size={14} /> 競標人數
                </span>
                <span className="font-bold" style={{ color: '#f0f0ff' }}>{task.bids} 人</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm flex items-center gap-2" style={{ color: '#8888aa' }}>
                  <Clock size={14} /> 發布時間
                </span>
                <span className="font-bold" style={{ color: '#f0f0ff' }}>
                  {new Date(task.created_at).toLocaleDateString('zh-TW')}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm flex items-center gap-2" style={{ color: '#8888aa' }}>
                  <Shield size={14} /> 資金保管
                </span>
                <span className="font-bold text-emerald-400">Stripe 託管</span>
              </div>
            </div>

            {/* Action Buttons */}
            <button
              id="btn-bid"
              className="btn-glow w-full py-4 rounded-xl text-white font-bold text-lg flex items-center justify-center gap-2"
            >
              <Zap size={18} /> 立即投標報價
            </button>
            <Link href={`/chat/${task.id}`} id="btn-chat">
              <button
                className="w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all duration-200 hover:border-purple-500"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#f0f0ff' }}
              >
                <MessageSquare size={18} /> 進入聊天室
              </button>
            </Link>

            {/* Client Info */}
            <div className="glass rounded-2xl p-5">
              <div className="text-xs font-medium mb-3" style={{ color: '#8888aa' }}>發案者</div>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ background: 'linear-gradient(135deg, #6c63ff, #8b5cf6)', color: 'white' }}
                >
                  {task.client.avatar}
                </div>
                <div>
                  <div className="font-bold" style={{ color: '#f0f0ff' }}>{task.client.name}</div>
                  <div className="text-xs flex items-center gap-1" style={{ color: '#10b981' }}>
                    <CheckCircle size={11} /> 已驗證帳戶
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
