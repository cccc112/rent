'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Zap, Plus, LayoutGrid, Bot, Users, Menu, X } from 'lucide-react';
import { useState } from 'react';

const NAV_LINKS = [
  { href: '/', label: '任務牆', icon: LayoutGrid },
  { href: '/ai-hire', label: 'AI 租用人類', icon: Bot },
  { href: '/workers', label: '人才市場', icon: Users },
  { href: '/create', label: '發布任務', icon: Plus },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="navbar">
        <div className="container h-full flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0" style={{ textDecoration: 'none' }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: 'linear-gradient(135deg,#7c6fff,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 14px rgba(124,111,255,0.5)' }}>
              <Zap size={15} color="white" />
            </div>
            <span style={{ fontWeight: 800, fontSize: 17, color: '#eeeeff' }}>
              Task<span className="grad">Nexus</span>
            </span>
          </Link>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ href, label, icon: Icon }) => {
              const active = pathname === href;
              return (
                <Link key={href} href={href} style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '7px 14px', borderRadius: 10, fontSize: 13, fontWeight: 600,
                  textDecoration: 'none',
                  color: active ? '#eeeeff' : '#777799',
                  background: active ? 'rgba(124,111,255,0.15)' : 'transparent',
                  border: active ? '1px solid rgba(124,111,255,0.3)' : '1px solid transparent',
                  transition: 'all 0.2s',
                }}>
                  <Icon size={13} />
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 badge" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.22)', color: '#10b981', fontSize: 11 }}>
              <span className="pulse-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
              2 AI 在線
            </div>
            <Link href="/login" className="btn btn-primary btn-sm" style={{ textDecoration: 'none' }}>登入</Link>
            <button className="md:hidden btn btn-ghost btn-sm" style={{ padding: '7px 9px' }} onClick={() => setOpen(v => !v)}>
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div style={{ position: 'fixed', top: 60, left: 0, right: 0, zIndex: 99, background: 'rgba(8,8,16,0.97)', borderBottom: '1px solid rgba(255,255,255,0.07)', backdropFilter: 'blur(20px)' }}>
          <div className="container" style={{ paddingTop: 12, paddingBottom: 16 }}>
            {NAV_LINKS.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} onClick={() => setOpen(false)} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '12px 8px', borderRadius: 10, fontSize: 14, fontWeight: 600,
                textDecoration: 'none', color: pathname === href ? '#eeeeff' : '#777799',
                background: pathname === href ? 'rgba(124,111,255,0.1)' : 'transparent',
              }}>
                <Icon size={16} /> {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
