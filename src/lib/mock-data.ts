
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
  brand: string;
}

const BRANDS = ['Samsung SDS', 'LG CNS', 'SK C&C', 'Hyundai AutoEver', 'CJ OliveNetworks'];

export const MOCK_SI_PARTNERS: SiPartner[] = Array.from({ length: 40 }).map((_, i) => ({
  id: `si-${i + 1}`,
  name: `${BRANDS[i % BRANDS.length]} Partner ${i + 1}`,
  brand: BRANDS[i % BRANDS.length],
  region: ['서울', '경기', '부산', '대구', '인천'][i % 5],
  successRate: Math.floor(Math.random() * 30) + 70,
  tags: ['Smart Factory', 'Cloud', 'AI', 'ERP', 'Security', 'IoT'].sort(() => 0.5 - Math.random()).slice(0, 4),
  hasBadge: i % 3 === 0,
  rating: Number((Math.random() * 2 + 3).toFixed(1)),
  tier: i % 10 === 0 ? 'Gold' : i % 5 === 0 ? 'Silver' : 'Bronze',
  updatedAt: '2024-03-20',
  description: '산업 자동화 및 제조 디지털 전환 분야에서 15년 이상의 풍부한 경험을 보유한 전문 시스템 통합 파트너입니다.',
  financialTier: ['A+', 'A', 'B+', 'B'][i % 4],
  capabilities: ['PLC 통합', '클라우드 마이그레이션', '보안 감사', '데이터 분석 파이프라인'],
  badges: ['공인 설치업체', '플래티넘 파트너', '보안 인증 완료', '신속 대응'],
}));
