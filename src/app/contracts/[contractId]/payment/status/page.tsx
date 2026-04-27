
"use client"

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AppShell } from '@/components/layout/app-shell';
import { MOCK_CONTRACTS, MOCK_ESCROW_TXS, EscrowTx } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Clock, ShieldCheck, AlertCircle, RefreshCcw, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function PaymentStatusPage() {
  const { contractId } = useParams();
  const router = useRouter();
  const [tx, setTx] = useState<EscrowTx | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTx(MOCK_ESCROW_TXS[contractId as string] || null);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [contractId]);

  const simulateStatusChange = () => {
    if (!tx) return;
    const nextStatusMap: Record<string, EscrowTx['status']> = {
      'pending': 'verifying',
      'verifying': 'held',
      'held': 'released'
    };
    setTx({ ...tx, status: nextStatusMap[tx.status] || tx.status });
  };

  if (isLoading) {
    return <AppShell><div className="flex items-center justify-center h-[60vh]"><RefreshCcw className="animate-spin size-8 text-primary" /></div></AppShell>;
  }

  if (!tx) return <AppShell><div className="text-center py-20">거래 내역을 찾을 수 없습니다.</div></AppShell>;

  const steps = [
    { id: 'pending', label: '입금 대기', icon: Clock },
    { id: 'verifying', label: 'Admin 확인 중', icon: RefreshCcw },
    { id: 'held', label: '예치 완료', icon: ShieldCheck },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === tx.status);
  const progressValue = ((currentStepIndex + 1) / steps.length) * 100;

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-3xl font-extrabold tracking-tight">예치 상태 조회</h1>

        <Card className="overflow-hidden border-none shadow-xl">
          <div className="bg-primary p-8 text-white">
            <div className="flex justify-between items-center mb-6">
               <span className="text-primary-foreground/80 font-medium">거래 ID: {tx.id}</span>
               <Badge className="bg-white/20 text-white border-none backdrop-blur-md">
                 {tx.status === 'held' ? '보호 중' : '진행 중'}
               </Badge>
            </div>
            <div className="space-y-2">
              <h2 className="text-4xl font-black">₩{tx.depositedAmount.toLocaleString()}</h2>
              <p className="text-primary-foreground/70">마지막 업데이트: {tx.updatedAt}</p>
            </div>
          </div>
          
          <CardContent className="p-8 space-y-8">
            <div className="space-y-6">
              <Progress value={progressValue} className="h-2" />
              <div className="grid grid-cols-3 gap-4">
                {steps.map((step, idx) => {
                  const Icon = step.icon;
                  const isCompleted = idx <= currentStepIndex;
                  const isActive = idx === currentStepIndex;
                  
                  return (
                    <div key={step.id} className="flex flex-col items-center gap-3 text-center">
                      <div className={cn(
                        "size-12 rounded-full flex items-center justify-center transition-all",
                        isCompleted ? "bg-primary text-white scale-110 shadow-lg" : "bg-slate-100 text-slate-400"
                      )}>
                        {isCompleted && !isActive ? <CheckCircle2 className="size-6" /> : <Icon className={cn("size-6", isActive && "animate-pulse")} />}
                      </div>
                      <span className={cn("text-xs font-bold", isCompleted ? "text-primary" : "text-slate-400")}>
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border space-y-4">
              <h3 className="font-bold flex items-center gap-2">
                <AlertCircle className="size-4 text-blue-500" />
                현재 상태 안내
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {tx.status === 'pending' && "입금을 기다리고 있습니다. 입금 후 최대 10분 내로 상태가 변경됩니다."}
                {tx.status === 'verifying' && "입금 내역을 확인하고 있습니다. 완료 시 에스크로 보호 상태로 전환됩니다."}
                {tx.status === 'held' && "대금이 안전하게 예치되었습니다. 시공이 완료될 때까지 RoleHub가 안전하게 보호합니다."}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" className="flex-1 h-12 rounded-xl" onClick={simulateStatusChange}>
                상태 시뮬레이션 (테스트용)
              </Button>
              {tx.status === 'held' && (
                <Button className="flex-1 h-12 rounded-xl gap-2" onClick={() => router.push(`/contracts/${contractId}/warranty`)}>
                  보증서 확인하기 <ArrowRight className="size-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
