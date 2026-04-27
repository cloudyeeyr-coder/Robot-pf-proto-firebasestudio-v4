
"use client"

import React, { useState } from 'react';
import { 
  Users, 
  TrendingUp, 
  ShieldCheck, 
  AlertCircle,
  Activity,
  ArrowUpRight,
  ClipboardList,
  CheckCircle2,
  XCircle,
  MessageSquare
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { MOCK_CONTRACTS, MOCK_ADMIN_LOGS, Contract } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export function AdminDashboard() {
  const { toast } = useToast();
  const [contracts, setContracts] = useState<Contract[]>(MOCK_CONTRACTS);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [memo, setMemo] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState<'verify' | 'release' | null>(null);

  const handleAction = (contract: Contract, type: 'verify' | 'release') => {
    setSelectedContract(contract);
    setActionType(type);
    setIsModalOpen(true);
  };

  const confirmAction = () => {
    if (!selectedContract || !actionType) return;

    const newStatus = actionType === 'verify' ? 'escrow_held' : 'completed';
    setContracts(prev => prev.map(c => 
      c.id === selectedContract.id ? { ...c, status: newStatus as any, adminMemo: memo } : c
    ));

    toast({
      title: actionType === 'verify' ? "Deposit Verified" : "Funds Released",
      description: `Action completed for ${selectedContract.id}.`,
    });

    setIsModalOpen(false);
    setMemo('');
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Escrow Pending', value: '12', icon: ClipboardList, color: 'primary-600', change: '+2 new' },
          { title: 'Active Disputes', value: '3', icon: AlertCircle, color: 'danger', change: 'Stable' },
          { title: 'Unassigned AS', value: '8', icon: MessageSquare, color: 'warning', change: '-1 today' },
          { title: 'Monthly Growth', value: '+124', icon: TrendingUp, color: 'success', change: '+8% vs prev' },
        ].map((kpi, i) => (
          <Card key={i} className="border-ink-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-medium uppercase tracking-wider text-ink-muted">{kpi.title}</CardTitle>
              <kpi.icon className="size-4 text-ink-muted" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold font-mono text-ink-primary">{kpi.value}</div>
              <p className="text-xs text-ink-muted mt-1">{kpi.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <Card className="xl:col-span-2 border-ink-border">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold tracking-tight text-ink-primary">Escrow Settlement Management</CardTitle>
            <CardDescription className="text-sm text-ink-muted">Review and process pending escrow operations.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="pending">
              <TabsList className="bg-ink-surface border-none mb-6">
                <TabsTrigger value="pending" className="px-6 h-9 text-sm">Pending ({contracts.filter(c => c.status === 'payment_pending').length})</TabsTrigger>
                <TabsTrigger value="held" className="px-6 h-9 text-sm">Held ({contracts.filter(c => c.status === 'escrow_held').length})</TabsTrigger>
                <TabsTrigger value="completed" className="px-6 h-9 text-sm">Settled</TabsTrigger>
              </TabsList>
              
              <TabsContent value="pending">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Contract ID</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contracts.filter(c => c.status === 'payment_pending').map((contract) => (
                      <TableRow key={contract.id}>
                        <TableCell className="font-mono text-xs text-ink-primary">{contract.id}</TableCell>
                        <TableCell className="font-medium text-ink-primary">{contract.partnerName}</TableCell>
                        <TableCell className="font-mono text-sm">${contract.amount.toLocaleString()}</TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" onClick={() => handleAction(contract, 'verify')}>Confirm Deposit</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="held">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Contract ID</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contracts.filter(c => c.status === 'escrow_held').map((contract) => (
                      <TableRow key={contract.id}>
                        <TableCell className="font-mono text-xs text-ink-primary">{contract.id}</TableCell>
                        <TableCell><Badge variant="success" className="border-none uppercase text-[10px]">Escrow Protected</Badge></TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" variant="secondary" onClick={() => handleAction(contract, 'release')}>Release Funds</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="border-ink-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-medium text-ink-primary">
              <Activity className="size-4 text-primary-600" /> System SLA Logs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {MOCK_ADMIN_LOGS.map((log) => (
                <div key={log.id} className="flex gap-4 items-start pb-6 border-b border-ink-border last:border-0 last:pb-0">
                  <div className={cn(
                    "size-8 rounded-lg flex items-center justify-center shrink-0 border",
                    log.status === 'success' ? "bg-primary-50 text-primary-600 border-primary-100" :
                    log.status === 'warning' ? "bg-warning/10 text-warning border-warning/20" : "bg-danger/10 text-danger border-danger/20"
                  )}>
                    {log.status === 'success' ? <CheckCircle2 className="size-4" /> : 
                     log.status === 'warning' ? <AlertCircle className="size-4" /> : <XCircle className="size-4" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-ink-primary">{log.event}</p>
                    <p className="text-xs text-ink-muted font-mono">{log.user} • {log.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-8 text-xs font-medium text-ink-muted">View Full Audit Trail</Button>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="rounded-xl border-ink-border">
          <DialogHeader>
            <DialogTitle>{actionType === 'verify' ? 'Confirm Deposit' : 'Release Escrow Funds'}</DialogTitle>
            <DialogDescription className="text-ink-muted">
              Enter a memo for this transaction. This will be visible in the system audit trail.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea 
              placeholder="e.g., Deposit confirmed via bank statement #4421" 
              value={memo} 
              onChange={(e) => setMemo(e.target.value)}
              className="bg-ink-canvas"
            />
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={confirmAction}>Confirm Action</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
