
"use client"

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { MOCK_SI_PARTNERS, SiPartner } from '@/lib/mock-data';
import { AppShell } from '@/components/layout/app-shell';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  MapPin, 
  Calendar, 
  Download, 
  Star, 
  Trophy, 
  CheckCircle2, 
  ShieldCheck,
  ArrowLeft,
  Loader2,
  PieChart
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import jsPDF from 'jspdf';

export default function PartnerDetailPage() {
  const { siPartnerId } = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [partner, setPartner] = useState<SiPartner | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const found = MOCK_SI_PARTNERS.find(p => p.id === siPartnerId);
      if (found) {
        setPartner(found);
      } else {
        toast({ title: "Partner not found.", variant: "destructive" });
      }
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [siPartnerId, toast]);

  const generatePdf = async () => {
    if (!partner) return;
    setIsDownloading(true);
    
    try {
      const doc = new jsPDF();
      doc.setFontSize(22);
      doc.text("SI Partner Evaluation Report", 20, 20);
      
      doc.setFontSize(14);
      doc.text(`Company: ${partner.name}`, 20, 40);
      doc.text(`Region: ${partner.region}`, 20, 50);
      doc.text(`Tier: ${partner.tier}`, 20, 60);
      
      doc.text("1. Core Capabilities Summary", 20, 80);
      doc.setFontSize(10);
      doc.text(partner.capabilities.join(", "), 25, 90);
      
      doc.setFontSize(14);
      doc.text("2. Performance Metrics", 20, 110);
      doc.setFontSize(10);
      doc.text(`Success Rate: ${partner.successRate}%`, 25, 120);
      doc.text(`Avg Rating: ${partner.rating}/5.0`, 25, 130);
      doc.text(`Financial Rating: ${partner.financialTier}`, 25, 140);
      
      doc.setFontSize(14);
      doc.text("3. Certifications", 20, 160);
      doc.setFontSize(10);
      doc.text(partner.badges.join(", "), 25, 170);
      
      doc.save(`${partner.name}_Evaluation_Report.pdf`);
      toast({ title: "Report downloaded successfully." });
    } catch (error) {
      toast({ title: "Failed to generate report", variant: "destructive" });
    } finally {
      setIsDownloading(false);
    }
  };

  if (isLoading) {
    return (
      <AppShell>
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-8">
           <div className="h-20 w-full bg-ink-surface animate-pulse rounded-xl" />
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="h-40 bg-ink-surface animate-pulse rounded-xl" />
             <div className="h-40 bg-ink-surface animate-pulse rounded-xl" />
             <div className="h-40 bg-ink-surface animate-pulse rounded-xl" />
           </div>
        </div>
      </AppShell>
    );
  }

  if (!partner) return null;

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-4">
            <Button variant="ghost" size="sm" onClick={() => router.back()} className="-ml-2 text-ink-muted">
              <ArrowLeft className="mr-2 size-4" /> Back
            </Button>
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-semibold tracking-tight text-ink-primary">{partner.name}</h1>
              <Badge className="h-6 px-3">{partner.tier} Tier</Badge>
            </div>
            <div className="flex flex-wrap items-center gap-6 text-sm text-ink-muted">
              <div className="flex items-center gap-1.5"><MapPin className="size-4" />{partner.region}</div>
              <div className="flex items-center gap-1.5"><Calendar className="size-4" />Updated: {partner.updatedAt}</div>
              {partner.hasBadge && (
                <div className="flex items-center gap-1.5 text-success font-medium">
                  <ShieldCheck className="size-4" /> Verified Partner
                </div>
              )}
            </div>
          </div>
          <Button size="lg" className="gap-2" onClick={generatePdf} disabled={isDownloading}>
            {isDownloading ? <Loader2 className="animate-spin size-4" /> : <Download className="size-4" />}
            Download Evaluation PDF
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white border-ink-border">
            <CardHeader className="pb-2">
              <CardDescription className="text-xs font-medium uppercase tracking-wider text-ink-muted">Financial Rating</CardDescription>
              <CardTitle className="text-3xl font-semibold font-mono">{partner.financialTier}</CardTitle>
            </CardHeader>
            <CardContent><p className="text-sm text-ink-muted">Global Credit Standards</p></CardContent>
          </Card>
          
          <Card className="bg-white border-ink-border">
            <CardHeader className="pb-2">
              <CardDescription className="text-xs font-medium uppercase tracking-wider text-ink-muted">Success Rate</CardDescription>
              <CardTitle className="text-3xl font-semibold font-mono">{partner.successRate}%</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <Progress value={partner.successRate} className="h-2 bg-ink-surface" />
            </CardContent>
          </Card>

          <Card className="bg-white border-ink-border">
            <CardHeader className="pb-2">
              <CardDescription className="text-xs font-medium uppercase tracking-wider text-ink-muted">Avg Rating</CardDescription>
              <CardTitle className="text-3xl font-semibold font-mono flex items-center gap-2">
                {partner.rating} <Star className="size-6 fill-warning text-warning" />
              </CardTitle>
            </CardHeader>
            <CardContent><p className="text-sm text-ink-muted">From last 24 projects</p></CardContent>
          </Card>
        </div>

        <Tabs defaultValue="capabilities" className="w-full">
          <TabsList className="bg-ink-surface border-none mb-8">
            <TabsTrigger value="capabilities" className="px-8 h-9 text-sm font-medium">Capabilities</TabsTrigger>
            <TabsTrigger value="badges" className="px-8 h-9 text-sm font-medium">Certifications</TabsTrigger>
            <TabsTrigger value="reviews" className="px-8 h-9 text-sm font-medium">Reviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="capabilities">
            <Card>
              <CardContent className="p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <h3 className="text-lg font-medium flex items-center gap-2 text-ink-primary"><PieChart className="size-5 text-primary-600" /> Specializations</h3>
                  <div className="flex flex-wrap gap-2">
                    {partner.capabilities.map(cap => (
                      <div key={cap} className="bg-ink-surface px-4 py-2 rounded-lg border border-ink-border text-sm flex items-center gap-2 text-ink-primary">
                        <CheckCircle2 className="size-4 text-success" /><span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-6">
                  <h3 className="text-lg font-medium flex items-center gap-2 text-ink-primary"><Trophy className="size-5 text-primary-600" /> Introduction</h3>
                  <p className="text-base text-ink-primary leading-relaxed">{partner.description}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="badges">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {partner.badges.map(badge => (
                <Card key={badge} className="flex flex-col items-center text-center gap-4 p-8 border-ink-border">
                  <ShieldCheck className="size-12 text-primary-600" />
                  <span className="text-sm font-medium text-ink-primary">{badge}</span>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <div className="py-24 text-center text-ink-muted bg-ink-surface/30 rounded-xl border border-dashed border-ink-border">
              Review history is currently being aggregated from external platforms.
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}
