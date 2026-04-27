
"use client"

import React, { useState } from 'react';
import { 
  FileText, 
  Briefcase, 
  Sparkles, 
  Clock,
  Send,
  Plus,
  Bell,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ShieldCheck
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AIAssistanceCard } from '@/components/ai/ai-assistance-card';
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
import { MOCK_PROPOSALS, Proposal } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export function SIPartnerDashboard() {
  const { toast } = useToast();
  const [proposals, setProposals] = useState<Proposal[]>(MOCK_PROPOSALS);
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState<'accept' | 'reject' | null>(null);
  const [reason, setReason] = useState('');

  const handleAction = (proposal: Proposal, type: 'accept' | 'reject') => {
    setSelectedProposal(proposal);
    setActionType(type);
    setIsModalOpen(true);
  };

  const confirmAction = () => {
    if (!selectedProposal || !actionType) return;

    setProposals(prev => prev.map(p => 
      p.id === selectedProposal.id ? { ...p, status: actionType === 'accept' ? 'accepted' : 'rejected' } : p
    ));

    toast({
      title: actionType === 'accept' ? "Proposal Accepted" : "Proposal Rejected",
      description: `Action completed for ${selectedProposal.title}.`,
    });

    setIsModalOpen(false);
    setReason('');
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">SI Partner Hub</h2>
          <p className="text-muted-foreground">Manage your proposals and leverage AI for better content.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2"><Briefcase className="size-4" /> My Projects</Button>
          <Button className="gap-2"><Plus className="size-4" /> New Proposal</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          <section className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Bell className="size-5 text-primary" /> Incoming Proposals
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {proposals.filter(p => p.status === 'pending').map((p) => (
                <Card key={p.id} className="border-none shadow-sm hover:shadow-md transition-all">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="space-y-2">
                        <Badge variant="secondary" className="mb-2">{p.manufacturer}</Badge>
                        <h4 className="text-lg font-bold">{p.title}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-2">{p.description}</p>
                      </div>
                      <div className="flex items-end gap-2 shrink-0">
                        <Button variant="outline" size="sm" onClick={() => handleAction(p, 'reject')}>Reject</Button>
                        <Button size="sm" onClick={() => handleAction(p, 'accept')}>Accept</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-bold">Certification Status</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: 'Platinum Partner', expiry: '2024-03-28', warning: true },
                { name: 'Security Verified', expiry: '2025-01-10', warning: false },
              ].map((badge, i) => (
                <Card key={i} className={cn("relative overflow-hidden", badge.warning && "border-amber-200 bg-amber-50")}>
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className={cn(
                      "size-12 rounded-xl flex items-center justify-center",
                      badge.warning ? "bg-amber-100 text-amber-600" : "bg-primary/10 text-primary"
                    )}>
                      <ShieldCheck className="size-6" />
                    </div>
                    <div>
                      <p className="font-bold">{badge.name}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        Expires: {badge.expiry} 
                        {badge.warning && <Badge variant="destructive" className="h-4 text-[8px] px-1">Expiring Soon</Badge>}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <AIAssistanceCard />
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{actionType === 'accept' ? 'Accept Proposal' : 'Reject Proposal'}</DialogTitle>
            <DialogDescription>
              {actionType === 'accept' 
                ? 'Are you ready to begin integration for this project? This will notify the manufacturer.'
                : 'Please provide a reason for rejecting this proposal.'}
            </DialogDescription>
          </DialogHeader>
          {actionType === 'reject' && (
            <div className="py-4">
              <Textarea 
                placeholder="e.g., Resource constraints for the requested timeline..." 
                value={reason} 
                onChange={(e) => setReason(e.target.value)}
              />
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={confirmAction}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
