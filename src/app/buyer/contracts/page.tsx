
"use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import { AppShell } from '@/components/layout/app-shell';
import { MOCK_CONTRACTS, Contract } from '@/lib/mock-data';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  CreditCard, 
  ShieldCheck, 
  ArrowRight,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function BuyerContractsPage() {
  const router = useRouter();

  const getStatusBadge = (status: Contract['status']) => {
    switch (status) {
      case 'payment_pending':
        return <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">Payment Pending</Badge>;
      case 'escrow_held':
        return <Badge variant="default" className="bg-emerald-500">Escrow Protected</Badge>;
      case 'completed':
        return <Badge variant="secondary">Completed</Badge>;
      case 'disputed':
        return <Badge variant="destructive">Disputed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getAction = (contract: Contract) => {
    if (contract.status === 'payment_pending') {
      return (
        <Button 
          size="sm" 
          className="gap-2" 
          onClick={() => router.push(`/contracts/${contract.id}/payment`)}
        >
          <CreditCard className="size-4" /> Pay Now
        </Button>
      );
    }
    if (contract.status === 'escrow_held') {
      return (
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2" 
          onClick={() => router.push(`/contracts/${contract.id}/payment/status`)}
        >
          <ShieldCheck className="size-4" /> Check Status
        </Button>
      );
    }
    if (contract.status === 'completed') {
      return (
        <Button 
          variant="ghost" 
          size="sm" 
          className="gap-2 text-primary" 
          onClick={() => router.push(`/contracts/${contract.id}/warranty`)}
        >
          <FileText className="size-4" /> View Warranty
        </Button>
      );
    }
    return null;
  };

  return (
    <AppShell>
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">My Contracts</h1>
          <p className="text-muted-foreground mt-2">Manage all project contracts and payment statuses.</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {MOCK_CONTRACTS.map((contract) => (
            <Card key={contract.id} className="hover:shadow-md transition-shadow overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div className="flex gap-4 items-start">
                    <div className={cn(
                      "size-12 rounded-2xl flex items-center justify-center shrink-0",
                      contract.status === 'payment_pending' ? "bg-amber-100 text-amber-600" :
                      contract.status === 'escrow_held' ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-600"
                    )}>
                      <FileText className="size-6" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-lg">{contract.title}</h3>
                        {getStatusBadge(contract.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">{contract.partnerName}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
                        <span className="flex items-center gap-1"><Clock className="size-3" /> Created: {contract.createdAt}</span>
                        <span className="font-bold text-primary">${contract.amount.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 w-full md:w-auto shrink-0 border-t md:border-t-0 pt-4 md:pt-0">
                    {getAction(contract)}
                    <Button variant="ghost" size="icon" onClick={() => router.push(`/contracts/${contract.id}/payment/status`)}>
                      <ArrowRight className="size-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
