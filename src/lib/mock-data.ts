
export interface SiPartner {
  id: string;
  name: string;
  region: string;
  successRate: number;
  tags: string[];
  hasBadge: boolean;
  rating: number;
  tier: 'Gold' | 'Silver' | 'Bronze';
  updatedAt: string;
  description: string;
  financialTier: string;
  capabilities: string[];
  badges: string[];
}

export const MOCK_SI_PARTNERS: SiPartner[] = Array.from({ length: 40 }).map((_, i) => ({
  id: `si-${i + 1}`,
  name: `SI Partner ${i + 1} Ltd`,
  region: ['서울', '경기', '부산', '대구', '인천'][i % 5],
  successRate: Math.floor(Math.random() * 30) + 70,
  tags: ['Smart Factory', 'Cloud', 'AI', 'ERP', 'Security', 'IoT'].sort(() => 0.5 - Math.random()).slice(0, 4),
  hasBadge: i % 3 === 0,
  rating: Number((Math.random() * 2 + 3).toFixed(1)),
  tier: i % 10 === 0 ? 'Gold' : i % 5 === 0 ? 'Silver' : 'Bronze',
  updatedAt: '2024-03-20',
  description: 'Industrial automation specialist with over 15 years of experience in regional manufacturing digital transformation.',
  financialTier: ['A+', 'A', 'B+', 'B'][i % 4],
  capabilities: ['PLC Integration', 'Cloud Migration', 'Cyber Security Audit', 'Data Analytics Pipeline'],
  badges: ['Certified Installer', 'Platinum Partner', 'Security Verified', 'Fast Response'],
}));
