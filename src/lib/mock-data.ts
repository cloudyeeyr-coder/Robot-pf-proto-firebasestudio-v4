
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

export interface Contract {
  id: string;
  title: string;
  partnerName: string;
  amount: number;
  status: 'payment_pending' | 'escrow_held' | 'completed' | 'disputed';
  createdAt: string;
  dueDate: string;
}

export interface EscrowTx {
  id: string;
  contractId: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  depositedAmount: number;
  status: 'pending' | 'verifying' | 'held' | 'released';
  updatedAt: string;
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

export const MOCK_CONTRACTS: Contract[] = [
  { id: 'CON-001', title: '스마트 팩토리 1단계 구축', partnerName: 'Samsung SDS Partner 1', amount: 150000000, status: 'payment_pending', createdAt: '2024-03-01', dueDate: '2024-06-01' },
  { id: 'CON-002', title: '클라우드 인프라 최적화', partnerName: 'LG CNS Partner 2', amount: 45000000, status: 'escrow_held', createdAt: '2024-03-05', dueDate: '2024-04-15' },
  { id: 'CON-003', title: 'AI 기반 품질 검사 시스템', partnerName: 'SK C&C Partner 3', amount: 88000000, status: 'completed', createdAt: '2024-02-10', dueDate: '2024-05-10' },
  { id: 'CON-004', title: 'ERP 고도화 프로젝트', partnerName: 'Hyundai AutoEver Partner 4', amount: 120000000, status: 'payment_pending', createdAt: '2024-03-12', dueDate: '2024-08-12' },
  { id: 'CON-005', title: '보안 관제 센터 구축', partnerName: 'CJ OliveNetworks Partner 5', amount: 67000000, status: 'disputed', createdAt: '2024-01-20', dueDate: '2024-04-20' },
];

export const MOCK_ESCROW_TXS: Record<string, EscrowTx> = {
  'CON-001': { id: 'TX-001', contractId: 'CON-001', bankName: '신한은행', accountNumber: '110-456-789012', accountHolder: '(주)롤허브커넥트_에스크로', depositedAmount: 0, status: 'pending', updatedAt: '2024-03-15 10:00' },
  'CON-002': { id: 'TX-002', contractId: 'CON-002', bankName: '신한은행', accountNumber: '110-456-789012', accountHolder: '(주)롤허브커넥트_에스크로', depositedAmount: 45000000, status: 'held', updatedAt: '2024-03-16 14:30' },
};
