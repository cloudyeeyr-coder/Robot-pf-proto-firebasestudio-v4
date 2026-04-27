
"use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  History, 
  FileText, 
  ShoppingCart,
  Star,
  ArrowRight,
  CreditCard,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { MOCK_CONTRACTS } from '@/lib/mock-data';

export function BuyerDashboard() {
  const router = useRouter();
  
  const products = [
    { id: 1, name: 'Precision Sensor X1', manufacturer: 'TechSensors', rating: 4.8, price: '$499', image: 'https://picsum.photos/seed/sensor/400/300' },
    { id: 2, name: 'High-Torque Motor M2', manufacturer: 'PowerDrive', rating: 4.5, price: '$1,299', image: 'https://picsum.photos/seed/motor/400/300' },
    { id: 3, name: 'Industrial Hub V3', manufacturer: 'NexusConnect', rating: 4.9, price: '$750', image: 'https://picsum.photos/seed/hub/400/300' },
  ];

  const pendingPayments = MOCK_CONTRACTS.filter(c => c.status === 'payment_pending');

  return (
    <div className="space-y-8">
      {/* Hero Search Section */}
      <div className="relative h-[250px] rounded-3xl overflow-hidden bg-primary mb-8">
        <Image 
          src="https://picsum.photos/seed/industrial/1200/400" 
          alt="Hero" 
          fill 
          className="object-cover opacity-40"
          data-ai-hint="industrial technology"
        />
        <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-12 text-white">
          <h1 className="text-4xl font-extrabold mb-4 font-headline">산업 생태계의 연결고리</h1>
          <p className="text-lg text-white/80 mb-6 max-w-xl">최적의 SI 파트너를 찾고, 에스크로를 통해 안전하게 계약을 체결하세요.</p>
          <div className="flex gap-2 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 size-5 text-slate-400" />
              <Input 
                placeholder="SI 업체명, 솔루션, 키워드 검색..." 
                className="pl-10 h-12 bg-white text-slate-900 border-none rounded-xl"
                onKeyDown={(e) => e.key === 'Enter' && router.push('/search')}
              />
            </div>
            <Button size="lg" className="rounded-xl px-8 bg-secondary hover:bg-secondary/90 text-primary font-bold" onClick={() => router.push('/search')}>검색</Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-8">
          {/* Active Contracts Summary */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <FileText className="size-6 text-primary" /> 진행 중인 계약
              </h2>
              <Button variant="link" className="text-primary font-bold" onClick={() => router.push('/buyer/contracts')}>
                전체 보기 <ArrowRight className="size-4 ml-1" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MOCK_CONTRACTS.slice(0, 2).map((contract) => (
                <Card key={contract.id} className="border-none shadow-sm hover:shadow-md transition-all">
                  <CardContent className="p-5 flex items-center justify-between">
                    <div className="flex gap-4 items-center">
                      <div className={cn(
                        "size-10 rounded-xl flex items-center justify-center",
                        contract.status === 'payment_pending' ? "bg-amber-100 text-amber-600" : "bg-emerald-100 text-emerald-600"
                      )}>
                        {contract.status === 'payment_pending' ? <CreditCard className="size-5" /> : <ShieldCheck className="size-5" />}
                      </div>
                      <div>
                        <p className="text-sm font-bold truncate max-w-[150px]">{contract.title}</p>
                        <p className="text-xs text-muted-foreground">{contract.partnerName}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-primary gap-1" onClick={() => {
                      const path = contract.status === 'payment_pending' ? `/contracts/${contract.id}/payment` : `/contracts/${contract.id}/payment/status`;
                      router.push(path);
                    }}>
                      {contract.status === 'payment_pending' ? '결제하기' : '상세보기'} <ArrowRight className="size-3" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Featured Catalog */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">인기 제조 부품</h2>
              <Button variant="ghost" className="text-primary gap-1">카탈로그 보기 <ArrowRight className="size-4" /></Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((p) => (
                <Card key={p.id} className="group overflow-hidden border-none shadow-sm hover:shadow-xl transition-all rounded-2xl">
                  <div className="relative h-48">
                    <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <Badge className="absolute top-3 right-3 bg-white/90 text-primary backdrop-blur-sm border-none">{p.price}</Badge>
                  </div>
                  <CardHeader className="p-4 pb-0">
                    <p className="text-xs font-bold text-muted-foreground uppercase">{p.manufacturer}</p>
                    <CardTitle className="text-lg">{p.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <div className="flex items-center gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className={cn("size-3", s <= Math.floor(p.rating) ? "fill-amber-400 text-amber-400" : "text-slate-300")} />
                      ))}
                      <span className="text-xs font-medium ml-1">{p.rating}</span>
                    </div>
                    <Button className="w-full gap-2 rounded-xl">
                      <ShoppingCart className="size-4" />
                      Add to RFQ
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Activity */}
        <aside className="space-y-6">
          <Card className="rounded-2xl border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">알림 센터</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  { icon: CreditCard, label: '결제 대기 1건', date: '2시간 전', color: 'amber' },
                  { icon: ShieldCheck, label: '에스크로 예치 완료', date: '5시간 전', color: 'emerald' },
                  { icon: CheckCircle2, label: '보증서 발급 가능', date: '어제', color: 'blue' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-center cursor-pointer hover:bg-slate-50 p-2 rounded-lg transition-colors" onClick={() => router.push('/buyer/contracts')}>
                    <div className={cn("size-10 rounded-xl flex items-center justify-center", 
                      item.color === 'amber' ? 'bg-amber-50 text-amber-600' : 
                      item.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'
                    )}>
                      <item.icon className="size-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-6 rounded-xl" onClick={() => router.push('/buyer/contracts')}>모든 활동 보기</Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 text-white rounded-2xl border-none shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg">전문가 도움말</CardTitle>
              <CardDescription className="text-slate-400">계약 및 에스크로 관련 문의사항이 있으신가요?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex -space-x-2 mb-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="size-10 rounded-full border-2 border-slate-900 bg-slate-800 overflow-hidden">
                    <Image src={`https://picsum.photos/seed/person${i}/40/40`} alt="Person" width={40} height={40} />
                  </div>
                ))}
                <div className="size-10 rounded-full border-2 border-slate-900 bg-slate-700 flex items-center justify-center text-xs font-bold">+5</div>
              </div>
              <Button className="w-full bg-white text-slate-900 hover:bg-slate-100 rounded-xl font-bold">전담 매니저 연결</Button>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
