
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
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-zinc-950 text-white border-none shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold uppercase tracking-widest">Verified SI Partners</CardTitle>
            <ShieldCheck className="size-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black">42</div>
            <p className="text-xs text-white/60 mt-1">Across 5 global regions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold uppercase tracking-widest">Active Proposals</CardTitle>
            <Package className="size-4 text-zinc-950" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black">{proposals.filter(p => p.status === 'pending').length}</div>
            <p className="text-xs text-muted-foreground mt-1">Awaiting SI response</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold uppercase tracking-widest">Expiring Badges</CardTitle>
            <AlertTriangle className="size-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black">5</div>
            <p className="text-xs text-muted-foreground mt-1">Review required within 30 days</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold uppercase">Certification Management</CardTitle>
              <CardDescription>Issue and manage SI partner badges.</CardDescription>
            </div>
            <Dialog open={isIssuingBadge} onOpenChange={setIsIssuingBadge}>
              <DialogTrigger asChild>
                <Button className="gap-2 bg-zinc-950 hover:bg-zinc-800"><Plus className="size-4" /> Issue Badge</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Issue New Certification</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Select SI Partner</Label>
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
                    <Label>Badge Type</Label>
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
                    <Label>Expiry Date</Label>
                    <Input type="date" className="h-10" />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsIssuingBadge(false)}>Cancel</Button>
                  <Button className="bg-zinc-950" onClick={handleIssueBadge}>Confirm Issue</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {MOCK_SI_PARTNERS.slice(0, 4).map((p) => (
                <div key={p.id} className="flex items-center justify-between p-4 rounded-xl border bg-zinc-50 hover:bg-zinc-100 transition-colors">
                  <div className="flex gap-4 items-center">
                    <div className="size-10 bg-white rounded-lg border flex items-center justify-center text-zinc-950">
                      <ShieldCheck className="size-5" />
                    </div>
                    <div>
                      <p className="font-bold text-sm">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.badges[0]}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-xs text-zinc-500 hover:text-zinc-950">Revoke</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold uppercase">Integration Proposals</CardTitle>
            <CardDescription>Track status of project proposals sent to partners.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-bold">Partner</TableHead>
                  <TableHead className="font-bold">Project</TableHead>
                  <TableHead className="font-bold">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {proposals.map((p) => (
                  <TableRow key={p.id} className="hover:bg-zinc-50">
                    <TableCell className="font-medium text-sm">{p.siPartner}</TableCell>
                    <TableCell className="text-sm">{p.title}</TableCell>
                    <TableCell>
                      <Badge variant={
                        p.status === 'accepted' ? 'default' :
                        p.status === 'pending' ? 'outline' : 'secondary'
                      } className={cn(p.status === 'accepted' ? "bg-zinc-950" : "")}>
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
