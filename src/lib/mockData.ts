export interface Task {
  id: string;
  title: string;
  description: string;
  budget: number;
  allow_ai: boolean;
  status: 'open' | 'in_progress' | 'completed';
  client: {
    name: string;
    avatar: string;
  };
  skills: string[];
  bids: number;
  created_at: string;
}

export interface Message {
  id: string;
  content: string;
  sender_id: string;
  sender_name: string;
  is_ai: boolean;
  created_at: string;
}

export const MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: '設計 TaskNexus App 登入頁面 UI',
    description: '需要一個精美的 React Native 登入頁面設計，包含 Google / Apple 登入按鈕，深色主題，並需要 Figma 設計稿。',
    budget: 150,
    allow_ai: false,
    status: 'open',
    client: { name: 'Rich Chen', avatar: 'RC' },
    skills: ['Figma', 'UI/UX', 'React Native'],
    bids: 3,
    created_at: '2026-06-27T10:00:00Z',
  },
  {
    id: '2',
    title: '翻譯英文軟體授權合約至繁體中文',
    description: '這是一份約 3000 字的軟體授權合約 (SLA)，需要精準的法律用語翻譯，並保持合約格式不變。',
    budget: 50,
    allow_ai: true,
    status: 'open',
    client: { name: 'Alice Wang', avatar: 'AW' },
    skills: ['翻譯', '法律', '繁體中文'],
    bids: 7,
    created_at: '2026-06-27T12:00:00Z',
  },
  {
    id: '3',
    title: '撰寫 Python 爬蟲腳本收集電商商品資料',
    description: '需要爬取某電商平台的商品名稱、價格、評分等資訊，並輸出為 CSV 格式。需要能定時執行。',
    budget: 200,
    allow_ai: true,
    status: 'open',
    client: { name: 'Bob Lin', avatar: 'BL' },
    skills: ['Python', 'BeautifulSoup', 'Selenium'],
    bids: 5,
    created_at: '2026-06-28T08:00:00Z',
  },
  {
    id: '4',
    title: '為電商網站撰寫 10 篇 SEO 部落格文章',
    description: '需要圍繞「咖啡豆」主題撰寫 10 篇各約 1000 字的 SEO 優化文章，關鍵字自然融入，需附上 meta description。',
    budget: 120,
    allow_ai: true,
    status: 'in_progress',
    client: { name: 'Emma Su', avatar: 'ES' },
    skills: ['SEO', '內容撰寫', '繁體中文'],
    bids: 12,
    created_at: '2026-06-25T15:00:00Z',
  },
  {
    id: '5',
    title: '建立企業 Logo 設計 (3個方案)',
    description: '新創公司「Luminary Tech」需要品牌 Logo，風格偏向科技感但不失溫暖，提供 3 個方案供選擇。',
    budget: 300,
    allow_ai: false,
    status: 'open',
    client: { name: 'Peter Kao', avatar: 'PK' },
    skills: ['Illustrator', '品牌設計', 'Logo'],
    bids: 2,
    created_at: '2026-06-28T14:00:00Z',
  },
  {
    id: '6',
    title: '修復 Next.js 網站 Lighthouse 效能評分至 90+',
    description: '目前網站在 Lighthouse 效能評分約 60 分，需要優化 Core Web Vitals，包含 LCP、CLS、FID 等指標。',
    budget: 180,
    allow_ai: true,
    status: 'open',
    client: { name: 'Sarah Hsu', avatar: 'SH' },
    skills: ['Next.js', '效能優化', 'Web Vitals'],
    bids: 4,
    created_at: '2026-06-28T16:00:00Z',
  },
];

export const MOCK_MESSAGES: Message[] = [
  {
    id: 'm1',
    content: '你好！我對這份翻譯任務很有興趣。請問有哪些特定的法律術語需要特別注意嗎？',
    sender_id: 'user1',
    sender_name: 'Alice Wang',
    is_ai: false,
    created_at: '2026-06-27T12:10:00Z',
  },
  {
    id: 'm2',
    content: '您好！我是翻譯機器人，已完成初步分析。根據合約內容，我建議重點關注以下術語：「Indemnification」（免責賠償條款）、「Limitation of Liability」（責任限制）以及「Governing Law」（準據法）。我可以在 2 小時內完成翻譯，品質保證符合法律文件標準。',
    sender_id: 'ai1',
    sender_name: '翻譯機器人 🤖',
    is_ai: true,
    created_at: '2026-06-27T12:11:00Z',
  },
  {
    id: 'm3',
    content: '謝謝你的分析！那你的報價是多少呢？',
    sender_id: 'user1',
    sender_name: 'Alice Wang',
    is_ai: false,
    created_at: '2026-06-27T12:15:00Z',
  },
];
