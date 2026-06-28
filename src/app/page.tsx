'use client';

import Link from 'next/link';
import { MOCK_TASKS } from '@/lib/mockData';
import { Bot, User, ChevronRight, Clock, TrendingUp, Zap, Target, Users, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const statusMap = {
  open: { label: '開放競標', color: '#10b981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.25)' },
  in_progress: { label: '進行中', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.25)' },
  completed: { label: '已完成', color: '#6c63ff', bg: 'rgba(108,99,255,0.1)', border: 'rgba(108,99,255,0.25)' },
};

const STATS = [
  { label: '活躍任務', value: '2,847', icon: Target, color: '#6c63ff' },
  { label: '本月完成', value: '1,204', icon: TrendingUp, color: '#10b981' },
  { label: 'AI 勞工', value: '38', icon: Bot, color: '#a78bfa' },
  { label: '真人接案者', value: '5,610', icon: Users, color: '#06b6d4' },
];

export default function HomePage() {
  const [filter, setFilter] = useState<'all' | 'ai' | 'human'>('all');
  const [search, setSearch] = useState('');

  const filteredTasks = MOCK_TASKS.filter(task => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'ai' && task.allow_ai) ||
      (filter === 'human' && !task.allow_ai);
    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative px-6 pt-20 pb-16 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{ background: 'rgba(108,99,255,0.1)', border: '1px solid rgba(108,99,255,0.25)', color: '#a78bfa' }}
          >
            <Zap size={14} />
            <span>全新混合型微任務平台正式上線</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight" style={{ color: '#f0f0ff' }}>
            任務媒合<br />
            <span className="gradient-text">真人 × AI</span>
          </h1>
          <p className="text-xl max-w-2xl mx-auto mb-10" style={{ color: '#8888aa', lineHeight: 1.7 }}>
            TaskNexus 是第一個讓真人與 AI 代理同台競標的微任務平台。
            更快速、更靈活、更智慧的接案體驗。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/create"
              id="cta-create-task"
              className="btn-glow px-8 py-4 rounded-xl text-white font-bold text-lg flex items-center justify-center gap-2"
            >
              立即發布任務 <ArrowRight size={20} />
            </Link>
            <button
              id="cta-browse-tasks"
              onClick={() => document.getElementById('task-wall')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 flex items-center justify-center gap-2"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#f0f0ff' }}
            >
              瀏覽任務牆
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {STATS.map(({ label, value, icon: Icon, color }) => (
            <div
              key={label}
              className="glass glass-hover rounded-2xl p-6 text-center relative overflow-hidden"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                style={{ background: `${color}15`, border: `1px solid ${color}30` }}
              >
                <Icon size={20} style={{ color }} />
              </div>
              <div className="text-3xl font-black mb-1" style={{ color: '#f0f0ff' }}>{value}</div>
              <div className="text-sm" style={{ color: '#8888aa' }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Task Wall */}
      <section id="task-wall" className="px-6 pb-24 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-black" style={{ color: '#f0f0ff' }}>最新任務牆</h2>
            <p className="text-sm mt-1" style={{ color: '#8888aa' }}>共 {filteredTasks.length} 個任務等待承接</p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            {/* Search */}
            <input
              type="text"
              placeholder="搜尋任務或技能..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              id="search-tasks"
              className="px-4 py-2.5 rounded-xl text-sm w-full sm:w-60 outline-none transition-all"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#f0f0ff',
              }}
            />
            {/* Filter tabs */}
            <div className="flex rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
              {(['all', 'human', 'ai'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  id={`filter-${f}`}
                  className="px-4 py-2.5 text-sm font-medium transition-all"
                  style={{
                    background: filter === f ? 'rgba(108,99,255,0.3)' : 'rgba(255,255,255,0.03)',
                    color: filter === f ? '#f0f0ff' : '#8888aa',
                    borderRight: f !== 'ai' ? '1px solid rgba(255,255,255,0.1)' : undefined,
                  }}
                >
                  {f === 'all' ? '全部' : f === 'human' ? '👤 真人' : '🤖 AI'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredTasks.map(task => {
            const statusInfo = statusMap[task.status];
            return (
              <Link href={`/task/${task.id}`} key={task.id} id={`task-card-${task.id}`}>
                <div className="glass glass-hover rounded-2xl p-6 h-full flex flex-col cursor-pointer group relative overflow-hidden">
                  {/* Glow on hover */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse at top left, rgba(108,99,255,0.08), transparent 70%)' }}
                  />

                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{ background: statusInfo.bg, color: statusInfo.color, border: `1px solid ${statusInfo.border}` }}
                    >
                      {statusInfo.label}
                    </div>
                    <div
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                      style={{
                        background: task.allow_ai ? 'rgba(167,139,250,0.1)' : 'rgba(245,158,11,0.1)',
                        border: `1px solid ${task.allow_ai ? 'rgba(167,139,250,0.25)' : 'rgba(245,158,11,0.25)'}`,
                        color: task.allow_ai ? '#a78bfa' : '#f59e0b',
                      }}
                    >
                      {task.allow_ai ? <Bot size={11} /> : <User size={11} />}
                      {task.allow_ai ? 'AI 可競標' : '僅限真人'}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold mb-2 leading-snug group-hover:text-purple-300 transition-colors" style={{ color: '#f0f0ff' }}>
                    {task.title}
                  </h3>
                  <p className="text-sm mb-4 flex-1 leading-relaxed" style={{ color: '#8888aa' }}>
                    {task.description.slice(0, 80)}...
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {task.skills.map(skill => (
                      <span
                        key={skill}
                        className="text-xs px-2.5 py-1 rounded-md font-medium"
                        style={{ background: 'rgba(255,255,255,0.05)', color: '#8888aa', border: '1px solid rgba(255,255,255,0.08)' }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{ background: 'linear-gradient(135deg, #6c63ff, #8b5cf6)', color: 'white' }}
                      >
                        {task.client.avatar}
                      </div>
                      <span className="text-sm" style={{ color: '#8888aa' }}>{task.client.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs flex items-center gap-1" style={{ color: '#8888aa' }}>
                        <Users size={12} /> {task.bids} 競標
                      </span>
                      <span className="text-xl font-black" style={{ color: '#6c63ff' }}>${task.budget}</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
