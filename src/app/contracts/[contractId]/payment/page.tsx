
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
          <h2 className="text-2xl font-bold">접근 권한이 없습니다.</h2>
          <Button onClick={() => router.push('/')}>홈으로 돌아가기</Button>
        </div>
      </AppShell>
    );
  }

  if (!contract || !tx) {
    return (
      <AppShell>
        <div className="text-center py-20">계약을 찾을 수 없습니다.</div>
      </AppShell>
    );
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "복사되었습니다.", description: "클립보드에 계좌번호가 저장되었습니다." });
  };

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="size-5" />
          </Button>
          <h1 className="text-3xl font-extrabold tracking-tight">에스크로 대금 결제</h1>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{contract.title}</CardTitle>
                <CardDescription>{contract.partnerName}</CardDescription>
              </div>
              <Badge variant="outline">결제 대기</Badge>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4 py-4 border-y">
            <div>
              <p className="text-sm text-muted-foreground">총 계약 금액</p>
              <p className="text-2xl font-bold text-primary">₩{contract.amount.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">입금 기한</p>
              <p className="text-lg font-semibold">{contract.dueDate}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="size-5 text-primary" />
              가상계좌 입금 안내
            </CardTitle>
            <CardDescription>아래 계좌로 계약 대금을 입금해 주세요. 확인 즉시 에스크로 예치가 시작됩니다.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">은행</span>
                <span className="font-bold">{tx.bankName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">계좌번호</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg">{tx.accountNumber}</span>
                  <Button variant="ghost" size="icon" onClick={() => copyToClipboard(tx.accountNumber)}>
                    <Copy className="size-4" />
                  </Button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">예금주</span>
                <span className="font-bold">{tx.accountHolder}</span>
              </div>
            </div>

            <div className="flex gap-3 bg-amber-50 p-4 rounded-xl border border-amber-100 text-amber-800 text-sm">
              <AlertCircle className="size-5 shrink-0" />
              <p>반드시 위 계좌로 입금하셔야 실시간 확인이 가능합니다. 타인 명의 입금 시 확인이 지연될 수 있습니다.</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full h-12 text-lg font-bold gap-2" onClick={() => router.push(`/contracts/${contractId}/payment/status`)}>
              입금 완료했습니다 <ArrowRight className="size-5" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </AppShell>
  );
}
