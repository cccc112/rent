'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Zap, Plus, LayoutGrid, MessageSquare, Bot } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: '任務牆', icon: LayoutGrid },
    { href: '/create', label: '發布任務', icon: Plus },
    { href: '/chat/1', label: '聊天室', icon: MessageSquare },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(10, 10, 15, 0.8)', backdropFilter: 'blur(20px)' }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"
            style={{ background: 'linear-gradient(135deg, #6c63ff, #8b5cf6)', boxShadow: '0 0 16px rgba(108,99,255,0.5)' }}
          >
            <Zap size={16} className="text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight" style={{ color: '#f0f0ff' }}>
            Task<span className="gradient-text">Nexus</span>
          </span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-1">
          {navLinks.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                style={{
                  color: isActive ? '#f0f0ff' : '#8888aa',
                  background: isActive ? 'rgba(108, 99, 255, 0.15)' : 'transparent',
                  border: isActive ? '1px solid rgba(108,99,255,0.3)' : '1px solid transparent',
                }}
              >
                <Icon size={15} />
                {label}
              </Link>
            );
          })}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
            <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot" />
            <span className="text-xs font-medium text-emerald-400">2 AI 勞工在線</span>
          </div>
          <button
            className="btn-glow px-4 py-2 rounded-lg text-sm font-semibold text-white"
          >
            登入 / 註冊
          </button>
        </div>
      </div>
    </nav>
  );
}
