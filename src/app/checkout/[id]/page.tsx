'use client';

import { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MOCK_TASKS, INSTANT_TASKS, AI_CLIENT_TASKS } from '@/lib/mockData';
import { ArrowLeft, ShieldCheck, CreditCard, Wallet, Lock, Zap } from 'lucide-react';

export default function CheckoutPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const task = [...MOCK_TASKS, ...INSTANT_TASKS, ...AI_CLIENT_TASKS].find(t => t.id === id);
  if (!task) notFound();

  // 模擬結帳金額：任務預算 + 10% 平台手續費 + 快速任務處理費(如果為 instant)
  const fee = task.budget * 0.1;
  const instantFee = task.instant ? 2 : 0;
  const total = task.budget + fee + instantFee;

  return (
    <div className="page-wrap flex justify-center" style={{ padding: '40px 16px', minHeight: '100vh' }}>
      <div className="w-full max-w-4xl grid-2" style={{ alignItems: 'start', gap: 32 }}>
        
        {/* Left: Checkout Form */}
        <div className="space-y-6">
          <Link href={`/task/${id}`} className="inline-flex items-center gap-2 text-sm mb-2 transition-colors hover:text-purple-400" style={{ color: '#8888aa', textDecoration: 'none' }}>
            <ArrowLeft size={16} /> 返回任務詳情
          </Link>
          
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 900, color: '#eeeeff', marginBottom: 8 }}>
              完成付款與託管資金
            </h1>
            <p style={{ color: '#777799', fontSize: 14 }}>
              您的資金將會安全地保管在 TaskNexus，直到任務成功完成為止。
            </p>
          </div>

          <div className="card" style={{ padding: 24 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#eeeeff', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <CreditCard size={18} color="#7c6fff" />
              付款方式
            </h2>

            {/* Payment Methods */}
            <div className="grid-2" style={{ marginBottom: 20 }}>
              <div style={{ border: '2px solid #7c6fff', background: 'rgba(124,111,255,0.05)', borderRadius: 12, padding: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 16, height: 16, borderRadius: '50%', border: '4px solid #7c6fff', background: '#fff' }} />
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#eeeeff' }}>信用卡 / 金融卡</span>
                </div>
                <div style={{ display: 'flex', gap: 4 }}>
                  {/* Mock card icons */}
                  <div style={{ width: 30, height: 20, background: '#fff', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ color: '#000', fontSize: 10, fontWeight: 800 }}>VISA</span></div>
                  <div style={{ width: 30, height: 20, background: '#fff', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ color: '#ff5f00', fontSize: 10, fontWeight: 800 }}>MC</span></div>
                </div>
              </div>

              <div style={{ border: '1px solid var(--border)', background: 'rgba(255,255,255,0.02)', borderRadius: 12, padding: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 16, height: 16, borderRadius: '50%', border: '1px solid #777799' }} />
                <span style={{ fontSize: 14, fontWeight: 600, color: '#777799' }}>Apple Pay</span>
              </div>
            </div>

            {/* Card Details form mock */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#777799', marginBottom: 6 }}>卡號</label>
                <input type="text" className="input" placeholder="0000 0000 0000 0000" />
              </div>
              <div className="grid-2">
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#777799', marginBottom: 6 }}>有效期限</label>
                  <input type="text" className="input" placeholder="MM/YY" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#777799', marginBottom: 6 }}>CVC</label>
                  <input type="text" className="input" placeholder="123" />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#777799', marginBottom: 6 }}>持卡人姓名</label>
                <input type="text" className="input" placeholder="e.g. John Doe" />
              </div>
            </div>

            <button
              onClick={() => alert('付款成功！資金已託管。')}
              className="btn btn-primary btn-full"
              style={{ marginTop: 24, padding: '16px', fontSize: 16 }}
            >
              <Lock size={16} /> 支付 ${total.toFixed(2)} USD
            </button>
            <p style={{ textAlign: 'center', fontSize: 12, color: '#777799', marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
              <ShieldCheck size={14} color="#10b981" /> 您的交易受到 256-bit SSL 加密保護
            </p>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div>
          <div className="card" style={{ padding: 24, position: 'sticky', top: 80 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#eeeeff', marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid var(--border)' }}>
              訂單摘要
            </h3>

            <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: 'linear-gradient(135deg,#7c6fff,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Wallet size={20} color="white" />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#eeeeff', lineHeight: 1.4 }}>{task.title}</div>
                <div style={{ fontSize: 12, color: '#777799', marginTop: 4 }}>任務編號 #{task.id}</div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                <span style={{ color: '#777799' }}>任務預算</span>
                <span style={{ color: '#eeeeff', fontWeight: 600 }}>${task.budget.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                <span style={{ color: '#777799' }}>平台託管手續費 (10%)</span>
                <span style={{ color: '#eeeeff', fontWeight: 600 }}>${fee.toFixed(2)}</span>
              </div>
              {task.instant && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                  <span style={{ color: '#f59e0b', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Zap size={14} /> 快速任務加急費
                  </span>
                  <span style={{ color: '#f59e0b', fontWeight: 600 }}>${instantFee.toFixed(2)}</span>
                </div>
              )}
            </div>

            <div style={{ paddingTop: 16, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: '#eeeeff' }}>總計金額</span>
              <span style={{ fontSize: 24, fontWeight: 900, color: '#7c6fff' }}>${total.toFixed(2)} <span style={{ fontSize: 14, color: '#777799', fontWeight: 600 }}>USD</span></span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
