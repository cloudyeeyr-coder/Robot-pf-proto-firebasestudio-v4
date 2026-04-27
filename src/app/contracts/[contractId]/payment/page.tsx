
"use client"

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AppShell } from '@/components/layout/app-shell';
import { MOCK_CONTRACTS, MOCK_ESCROW_TXS } from '@/lib/mock-data';
import { useRole } from '@/context/role-context';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Copy, CreditCard, AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react';

export default function PaymentInfoPage() {
  const { contractId } = useParams();
  const router = useRouter();
  const { role } = useRole();
  const { toast } = useToast();

  const contract = MOCK_CONTRACTS.find(c => c.id === contractId);
  const tx = MOCK_ESCROW_TXS[contractId as string];

  if (role !== 'BUYER' && role !== 'ADMIN') {
    return (
      <AppShell>
        <div className="flex flex-col items-center justify-center h-[60vh] gap-6 max-w-7xl mx-auto px-6 py-12">
          <AlertCircle className="size-12 text-danger" />
          <h2 className="text-2xl font-medium tracking-tight">Access Denied</h2>
          <Button onClick={() => router.push('/')}>Go back home</Button>
        </div>
      </AppShell>
    );
  }

  if (!contract || !tx) {
    return (
      <AppShell>
        <div className="max-w-7xl mx-auto px-6 py-24 text-center text-ink-muted">Contract not found.</div>
      </AppShell>
    );
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied!", description: "Account number copied to clipboard." });
  };

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto px-6 py-12 space-y-12">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-ink-muted">
            <ArrowLeft className="size-5" />
          </Button>
          <h1 className="text-3xl font-semibold tracking-tight text-ink-primary">Escrow Payment</h1>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <CardTitle className="text-lg font-medium">{contract.title}</CardTitle>
                <CardDescription className="text-sm text-ink-muted">{contract.partnerName}</CardDescription>
              </div>
              <Badge variant="outline">Pending Payment</Badge>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-8 py-6 border-y border-ink-border">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-ink-muted mb-1">Total Contract Value</p>
              <p className="text-2xl font-semibold font-mono text-primary-600">${contract.amount.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-ink-muted mb-1">Due Date</p>
              <p className="text-lg font-medium font-mono text-ink-primary">{contract.dueDate}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary-100 bg-primary-50/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-medium text-ink-primary">
              <CreditCard className="size-5 text-primary-600" />
              Virtual Account Details
            </CardTitle>
            <CardDescription className="text-sm text-ink-muted">Please deposit the contract amount to the account below. Escrow protection begins upon verification.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-white p-8 rounded-xl border border-ink-border space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-sm text-ink-muted">Bank</span>
                <span className="text-sm font-medium text-ink-primary">{tx.bankName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-ink-muted">Account Number</span>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-semibold font-mono text-ink-primary">{tx.accountNumber}</span>
                  <Button variant="ghost" size="icon" onClick={() => copyToClipboard(tx.accountNumber)} className="h-8 w-8 text-ink-muted">
                    <Copy className="size-4" />
                  </Button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-ink-muted">Account Holder</span>
                <span className="text-sm font-medium text-ink-primary">{tx.accountHolder}</span>
              </div>
            </div>

            <div className="flex gap-4 bg-ink-surface p-4 rounded-lg border border-ink-border text-ink-muted text-xs leading-relaxed">
              <AlertCircle className="size-5 shrink-0 text-primary-400" />
              <p>Real-time verification is only possible if you deposit exactly the contract amount to this specific account. Deposits from other accounts may cause processing delays.</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full h-12 text-base font-medium gap-2" onClick={() => router.push(`/contracts/${contractId}/payment/status`)}>
              I've completed the deposit <ArrowRight className="size-5" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </AppShell>
  );
}
