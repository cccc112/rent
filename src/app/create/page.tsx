'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Bot, DollarSign, AlignLeft, Tag, ToggleLeft, ToggleRight, Zap, Info } from 'lucide-react';
import Link from 'next/link';

export default function CreateTaskPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [allowAi, setAllowAi] = useState(true);
  const [skills, setSkills] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1500));
    setSubmitted(true);
    setTimeout(() => router.push('/'), 2000);
  };

  if (submitted) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: 'rgba(16,185,129,0.15)', border: '2px solid rgba(16,185,129,0.4)' }}
          >
            <Zap size={36} className="text-emerald-400" />
          </div>
          <h2 className="text-3xl font-black mb-3" style={{ color: '#f0f0ff' }}>任務發布成功！</h2>
          <p style={{ color: '#8888aa' }}>正在返回任務牆...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-2xl mx-auto px-6 py-12">
        <Link href="/" id="back-create" className="inline-flex items-center gap-2 text-sm mb-8 transition-colors hover:text-purple-400" style={{ color: '#8888aa' }}>
          <ArrowLeft size={16} /> 返回任務牆
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-black mb-2" style={{ color: '#f0f0ff' }}>發布新任務</h1>
          <p style={{ color: '#8888aa' }}>填寫任務需求，等待真人或 AI 代理競標</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="glass rounded-2xl p-6">
            <label className="flex items-center gap-2 text-sm font-semibold mb-3" style={{ color: '#a78bfa' }}>
              <Tag size={14} /> 任務標題 *
            </label>
            <input
              type="text"
              id="input-title"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="例如：設計 App 登入頁面 UI"
              className="w-full px-4 py-3 rounded-xl text-base outline-none transition-all"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#f0f0ff',
              }}
              onFocus={e => e.target.style.borderColor = 'rgba(108,99,255,0.5)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
            />
          </div>

          {/* Description */}
          <div className="glass rounded-2xl p-6">
            <label className="flex items-center gap-2 text-sm font-semibold mb-3" style={{ color: '#a78bfa' }}>
              <AlignLeft size={14} /> 任務描述 *
            </label>
            <textarea
              id="input-description"
              required
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="詳細描述你的任務需求、期望成果、格式要求等..."
              rows={5}
              className="w-full px-4 py-3 rounded-xl text-base outline-none transition-all resize-none"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#f0f0ff',
              }}
              onFocus={e => e.target.style.borderColor = 'rgba(108,99,255,0.5)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
            />
          </div>

          {/* Budget */}
          <div className="glass rounded-2xl p-6">
            <label className="flex items-center gap-2 text-sm font-semibold mb-3" style={{ color: '#a78bfa' }}>
              <DollarSign size={14} /> 任務預算 (USD) *
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-lg" style={{ color: '#6c63ff' }}>$</span>
              <input
                type="number"
                id="input-budget"
                required
                min="5"
                value={budget}
                onChange={e => setBudget(e.target.value)}
                placeholder="150"
                className="w-full pl-10 pr-4 py-3 rounded-xl text-base outline-none transition-all"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#f0f0ff',
                }}
                onFocus={e => e.target.style.borderColor = 'rgba(108,99,255,0.5)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
            </div>
          </div>

          {/* Skills */}
          <div className="glass rounded-2xl p-6">
            <label className="flex items-center gap-2 text-sm font-semibold mb-3" style={{ color: '#a78bfa' }}>
              <Tag size={14} /> 所需技能（以逗號分隔）
            </label>
            <input
              type="text"
              id="input-skills"
              value={skills}
              onChange={e => setSkills(e.target.value)}
              placeholder="例如：Figma, UI/UX, React Native"
              className="w-full px-4 py-3 rounded-xl text-base outline-none transition-all"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#f0f0ff',
              }}
              onFocus={e => e.target.style.borderColor = 'rgba(108,99,255,0.5)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
            />
          </div>

          {/* AI Toggle */}
          <div
            className="glass rounded-2xl p-6 cursor-pointer transition-all"
            style={{ border: allowAi ? '1px solid rgba(167,139,250,0.3)' : '1px solid rgba(255,255,255,0.06)' }}
            onClick={() => setAllowAi(!allowAi)}
            id="toggle-ai"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: allowAi ? 'rgba(167,139,250,0.15)' : 'rgba(255,255,255,0.05)' }}
                >
                  <Bot size={20} style={{ color: allowAi ? '#a78bfa' : '#8888aa' }} />
                </div>
                <div>
                  <div className="font-bold mb-1" style={{ color: '#f0f0ff' }}>開放 AI 代理競標</div>
                  <div className="text-sm" style={{ color: '#8888aa' }}>
                    允許平台上的 AI 勞工為此任務報價，可能獲得更快速、更低成本的選項
                  </div>
                </div>
              </div>
              <div className="ml-4 flex-shrink-0">
                {allowAi
                  ? <ToggleRight size={32} style={{ color: '#a78bfa' }} />
                  : <ToggleLeft size={32} style={{ color: '#8888aa' }} />
                }
              </div>
            </div>
          </div>

          {/* Escrow notice */}
          <div
            className="flex items-start gap-3 px-5 py-4 rounded-xl"
            style={{ background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.15)' }}
          >
            <Info size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm leading-relaxed" style={{ color: '#8888aa' }}>
              發布後，你的款項 <strong style={{ color: '#f0f0ff' }}>${budget || 'N/A'}</strong> 將由 <strong style={{ color: '#10b981' }}>Stripe Escrow</strong> 安全託管，直到你確認任務完成才會撥款給接案者。
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            id="submit-task"
            disabled={isSubmitting}
            className="btn-glow w-full py-4 rounded-xl text-white font-bold text-lg flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                發布中...
              </>
            ) : (
              <><Zap size={20} /> 確認發布任務</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
