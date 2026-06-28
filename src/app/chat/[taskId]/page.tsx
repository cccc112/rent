'use client';

import { useState, useRef, useEffect, use } from 'react';
import { MOCK_TASKS, MOCK_MESSAGES, Message } from '@/lib/mockData';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Send, Bot, User, Zap } from 'lucide-react';

const AI_RESPONSES = [
  '好的，我已經收到你的需求，正在分析中...',
  '根據我的評估，我可以在 2 小時內完成這個任務，你覺得如何？',
  '請放心，我的翻譯準確率超過 98%，並且會保持原始格式。',
  '我已完成初步分析，預估工作量約為 1.5 小時，報價 $40 USD，包含一次修改。',
  '你有任何特定的術語偏好或格式要求嗎？我可以完全按照你的需求調整。',
];

export default function ChatPage({ params }: { params: Promise<{ taskId: string }> }) {
  const { taskId } = use(params);
  const task = MOCK_TASKS.find(t => t.id === taskId);
  if (!task) notFound();

  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAiTyping]);

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      content: inputText,
      sender_id: 'me',
      sender_name: '我',
      is_ai: false,
      created_at: new Date().toISOString(),
    };
    setMessages(prev => [...prev, newMsg]);
    setInputText('');

    // Simulate AI response
    if (task.allow_ai) {
      setIsAiTyping(true);
      await new Promise(r => setTimeout(r, 1500 + Math.random() * 1000));
      setIsAiTyping(false);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        content: AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)],
        sender_id: 'ai1',
        sender_name: '翻譯機器人 🤖',
        is_ai: true,
        created_at: new Date().toISOString(),
      };
      setMessages(prev => [...prev, aiMsg]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (iso: string) =>
    new Date(iso).toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="pt-16 flex flex-col" style={{ height: '100vh' }}>
      {/* Header */}
      <div
        className="flex-shrink-0 px-6 py-4 flex items-center gap-4 relative z-10"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(10,10,15,0.8)', backdropFilter: 'blur(20px)' }}
      >
        <Link href={`/task/${task.id}`} id="chat-back" className="p-2 rounded-lg transition-colors hover:bg-white/5">
          <ArrowLeft size={20} style={{ color: '#8888aa' }} />
        </Link>
        <div className="flex-1 min-w-0">
          <div className="font-bold truncate" style={{ color: '#f0f0ff' }}>{task.title}</div>
          <div className="text-xs flex items-center gap-2 mt-0.5" style={{ color: '#8888aa' }}>
            {task.allow_ai && (
              <span className="flex items-center gap-1 text-purple-400">
                <Bot size={11} /> AI 可回覆
              </span>
            )}
            <span>Task #{task.id}</span>
          </div>
        </div>
        <div
          className="px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1"
          style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', color: '#10b981' }}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 pulse-dot" />
          在線
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4" style={{ scrollbarGutter: 'stable' }}>
        {messages.map(msg => {
          const isMe = msg.sender_id === 'me';
          return (
            <div key={msg.id} className={`flex items-end gap-3 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
              {/* Avatar */}
              {!isMe && (
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
                  style={{
                    background: msg.is_ai
                      ? 'linear-gradient(135deg, #7c3aed, #4f46e5)'
                      : 'linear-gradient(135deg, #6c63ff, #8b5cf6)',
                  }}
                >
                  {msg.is_ai ? <Bot size={16} className="text-white" /> : <User size={16} className="text-white" />}
                </div>
              )}

              <div className={`max-w-lg ${isMe ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                {!isMe && (
                  <div className="flex items-center gap-2 px-1">
                    <span className="text-xs font-semibold" style={{ color: msg.is_ai ? '#a78bfa' : '#8888aa' }}>
                      {msg.sender_name}
                    </span>
                    {msg.is_ai && (
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{ background: 'rgba(167,139,250,0.1)', color: '#a78bfa', border: '1px solid rgba(167,139,250,0.2)' }}
                      >
                        AI
                      </span>
                    )}
                  </div>
                )}

                <div
                  className="px-4 py-3 rounded-2xl text-sm leading-relaxed"
                  style={{
                    background: isMe
                      ? 'linear-gradient(135deg, #6c63ff, #8b5cf6)'
                      : msg.is_ai
                      ? 'rgba(167,139,250,0.08)'
                      : 'rgba(255,255,255,0.05)',
                    border: isMe
                      ? 'none'
                      : msg.is_ai
                      ? '1px solid rgba(167,139,250,0.2)'
                      : '1px solid rgba(255,255,255,0.08)',
                    color: '#f0f0ff',
                    borderBottomRightRadius: isMe ? '4px' : '16px',
                    borderBottomLeftRadius: isMe ? '16px' : '4px',
                    boxShadow: isMe ? '0 4px 15px rgba(108,99,255,0.3)' : 'none',
                  }}
                >
                  {msg.content}
                </div>
                <div className="text-xs px-1" style={{ color: '#8888aa' }}>{formatTime(msg.created_at)}</div>
              </div>
            </div>
          );
        })}

        {/* AI typing indicator */}
        {isAiTyping && (
          <div className="flex items-end gap-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}
            >
              <Bot size={16} className="text-white" />
            </div>
            <div
              className="px-4 py-4 rounded-2xl"
              style={{
                background: 'rgba(167,139,250,0.08)',
                border: '1px solid rgba(167,139,250,0.2)',
                borderBottomLeftRadius: '4px',
              }}
            >
              <div className="flex gap-1.5 items-center">
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div
        className="flex-shrink-0 px-6 py-4"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(10,10,15,0.8)', backdropFilter: 'blur(20px)' }}
      >
        <div className="flex items-center gap-3 max-w-4xl mx-auto">
          <div className="flex-1 relative">
            <textarea
              id="chat-input"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="輸入訊息... (Enter 送出，Shift+Enter 換行)"
              rows={1}
              className="w-full px-4 py-3.5 pr-4 rounded-xl text-sm outline-none resize-none transition-all"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#f0f0ff',
                maxHeight: '120px',
              }}
              onFocus={e => e.target.style.borderColor = 'rgba(108,99,255,0.5)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
            />
          </div>
          <button
            id="send-btn"
            onClick={sendMessage}
            disabled={!inputText.trim()}
            className="btn-glow w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send size={18} className="text-white" />
          </button>
        </div>
        {task.allow_ai && (
          <p className="text-xs text-center mt-2 flex items-center justify-center gap-1" style={{ color: '#8888aa' }}>
            <Zap size={11} style={{ color: '#a78bfa' }} />
            <span style={{ color: '#a78bfa' }}>AI 勞工</span> 將在數秒內自動回覆
          </p>
        )}
      </div>
    </div>
  );
}
