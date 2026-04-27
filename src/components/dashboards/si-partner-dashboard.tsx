
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
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-semibold tracking-tight text-ink-primary">SI Partner Hub</h2>
          <p className="text-sm text-ink-muted">Manage your proposals and leverage AI for high-impact content.</p>
        </div>
        <div className="flex gap-4">
          <Button variant="secondary" className="gap-2"><Briefcase className="size-4" /> My Projects</Button>
          <Button className="gap-2"><Plus className="size-4" /> New Proposal</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
        <div className="xl:col-span-2 space-y-12">
          <section className="space-y-6">
            <h3 className="text-xl font-medium flex items-center gap-2 text-ink-primary">
              <Bell className="size-5 text-primary-600" /> Incoming Proposals
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {proposals.filter(p => p.status === 'pending').map((p) => (
                <Card key={p.id} className="border-ink-border">
                  <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row justify-between gap-8">
                      <div className="space-y-3">
                        <Badge variant="secondary" className="bg-ink-surface text-ink-primary border-none uppercase text-[10px] tracking-wider">{p.manufacturer}</Badge>
                        <h4 className="text-lg font-medium text-ink-primary">{p.title}</h4>
                        <p className="text-sm text-ink-muted line-clamp-2 leading-relaxed">{p.description}</p>
                      </div>
                      <div className="flex items-end gap-3 shrink-0">
                        <Button variant="secondary" size="sm" onClick={() => handleAction(p, 'reject')}>Reject</Button>
                        <Button size="sm" onClick={() => handleAction(p, 'accept')}>Accept</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <h3 className="text-xl font-medium text-ink-primary">Certification Status</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { name: 'Platinum Partner', expiry: '2024-03-28', warning: true },
                { name: 'Security Verified', expiry: '2025-01-10', warning: false },
              ].map((badge, i) => (
                <Card key={i} className={cn("relative p-2 border-ink-border", badge.warning && "bg-warning/5 border-warning/20")}>
                  <CardContent className="p-6 flex items-center gap-6">
                    <div className={cn(
                      "size-12 rounded-xl flex items-center justify-center border",
                      badge.warning ? "bg-warning/10 text-warning border-warning/20" : "bg-primary-50 text-primary-600 border-primary-100"
                    )}>
                      <ShieldCheck className="size-6" />
                    </div>
                    <div>
                      <p className="font-medium text-ink-primary">{badge.name}</p>
                      <div className="text-xs text-ink-muted flex items-center gap-2 font-mono">
                        Expires: {badge.expiry} 
                        {badge.warning && <Badge variant="danger" className="h-4 text-[8px] px-1 border-none uppercase">Expiring Soon</Badge>}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-8">
          <AIAssistanceCard />
        </aside>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="rounded-xl border-ink-border">
          <DialogHeader>
            <DialogTitle>{actionType === 'accept' ? 'Accept Proposal' : 'Reject Proposal'}</DialogTitle>
            <DialogDescription className="text-ink-muted">
              {actionType === 'accept' 
                ? 'Are you ready to begin integration for this project? This will notify the manufacturer.'
                : 'Please provide a reason for rejecting this proposal.'}
            </DialogDescription>
          </DialogHeader>
          {actionType === 'reject' && (
            <div className="py-6">
              <Textarea 
                placeholder="e.g., Resource constraints for the requested timeline..." 
                value={reason} 
                onChange={(e) => setReason(e.target.value)}
                className="bg-ink-canvas"
              />
            </div>
          )}
          <DialogFooter>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={confirmAction}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
