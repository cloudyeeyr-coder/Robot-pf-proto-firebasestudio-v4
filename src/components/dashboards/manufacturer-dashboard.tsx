
"use client"

import React, { useState } from 'react';
import { 
  Factory, 
  Package, 
  CheckCircle2,
  AlertTriangle,
  Plus,
  Calendar,
  ShieldCheck,
  Search
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter 
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { MOCK_SI_PARTNERS, MOCK_PROPOSALS } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export function ManufacturerDashboard() {
  const { toast } = useToast();
  const [proposals, setProposals] = useState(MOCK_PROPOSALS);
  const [isIssuingBadge, setIsIssuingBadge] = useState(false);

  const handleIssueBadge = () => {
    toast({
      title: "Badge Issued",
      description: "A new certification badge has been sent to the partner.",
    });
    setIsIssuingBadge(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-ink-primary text-white border-none p-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium uppercase tracking-wider text-ink-muted">Verified SI Partners</CardTitle>
            <ShieldCheck className="size-4 text-primary-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold font-mono">42</div>
            <p className="text-xs text-ink-muted mt-1">Across 5 global regions</p>
          </CardContent>
        </Card>
        <Card className="border-ink-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium uppercase tracking-wider text-ink-muted">Active Proposals</CardTitle>
            <Package className="size-4 text-primary-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold font-mono text-ink-primary">{proposals.filter(p => p.status === 'pending').length}</div>
            <p className="text-xs text-ink-muted mt-1">Awaiting SI response</p>
          </CardContent>
        </Card>
        <Card className="border-ink-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium uppercase tracking-wider text-ink-muted">Expiring Badges</CardTitle>
            <AlertTriangle className="size-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold font-mono text-ink-primary">5</div>
            <p className="text-xs text-ink-muted mt-1">Review required within 30 days</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <Card className="border-ink-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold tracking-tight text-ink-primary uppercase">Certification Management</CardTitle>
              <CardDescription className="text-sm text-ink-muted">Issue and manage SI partner badges.</CardDescription>
            </div>
            <Dialog open={isIssuingBadge} onOpenChange={setIsIssuingBadge}>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-2"><Plus className="size-4" /> Issue Badge</Button>
              </DialogTrigger>
              <DialogContent className="rounded-xl border-ink-border">
                <DialogHeader>
                  <DialogTitle>Issue New Certification</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 py-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-medium uppercase text-ink-muted">Select SI Partner</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Search partners..." />
                      </SelectTrigger>
                      <SelectContent>
                        {MOCK_SI_PARTNERS.slice(0, 5).map(p => (
                          <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-medium uppercase text-ink-muted">Badge Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select certification" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="platinum">Platinum Partner</SelectItem>
                        <SelectItem value="security">Security Specialist</SelectItem>
                        <SelectItem value="cloud">Cloud Integration Pro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-medium uppercase text-ink-muted">Expiry Date</Label>
                    <Input type="date" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="secondary" onClick={() => setIsIssuingBadge(false)}>Cancel</Button>
                  <Button onClick={handleIssueBadge}>Confirm Issue</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent className="space-y-4">
            {MOCK_SI_PARTNERS.slice(0, 4).map((p) => (
              <div key={p.id} className="flex items-center justify-between p-5 rounded-xl border border-ink-border bg-ink-surface/30 hover:bg-ink-surface/50 transition-colors">
                <div className="flex gap-4 items-center">
                  <div className="size-10 bg-white rounded-lg border border-ink-border flex items-center justify-center text-primary-600">
                    <ShieldCheck className="size-5" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-ink-primary">{p.name}</p>
                    <p className="text-xs text-ink-muted uppercase tracking-wider">{p.badges[0]}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-xs text-ink-muted hover:text-danger">Revoke</Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-ink-border">
          <CardHeader>
            <CardTitle className="text-xl font-semibold tracking-tight text-ink-primary uppercase">Integration Proposals</CardTitle>
            <CardDescription className="text-sm text-ink-muted">Track status of project proposals sent to partners.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Partner</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {proposals.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium text-sm text-ink-primary">{p.siPartner}</TableCell>
                    <TableCell className="text-sm text-ink-primary">{p.title}</TableCell>
                    <TableCell>
                      <Badge variant={
                        p.status === 'accepted' ? 'success' :
                        p.status === 'pending' ? 'warning' : 'danger'
                      } className="border-none uppercase text-[10px] tracking-wider">
                        {p.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
