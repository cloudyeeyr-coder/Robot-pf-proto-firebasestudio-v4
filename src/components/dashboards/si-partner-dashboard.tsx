"use client"

import React from 'react';
import { 
  FileText, 
  Briefcase, 
  Sparkles, 
  Clock,
  Send,
  Search,
  Plus
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AIAssistanceCard } from '@/components/ai/ai-assistance-card';
import { Input } from '@/components/ui/input';

export function SIPartnerDashboard() {
  const proposals = [
    { id: 1, title: 'Smart Factory Integration', client: 'MegaCorp', budget: '$250k', deadline: '2024-05-15', status: 'Draft' },
    { id: 2, title: 'Network Infrastructure Upgrade', client: 'EduSoft', budget: '$120k', deadline: '2024-05-20', status: 'In Review' },
    { id: 3, title: 'Cloud Migration Strategy', client: 'FinSafe', budget: '$85k', deadline: '2024-06-01', status: 'Approved' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">SI Partner Hub</h2>
          <p className="text-muted-foreground">Manage your proposals and leverage AI for better content.</p>
        </div>
        <Button className="gap-2">
          <Plus className="size-4" />
          Create New Proposal
        </Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Active Proposals</CardTitle>
                <CardDescription>Track the status of your submitted and draft proposals.</CardDescription>
              </div>
              <div className="relative w-full max-w-[200px] hidden sm:block">
                <Search className="absolute left-2 top-2.5 size-4 text-muted-foreground" />
                <Input placeholder="Search proposals..." className="pl-8" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {proposals.map((p) => (
                  <div key={p.id} className="group flex items-center justify-between p-4 rounded-xl border border-border bg-white hover:border-primary/50 hover:shadow-md transition-all">
                    <div className="flex gap-4 items-center">
                      <div className="size-10 rounded-lg bg-blue-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                        <FileText className="size-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{p.title}</h4>
                        <p className="text-sm text-muted-foreground">{p.client} • {p.budget}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right hidden sm:block">
                        <p className="text-xs font-medium">Deadline</p>
                        <p className="text-xs text-muted-foreground">{p.deadline}</p>
                      </div>
                      <Badge variant={p.status === 'Approved' ? 'secondary' : p.status === 'In Review' ? 'default' : 'outline'}>
                        {p.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Partner Analytics</CardTitle>
              <CardDescription>Your win rate and project delivery performance.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-6">
               <div className="space-y-2">
                 <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Win Rate</p>
                 <p className="text-3xl font-bold">78%</p>
                 <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                   <div className="h-full bg-primary w-[78%]" />
                 </div>
               </div>
               <div className="space-y-2">
                 <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Active Projects</p>
                 <p className="text-3xl font-bold">14</p>
                 <p className="text-xs text-green-600">+2 from last month</p>
               </div>
               <div className="space-y-2">
                 <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Response Time</p>
                 <p className="text-3xl font-bold">1.5h</p>
                 <p className="text-xs text-blue-600">Top 5% of partners</p>
               </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <AIAssistanceCard />
          
          <Card className="bg-primary text-primary-foreground overflow-hidden relative">
            <CardHeader className="relative z-10">
              <CardTitle>Pro Tips</CardTitle>
              <CardDescription className="text-primary-foreground/70">Increase your proposal acceptance rate.</CardDescription>
            </CardHeader>
            <CardContent className="relative z-10 space-y-4">
              <div className="flex gap-3">
                <div className="size-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">1</div>
                <p className="text-sm">Use the AI workspace to summarize long technical specs for executives.</p>
              </div>
              <div className="flex gap-3">
                <div className="size-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">2</div>
                <p className="text-sm">Include historical performance data in your proposals.</p>
              </div>
            </CardContent>
            <Sparkles className="absolute -bottom-4 -right-4 size-24 text-white/10 rotate-12" />
          </Card>
        </div>
      </div>
    </div>
  );
}