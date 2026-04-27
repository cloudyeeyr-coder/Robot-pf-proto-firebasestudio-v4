
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
  region: ['Seoul', 'Gyeonggi', 'Busan', 'Daegu', 'Incheon'][i % 5],
  successRate: Math.floor(Math.random() * 30) + 70,
  tags: ['Smart Factory', 'Cloud', 'AI', 'ERP', 'Security', 'IoT'].sort(() => 0.5 - Math.random()).slice(0, 4),
  hasBadge: i % 3 === 0,
  rating: Number((Math.random() * 2 + 3).toFixed(1)),
  tier: i % 10 === 0 ? 'Gold' : i % 5 === 0 ? 'Silver' : 'Bronze',
  updatedAt: '2024-03-20',
  description: 'A professional systems integration partner with over 15 years of rich experience in industrial automation and manufacturing digital transformation.',
  financialTier: ['A+', 'A', 'B+', 'B'][i % 4],
  capabilities: ['PLC Integration', 'Cloud Migration', 'Security Audit', 'Data Pipeline'],
  badges: ['Certified Installer', 'Platinum Partner', 'Security Verified', 'Fast Response'],
}));

export const MOCK_CONTRACTS: Contract[] = [
  { id: 'CON-001', title: 'Smart Factory Phase 1', partnerName: 'Samsung SDS Partner 1', amount: 150000000, status: 'payment_pending', createdAt: '2024-03-01', dueDate: '2024-06-01' },
  { id: 'CON-002', title: 'Cloud Infra Optimization', partnerName: 'LG CNS Partner 2', amount: 45000000, status: 'escrow_held', createdAt: '2024-03-05', dueDate: '2024-04-15' },
  { id: 'CON-003', title: 'AI Quality Inspection System', partnerName: 'SK C&C Partner 3', amount: 88000000, status: 'completed', createdAt: '2024-02-10', dueDate: '2024-05-10' },
  { id: 'CON-004', title: 'ERP Enhancement Project', partnerName: 'Hyundai AutoEver Partner 4', amount: 120000000, status: 'payment_pending', createdAt: '2024-03-12', dueDate: '2024-08-12' },
  { id: 'CON-005', title: 'Security Ops Center Setup', partnerName: 'CJ OliveNetworks Partner 5', amount: 67000000, status: 'disputed', createdAt: '2024-01-20', dueDate: '2024-04-20' },
];

export const MOCK_ESCROW_TXS: Record<string, EscrowTx> = {
  'CON-001': { id: 'TX-001', contractId: 'CON-001', bankName: 'Standard Chartered', accountNumber: '110-456-789012', accountHolder: 'RoleHub Escrow Services', depositedAmount: 0, status: 'pending', updatedAt: '2024-03-15 10:00' },
  'CON-002': { id: 'TX-002', contractId: 'CON-002', bankName: 'Standard Chartered', accountNumber: '110-456-789012', accountHolder: 'RoleHub Escrow Services', depositedAmount: 45000000, status: 'held', updatedAt: '2024-03-16 14:30' },
};
