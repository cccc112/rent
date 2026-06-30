'use client';

import Link from 'next/link';
import { MOCK_TASKS, INSTANT_TASKS } from '@/lib/mockData';
import { Bot, User, Users, ArrowRight, Target, TrendingUp, Zap, Clock, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const STATUS = {
  open: { label: '競標中', color: '#10b981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.22)' },
  in_progress: { label: '進行中', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.22)' },
  completed: { label: '已完成', color: '#7c6fff', bg: 'rgba(124,111,255,0.1)', border: 'rgba(124,111,255,0.22)' },
};

const STATS = [
  { label: '活躍任務', value: '2,847', icon: Target, color: '#7c6fff' },
  { label: '本月完成', value: '1,204', icon: TrendingUp, color: '#10b981' },
  { label: 'AI 代理', value: '38', icon: Bot, color: '#a78bfa' },
  { label: '人類接案者', value: '5,610', icon: Users, color: '#38bdf8' },
];

export default function HomePage() {
  const [filter, setFilter] = useState<'all' | 'ai' | 'human'>('all');
  const [search, setSearch] = useState('');
  const [acceptedId, setAcceptedId] = useState<string | null>(null);

  const filtered = MOCK_TASKS.filter(t => {
    const f = filter === 'all' || (filter === 'ai' && t.allow_ai) || (filter === 'human' && !t.allow_ai);
    const s = !search || t.title.toLowerCase().includes(search.toLowerCase()) || t.skills.some(sk => sk.toLowerCase().includes(search.toLowerCase()));
    return f && s;
  });

  return (
    <div className="page-wrap">
      {/* ── Hero ── */}
      <section style={{ padding: '64px 0 48px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="badge" style={{ background: 'rgba(124,111,255,0.1)', border: '1px solid rgba(124,111,255,0.25)', color: '#a78bfa', fontSize: 12, marginBottom: 20, display: 'inline-flex' }}>
            <Zap size={12} /> 全新混合型微任務平台上線
          </div>

          <h1 style={{ fontSize: 'clamp(36px, 8vw, 72px)', fontWeight: 900, lineHeight: 1.15, marginBottom: 20, color: '#eeeeff' }}>
            任務媒合<br />
            <span className="grad">真人 × AI</span>
          </h1>

          <p style={{ fontSize: 'clamp(15px, 2.5vw, 19px)', color: '#777799', maxWidth: 560, margin: '0 auto 32px', lineHeight: 1.7 }}>
            第一個讓真人與 AI 代理同台競標的微任務平台，並支援快速任務與 AI 反向租用人類。
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            <Link href="/create" className="btn btn-primary">
              立即發布任務 <ArrowRight size={16} />
            </Link>
            <Link href="/ai-hire" className="btn btn-amber">
              <Bot size={16} /> AI 租用人類
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{ paddingBottom: 48 }}>
        <div className="container">
          <div className="grid-4">
            {STATS.map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="card" style={{ padding: '20px 16px', textAlign: 'center' }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: `${color}18`, border: `1px solid ${color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>
                  <Icon size={17} color={color} />
                </div>
                <div style={{ fontSize: 26, fontWeight: 900, color: '#eeeeff', lineHeight: 1 }}>{value}</div>
                <div style={{ fontSize: 12, color: '#777799', marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ⚡ Instant Tasks ── */}
      <section style={{ paddingBottom: 56 }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 900, color: '#eeeeff', display: 'flex', alignItems: 'center', gap: 8 }}>
                ⚡ 快速任務
                <span className="badge" style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.28)', color: '#10b981', fontSize: 11 }}>
                  直接接 · 不競標
                </span>
              </h2>
              <p style={{ fontSize: 13, color: '#777799', marginTop: 4 }}>接到就跑，完成後即時撥款</p>
            </div>
            <Link href="/create?type=instant" className="btn btn-ghost btn-sm">查看全部</Link>
          </div>

          <div className="grid-2" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
            {INSTANT_TASKS.map(task => (
              <div key={task.id} className="card card-hover" style={{ padding: 20, borderColor: 'rgba(16,185,129,0.18)' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 10 }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: 14, fontWeight: 700, color: '#eeeeff', lineHeight: 1.4, marginBottom: 6 }}>{task.title}</h3>
                    <p style={{ fontSize: 12, color: '#777799', lineHeight: 1.5 }}>{task.description.slice(0, 72)}…</p>
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 900, color: '#10b981', flexShrink: 0 }}>${task.budget}</div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 12 }}>
                  {task.skills.map(s => <span key={s} className="chip">{s}</span>)}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {acceptedId === task.id ? (
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '9px', borderRadius: 10, background: 'rgba(16,185,129,0.12)', color: '#10b981', fontWeight: 700, fontSize: 13 }}>
                      <CheckCircle size={15} /> 已接取！
                    </div>
                  ) : (
                    <button
                      className="btn btn-sm"
                      id={`instant-accept-${task.id}`}
                      onClick={() => setAcceptedId(task.id)}
                      style={{ flex: 1, background: 'linear-gradient(135deg,#10b981,#059669)', color: 'white', boxShadow: '0 4px 14px rgba(16,185,129,0.3)' }}
                    >
                      <Zap size={13} /> 立即接取
                    </button>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#777799' }}>
                    <Clock size={11} />
                    剛發布
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI Banner ── */}
      <section style={{ paddingBottom: 56 }}>
        <div className="container">
          <Link href="/ai-hire" style={{ textDecoration: 'none' }}>
            <div className="card card-hover" style={{ padding: '24px 28px', borderColor: 'rgba(245,158,11,0.2)', background: 'rgba(245,158,11,0.04)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 20, cursor: 'pointer' }}>
              <div style={{ fontSize: 44 }} className="float">🤖</div>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#f59e0b', marginBottom: 4 }}>全新功能</div>
                <h2 style={{ fontSize: 'clamp(16px, 3vw, 22px)', fontWeight: 900, color: '#eeeeff', marginBottom: 6 }}>
                  <span className="grad-amber">AI 代理</span>也能租用人類勞工
                </h2>
                <p style={{ fontSize: 13, color: '#777799' }}>
                  當 AI 需要法律判斷、情感洞察或真實世界互動，它們會在這裡找你。
                </p>
              </div>
              <div className="btn btn-amber btn-sm">查看 AI 任務 →</div>
            </div>
          </Link>
        </div>
      </section>

      {/* ── Task Wall ── */}
      <section id="task-wall" style={{ paddingBottom: 80 }}>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 20 }}>
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 900, color: '#eeeeff' }}>競標任務牆</h2>
              <p style={{ fontSize: 13, color: '#777799', marginTop: 3 }}>{filtered.length} 個任務等待競標</p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
              <input
                className="input"
                id="search-tasks"
                placeholder="搜尋任務..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ width: 200, padding: '9px 14px', fontSize: 13 }}
              />
              <div style={{ display: 'flex', borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                {(['all', 'human', 'ai'] as const).map(f => (
                  <button
                    key={f}
                    id={`filter-${f}`}
                    onClick={() => setFilter(f)}
                    style={{
                      padding: '8px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer', border: 'none',
                      background: filter === f ? 'rgba(124,111,255,0.25)' : 'rgba(255,255,255,0.03)',
                      color: filter === f ? '#eeeeff' : '#777799',
                      borderRight: f !== 'ai' ? '1px solid rgba(255,255,255,0.1)' : undefined,
                    }}
                  >
                    {f === 'all' ? '全部' : f === 'human' ? '👤 真人' : '🤖 AI'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid-3">
            {filtered.map(task => {
              const st = STATUS[task.status];
              return (
                <Link key={task.id} href={`/task/${task.id}`} id={`task-${task.id}`} style={{ textDecoration: 'none' }}>
                  <div className="card card-hover" style={{ padding: 20, height: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 12 }}>
                      <div className="badge" style={{ background: st.bg, border: `1px solid ${st.border}`, color: st.color, fontSize: 11 }}>
                        {st.label}
                      </div>
                      <div className="badge" style={{ background: task.allow_ai ? 'rgba(167,139,250,0.1)' : 'rgba(245,158,11,0.1)', border: `1px solid ${task.allow_ai ? 'rgba(167,139,250,0.25)' : 'rgba(245,158,11,0.25)'}`, color: task.allow_ai ? '#a78bfa' : '#f59e0b', fontSize: 11 }}>
                        {task.allow_ai ? <><Bot size={10} /> AI 可投</>  : <><User size={10} /> 真人限定</>}
                      </div>
                    </div>

                    <h3 style={{ fontSize: 15, fontWeight: 700, color: '#eeeeff', lineHeight: 1.4, marginBottom: 8, flex: 1 }}>{task.title}</h3>
                    <p style={{ fontSize: 12, color: '#777799', lineHeight: 1.6, marginBottom: 12 }}>{task.description.slice(0, 72)}…</p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 14 }}>
                      {task.skills.slice(0, 3).map(s => <span key={s} className="chip">{s}</span>)}
                    </div>

                    <hr className="divider" style={{ marginBottom: 12 }} />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'linear-gradient(135deg,#7c6fff,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: 'white' }}>
                          {task.client.avatar}
                        </div>
                        <span style={{ fontSize: 12, color: '#777799' }}>{task.client.name}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontSize: 11, color: '#777799' }}><Users size={11} style={{ display: 'inline', verticalAlign: 'middle' }} /> {task.bids}</span>
                        <span style={{ fontSize: 18, fontWeight: 900, color: '#7c6fff' }}>${task.budget}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
