
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
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Escrow Pending', value: '12', icon: ClipboardList, color: 'blue', change: '+2 new' },
          { title: 'Active Disputes', value: '3', icon: AlertCircle, color: 'red', change: 'Stable' },
          { title: 'Unassigned AS', value: '8', icon: MessageSquare, color: 'amber', change: '-1 today' },
          { title: 'Monthly Growth', value: '+124', icon: TrendingUp, color: 'emerald', change: '+8% vs prev' },
        ].map((kpi, i) => (
          <Card key={i} className={cn("border-l-4", `border-l-${kpi.color}-500`)}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className="text-xs text-muted-foreground mt-1 font-medium">{kpi.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <Card className="xl:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Escrow Settlement Management</CardTitle>
                <CardDescription>Review and process pending escrow operations.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="pending">
              <TabsList className="mb-4">
                <TabsTrigger value="pending">Pending ({contracts.filter(c => c.status === 'payment_pending').length})</TabsTrigger>
                <TabsTrigger value="held">Held ({contracts.filter(c => c.status === 'escrow_held').length})</TabsTrigger>
                <TabsTrigger value="completed">Settled</TabsTrigger>
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
                        <TableCell className="font-mono text-xs">{contract.id}</TableCell>
                        <TableCell className="font-medium">{contract.partnerName}</TableCell>
                        <TableCell>${contract.amount.toLocaleString()}</TableCell>
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
                        <TableCell className="font-mono text-xs">{contract.id}</TableCell>
                        <TableCell><Badge variant="outline" className="text-emerald-600 bg-emerald-50">Escrow Protected</Badge></TableCell>
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

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Activity className="size-4" /> System SLA Logs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {MOCK_ADMIN_LOGS.map((log) => (
                  <div key={log.id} className="flex gap-4 items-start pb-4 border-b last:border-0 last:pb-0">
                    <div className={cn(
                      "size-8 rounded-lg flex items-center justify-center shrink-0",
                      log.status === 'success' ? "bg-emerald-100 text-emerald-600" :
                      log.status === 'warning' ? "bg-amber-100 text-amber-600" : "bg-red-100 text-red-600"
                    )}>
                      {log.status === 'success' ? <CheckCircle2 className="size-4" /> : 
                       log.status === 'warning' ? <AlertCircle className="size-4" /> : <XCircle className="size-4" />}
                    </div>
                    <div>
                      <p className="text-sm font-bold">{log.event}</p>
                      <p className="text-xs text-muted-foreground">{log.user} • {log.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-4 text-xs">View Full Audit Trail</Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{actionType === 'verify' ? 'Confirm Deposit' : 'Release Escrow Funds'}</DialogTitle>
            <DialogDescription>
              Enter a memo for this transaction. This will be visible in the system audit trail.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea 
              placeholder="e.g., Deposit confirmed via bank statement #4421" 
              value={memo} 
              onChange={(e) => setMemo(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={confirmAction}>Confirm Action</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
