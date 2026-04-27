
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
  PieChart,
  FileText
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
    // Mock fetch delay
    const timer = setTimeout(() => {
      const found = MOCK_SI_PARTNERS.find(p => p.id === siPartnerId);
      if (found) {
        setPartner(found);
      } else {
        toast({ title: "Partner not found", variant: "destructive" });
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
      
      doc.text("1. Capabilities Summary", 20, 80);
      doc.setFontSize(10);
      doc.text(partner.capabilities.join(", "), 25, 90);
      
      doc.setFontSize(14);
      doc.text("2. Performance Metrics", 20, 110);
      doc.setFontSize(10);
      doc.text(`Success Rate: ${partner.successRate}%`, 25, 120);
      doc.text(`Average Rating: ${partner.rating}/5.0`, 25, 130);
      doc.text(`Financial Rating: ${partner.financialTier}`, 25, 140);
      
      doc.setFontSize(14);
      doc.text("3. Active Credentials", 20, 160);
      doc.setFontSize(10);
      doc.text(partner.badges.join(", "), 25, 170);
      
      doc.setFontSize(14);
      doc.text("4. Evaluation Note", 20, 190);
      doc.setFontSize(10);
      doc.text(partner.description, 25, 200, { maxWidth: 160 });
      
      doc.save(`${partner.name}_Report.pdf`);
      toast({ title: "Report downloaded successfully" });
    } catch (error) {
      toast({ title: "Failed to generate report", variant: "destructive" });
    } finally {
      setIsDownloading(false);
    }
  };

  if (isLoading) {
    return (
      <AppShell>
        <div className="flex flex-col gap-8">
           <div className="h-20 w-full bg-slate-100 animate-pulse rounded-2xl" />
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="h-40 bg-slate-100 animate-pulse rounded-2xl" />
             <div className="h-40 bg-slate-100 animate-pulse rounded-2xl" />
             <div className="h-40 bg-slate-100 animate-pulse rounded-2xl" />
           </div>
           <div className="h-96 bg-slate-100 animate-pulse rounded-2xl" />
        </div>
      </AppShell>
    );
  }

  if (!partner) {
    return (
      <AppShell>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <FileText className="size-16 text-slate-300 mb-4" />
          <h2 className="text-3xl font-bold">404 - Partner Not Found</h2>
          <p className="text-muted-foreground mt-2">The partner you are looking for does not exist or has been removed.</p>
          <Button onClick={() => router.push('/search')} className="mt-6">Back to Search</Button>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="flex flex-col gap-8 max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <Button variant="ghost" size="sm" onClick={() => router.back()} className="mb-2 -ml-2 text-muted-foreground">
              <ArrowLeft className="mr-2 size-4" /> Back
            </Button>
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-extrabold tracking-tight font-headline">{partner.name}</h1>
              <Badge className="h-6 px-3 bg-primary/10 text-primary border-none font-bold">{partner.tier} Tier</Badge>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="size-4" />
                {partner.region}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="size-4" />
                Updated: {partner.updatedAt}
              </div>
              {partner.hasBadge && (
                <div className="flex items-center gap-1 text-emerald-600 font-bold">
                  <ShieldCheck className="size-4" />
                  Verified
                </div>
              )}
            </div>
          </div>
          <Button size="lg" className="gap-2 rounded-xl shadow-lg" onClick={generatePdf} disabled={isDownloading}>
            {isDownloading ? <Loader2 className="animate-spin size-4" /> : <Download className="size-4" />}
            Eval Report PDF
          </Button>
        </div>

        {/* Core Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-indigo-50 to-white border-indigo-100 shadow-md rounded-2xl">
            <CardHeader className="pb-2">
              <CardDescription className="font-bold text-indigo-600 uppercase text-[10px] tracking-widest">Financial Grade</CardDescription>
              <CardTitle className="text-3xl font-black text-indigo-900">{partner.financialTier}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500">Based on latest KOREA-CREDIT report.</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-emerald-50 to-white border-emerald-100 shadow-md rounded-2xl">
            <CardHeader className="pb-2">
              <CardDescription className="font-bold text-emerald-600 uppercase text-[10px] tracking-widest">Project Success</CardDescription>
              <CardTitle className="text-3xl font-black text-emerald-900">{partner.successRate}%</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
               <Progress value={partner.successRate} className="h-2 bg-emerald-100" />
               <p className="text-sm text-slate-500">Industry avg: 72%</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-50 to-white border-amber-100 shadow-md rounded-2xl">
            <CardHeader className="pb-2">
              <CardDescription className="font-bold text-amber-600 uppercase text-[10px] tracking-widest">Avg. Partner Rating</CardDescription>
              <CardTitle className="text-3xl font-black text-amber-900 flex items-center gap-2">
                {partner.rating} <Star className="size-6 fill-amber-400 text-amber-400" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500">Calculated from 24 recent projects.</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Content */}
        <Tabs defaultValue="capabilities" className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-12 p-0 mb-6">
            <TabsTrigger value="capabilities" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 h-full font-bold">Capabilities</TabsTrigger>
            <TabsTrigger value="badges" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 h-full font-bold">Certifications</TabsTrigger>
            <TabsTrigger value="reviews" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 h-full font-bold">Reviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="capabilities" className="mt-0">
            <Card className="rounded-2xl border-none shadow-sm bg-slate-50">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      <PieChart className="size-5 text-primary" /> Key Capabilities
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {partner.capabilities.map(cap => (
                        <div key={cap} className="bg-white px-4 py-3 rounded-xl border border-slate-200 shadow-sm flex items-center gap-2">
                          <CheckCircle2 className="size-4 text-emerald-500" />
                          <span className="font-medium">{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      <Trophy className="size-5 text-primary" /> Company Profile
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {partner.description} We focus on providing end-to-end industrial automation and digital transformation services for small to medium manufacturing units.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="badges" className="mt-0">
            <Card className="rounded-2xl border-none shadow-sm bg-slate-50">
              <CardContent className="p-8">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                  {partner.badges.map(badge => (
                    <div key={badge} className="flex flex-col items-center text-center gap-3 p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                      <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <ShieldCheck className="size-6" />
                      </div>
                      <span className="text-sm font-bold">{badge}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-0">
            <div className="space-y-4">
              {[1, 2].map(i => (
                <Card key={i} className="rounded-2xl shadow-sm border-none bg-slate-50">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex gap-4">
                        <div className="size-10 rounded-full bg-slate-200" />
                        <div>
                          <p className="font-bold">Project Manager {i}</p>
                          <p className="text-xs text-muted-foreground">Manufacturing Co. • 3 months ago</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map(s => (
                          <Star key={s} className="size-3 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      "Working with {partner.name} was a smooth experience. Their technical expertise in ERP integration saved us weeks of troubleshooting. Highly recommended for complex industrial projects."
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}
