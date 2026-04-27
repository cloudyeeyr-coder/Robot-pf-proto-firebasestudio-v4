
"use client"

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AppShell } from '@/components/layout/app-shell';
import { MOCK_CONTRACTS, MOCK_ESCROW_TXS, EscrowTx } from '@/lib/mock-data';
import { Card, CardContent } from '@/components/ui/card';
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
    return <AppShell><div className="flex items-center justify-center h-[60vh] max-w-7xl mx-auto"><RefreshCcw className="animate-spin size-8 text-primary-600" /></div></AppShell>;
  }

  if (!tx) return <AppShell><div className="max-w-7xl mx-auto px-6 py-24 text-center text-ink-muted">Transaction history not found.</div></AppShell>;

  const steps = [
    { id: 'pending', label: 'Pending Deposit', icon: Clock },
    { id: 'verifying', label: 'Verifying', icon: RefreshCcw },
    { id: 'held', label: 'Escrow Held', icon: ShieldCheck },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === tx.status);
  const progressValue = ((currentStepIndex + 1) / steps.length) * 100;

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto px-6 py-12 space-y-12">
        <h1 className="text-3xl font-semibold tracking-tight text-ink-primary">Escrow Status</h1>

        <Card className="overflow-hidden border-ink-border shadow-none">
          <div className="bg-ink-primary p-8 text-white">
            <div className="flex justify-between items-center mb-8">
               <span className="text-xs font-mono uppercase tracking-widest text-ink-border">TX ID: {tx.id}</span>
               <Badge className="bg-primary-600 text-white border-none text-[10px] uppercase font-semibold">
                 {tx.status === 'held' ? 'Protected' : 'Processing'}
               </Badge>
            </div>
            <div className="space-y-2">
              <h2 className="text-4xl font-semibold font-mono">${tx.depositedAmount.toLocaleString()}</h2>
              <p className="text-xs font-mono text-ink-muted">Last Update: {tx.updatedAt}</p>
            </div>
          </div>
          
          <CardContent className="p-8 space-y-12">
            <div className="space-y-8">
              <Progress value={progressValue} className="h-1.5 bg-ink-surface" />
              <div className="grid grid-cols-3 gap-4">
                {steps.map((step, idx) => {
                  const Icon = step.icon;
                  const isCompleted = idx <= currentStepIndex;
                  const isActive = idx === currentStepIndex;
                  
                  return (
                    <div key={step.id} className="flex flex-col items-center gap-4 text-center">
                      <div className={cn(
                        "size-12 rounded-full flex items-center justify-center transition-all border",
                        isCompleted ? "bg-primary-600 text-white border-primary-600" : "bg-ink-surface text-ink-muted border-ink-border"
                      )}>
                        {isCompleted && !isActive ? <CheckCircle2 className="size-6" /> : <Icon className={cn("size-6", isActive && "animate-pulse")} />}
                      </div>
                      <span className={cn("text-[10px] font-semibold uppercase tracking-wider", isCompleted ? "text-primary-600" : "text-ink-muted")}>
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-6 bg-ink-surface/30 rounded-xl border border-ink-border space-y-4">
              <h3 className="text-sm font-medium flex items-center gap-2 text-ink-primary">
                <AlertCircle className="size-4 text-primary-400" />
                Current Status Details
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed">
                {tx.status === 'pending' && "Awaiting deposit. The status will update automatically within 10 minutes once payment is detected."}
                {tx.status === 'verifying' && "Verifying your deposit through our settlement network. Funds will be moved to secure escrow shortly."}
                {tx.status === 'held' && "Funds are securely deposited and protected. Knotic secures your payment until project completion milestones are met."}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button variant="secondary" className="flex-1 h-12" onClick={simulateStatusChange}>
                Simulate Status Change (Test)
              </Button>
              {tx.status === 'held' && (
                <Button className="flex-1 h-12 gap-2" onClick={() => router.push(`/contracts/${contractId}/warranty`)}>
                  View Warranty <ArrowRight className="size-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
