'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Zap, Plus, LayoutGrid, MessageSquare, Bot, Menu, X, Users } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: '任務牆', icon: LayoutGrid },
    { href: '/ai-hire', label: 'AI 租用人類', icon: Bot },
    { href: '/workers', label: '人才市場', icon: Users },
    { href: '/create', label: '發布任務', icon: Plus },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="absolute inset-0" style={{ background: 'rgba(10, 10, 15, 0.85)', backdropFilter: 'blur(20px)' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
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

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                  style={{
                    color: isActive ? '#f0f0ff' : '#8888aa',
                    background: isActive ? 'rgba(108, 99, 255, 0.15)' : 'transparent',
                    border: isActive ? '1px solid rgba(108,99,255,0.3)' : '1px solid transparent',
                  }}
                >
                  <Icon size={14} />
                  {label}
                </Link>
              );
            })}
          </div>

          {/* Right */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 rounded-full" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot" />
              <span className="text-xs font-medium text-emerald-400 whitespace-nowrap">2 AI 在線</span>
            </div>
            <button className="btn-glow px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold text-white whitespace-nowrap">
              登入
            </button>
            {/* Hamburger */}
            <button
              className="md:hidden p-2 rounded-lg transition-colors"
              style={{ color: '#8888aa' }}
              onClick={() => setMenuOpen(!menuOpen)}
              id="hamburger-btn"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="fixed top-16 left-0 right-0 z-40 md:hidden"
          style={{ background: 'rgba(10,10,15,0.98)', borderBottom: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)' }}
        >
          <div className="px-4 py-3 space-y-1">
            {navLinks.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all"
                  style={{
                    color: isActive ? '#f0f0ff' : '#8888aa',
                    background: isActive ? 'rgba(108,99,255,0.15)' : 'transparent',
                  }}
                >
                  <Icon size={16} />
                  {label}
                </Link>
              );
            })}
            <div className="flex items-center gap-2 px-4 py-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot" />
              <span className="text-xs text-emerald-400">2 個 AI 勞工在線</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
