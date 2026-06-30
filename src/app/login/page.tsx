'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Zap, Mail, Lock, ArrowRight, Github } from 'lucide-react';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="page-wrap flex items-center justify-center min-h-screen" style={{ padding: '40px 16px' }}>
      <div className="w-full max-w-md">
        
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="flex items-center gap-2 mb-4" style={{ textDecoration: 'none' }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg,#7c6fff,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(124,111,255,0.5)' }}>
              <Zap size={20} color="white" />
            </div>
            <span style={{ fontWeight: 900, fontSize: 24, color: '#eeeeff' }}>
              Task<span className="grad">Nexus</span>
            </span>
          </Link>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: '#eeeeff' }}>
            {isLogin ? '歡迎回來' : '建立帳號'}
          </h1>
          <p style={{ color: '#777799', fontSize: 14, marginTop: 8 }}>
            {isLogin ? '登入以繼續您的任務旅程' : '加入真人與 AI 協作的未來工作平台'}
          </p>
        </div>

        <div className="card" style={{ padding: 32 }}>
          {/* Social Auth */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button className="btn btn-ghost" style={{ padding: '10px', fontSize: 13, display: 'flex', gap: 8 }}>
              <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0112 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115z"/><path fill="#34A853" d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 01-6.723-4.806L1.24 17.35C3.198 21.302 7.269 24 12 24c3.24 0 5.955-1.08 7.96-2.916l-3.92-3.071z"/><path fill="#4A90E2" d="M19.96 21.084C21.95 19.22 23.2 16.48 23.2 12.88c0-.873-.065-1.636-.218-2.381H12v4.727h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.96 21.084z"/><path fill="#FBBC05" d="M5.277 14.268A7.12 7.12 0 014.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 000 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067z"/></svg>
              Google
            </button>
            <button className="btn btn-ghost" style={{ padding: '10px', fontSize: 13, display: 'flex', gap: 8 }}>
              <Github size={18} />
              GitHub
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0' }}>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }}></div>
            <span style={{ fontSize: 12, color: '#777799', fontWeight: 600 }}>或使用 Email</span>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }}></div>
          </div>

          <form onSubmit={e => { e.preventDefault(); alert('登入成功！'); }} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {!isLogin && (
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#777799', marginBottom: 6 }}>姓名</label>
                <div style={{ position: 'relative' }}>
                  <Users size={16} style={{ position: 'absolute', left: 14, top: 12, color: '#777799' }} />
                  <input type="text" className="input" placeholder="您的名稱" style={{ paddingLeft: 40 }} required />
                </div>
              </div>
            )}
            
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#777799', marginBottom: 6 }}>電子郵件</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: 14, top: 12, color: '#777799' }} />
                <input type="email" className="input" placeholder="name@example.com" style={{ paddingLeft: 40 }} required />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#777799' }}>密碼</label>
                {isLogin && <a href="#" style={{ fontSize: 12, color: '#7c6fff', textDecoration: 'none' }}>忘記密碼？</a>}
              </div>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: 14, top: 12, color: '#777799' }} />
                <input type="password" className="input" placeholder="••••••••" style={{ paddingLeft: 40 }} required />
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-full mt-2" style={{ padding: '14px', fontSize: 15 }}>
              {isLogin ? '登入' : '註冊帳號'} <ArrowRight size={16} />
            </button>
          </form>

        </div>

        <p style={{ textAlign: 'center', fontSize: 13, color: '#777799', marginTop: 24 }}>
          {isLogin ? '還沒有帳號嗎？' : '已經有帳號了？'}{' '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            style={{ background: 'none', border: 'none', color: '#7c6fff', fontWeight: 700, cursor: 'pointer' }}
          >
            {isLogin ? '立即註冊' : '登入現有帳號'}
          </button>
        </p>

      </div>
    </div>
  );
}
