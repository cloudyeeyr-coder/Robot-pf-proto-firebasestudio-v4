
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
        <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
          <AlertCircle className="size-12 text-destructive" />
          <h2 className="text-2xl font-bold">Access Denied</h2>
          <Button onClick={() => router.push('/')}>Go back home</Button>
        </div>
      </AppShell>
    );
  }

  if (!contract || !tx) {
    return (
      <AppShell>
        <div className="text-center py-20">Contract not found.</div>
      </AppShell>
    );
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied!", description: "Account number copied to clipboard." });
  };

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="size-5" />
          </Button>
          <h1 className="text-3xl font-extrabold tracking-tight">Escrow Payment</h1>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{contract.title}</CardTitle>
                <CardDescription>{contract.partnerName}</CardDescription>
              </div>
              <Badge variant="outline">Pending Payment</Badge>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4 py-4 border-y">
            <div>
              <p className="text-sm text-muted-foreground">Total Contract Value</p>
              <p className="text-2xl font-bold text-primary">${contract.amount.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Due Date</p>
              <p className="text-lg font-semibold">{contract.dueDate}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="size-5 text-primary" />
              Virtual Account Details
            </CardTitle>
            <CardDescription>Please deposit the contract amount to the account below. Escrow protection begins upon verification.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Bank</span>
                <span className="font-bold">{tx.bankName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Account Number</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg">{tx.accountNumber}</span>
                  <Button variant="ghost" size="icon" onClick={() => copyToClipboard(tx.accountNumber)}>
                    <Copy className="size-4" />
                  </Button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Account Holder</span>
                <span className="font-bold">{tx.accountHolder}</span>
              </div>
            </div>

            <div className="flex gap-3 bg-amber-50 p-4 rounded-xl border border-amber-100 text-amber-800 text-sm">
              <AlertCircle className="size-5 shrink-0" />
              <p>Real-time verification is only possible if you deposit exactly to this account. Using a different name may cause delays.</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full h-12 text-lg font-bold gap-2" onClick={() => router.push(`/contracts/${contractId}/payment/status`)}>
              I've completed the deposit <ArrowRight className="size-5" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </AppShell>
  );
}
