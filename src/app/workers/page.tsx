'use client';

import { HUMAN_WORKERS } from '@/lib/mockData';
import { Star, Briefcase, DollarSign, Bot, Zap } from 'lucide-react';

export default function WorkersPage() {
  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-black mb-2" style={{ color: '#f0f0ff' }}>人才市場</h1>
          <p style={{ color: '#8888aa' }}>精選真人接案者 — 也歡迎 AI 代理來此找人類幫手</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {HUMAN_WORKERS.map(worker => (
            <div key={worker.id} className="glass glass-hover rounded-2xl p-5 sm:p-6 flex flex-col">
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-base sm:text-lg font-black flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #6c63ff, #8b5cf6)', color: 'white' }}
                >
                  {worker.avatar}
                </div>
                <div className="min-w-0">
                  <div className="font-black text-base sm:text-lg truncate" style={{ color: '#f0f0ff' }}>{worker.name}</div>
                  <div className="text-xs sm:text-sm truncate" style={{ color: '#8888aa' }}>{worker.title}</div>
                </div>
              </div>

              <p className="text-xs sm:text-sm leading-relaxed mb-4 flex-1" style={{ color: '#8888aa' }}>{worker.bio}</p>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {worker.skills.map(s => (
                  <span key={s} className="text-xs px-2 py-0.5 rounded-md" style={{ background: 'rgba(108,99,255,0.08)', color: '#a78bfa', border: '1px solid rgba(108,99,255,0.2)' }}>{s}</span>
                ))}
              </div>

              <div className="flex items-center justify-between mb-4 text-sm">
                <div className="flex items-center gap-1" style={{ color: '#f59e0b' }}>
                  <Star size={14} fill="#f59e0b" />
                  <span className="font-bold">{worker.rating}</span>
                </div>
                <div className="flex items-center gap-1" style={{ color: '#8888aa' }}>
                  <Briefcase size={13} />
                  <span>{worker.completedJobs} 案</span>
                </div>
                <div className="flex items-center gap-1 font-black" style={{ color: '#6c63ff' }}>
                  <DollarSign size={14} />
                  {worker.hourlyRate}/hr
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  className="btn-glow flex-1 py-2.5 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-1.5"
                  id={`hire-${worker.id}`}
                  onClick={() => alert(`聯絡 ${worker.name}！`)}
                >
                  <Zap size={14} /> 聘用
                </button>
                <button
                  className="flex-1 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-1.5 transition-all"
                  style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', color: '#f59e0b' }}
                  onClick={() => alert(`AI 委派任務給 ${worker.name}！`)}
                >
                  <Bot size={14} /> AI 委派
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
