
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
    const timer = setTimeout(() => {
      const found = MOCK_SI_PARTNERS.find(p => p.id === siPartnerId);
      if (found) {
        setPartner(found);
      } else {
        toast({ title: "파트너를 찾을 수 없습니다.", variant: "destructive" });
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
      doc.text("SI 파트너 평가 리포트", 20, 20);
      
      doc.setFontSize(14);
      doc.text(`업체명: ${partner.name}`, 20, 40);
      doc.text(`지역: ${partner.region}`, 20, 50);
      doc.text(`등급: ${partner.tier}`, 20, 60);
      
      doc.text("1. 주요 역량 요약", 20, 80);
      doc.setFontSize(10);
      doc.text(partner.capabilities.join(", "), 25, 90);
      
      doc.setFontSize(14);
      doc.text("2. 성과 지표", 20, 110);
      doc.setFontSize(10);
      doc.text(`시공 성공률: ${partner.successRate}%`, 25, 120);
      doc.text(`평균 평점: ${partner.rating}/5.0`, 25, 130);
      doc.text(`재무 건전성: ${partner.financialTier}`, 25, 140);
      
      doc.setFontSize(14);
      doc.text("3. 보유 인증", 20, 160);
      doc.setFontSize(10);
      doc.text(partner.badges.join(", "), 25, 170);
      
      doc.save(`${partner.name}_평가리포트.pdf`);
      toast({ title: "리포트가 다운로드되었습니다." });
    } catch (error) {
      toast({ title: "리포트 생성 실패", variant: "destructive" });
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
        </div>
      </AppShell>
    );
  }

  if (!partner) return null;

  return (
    <AppShell>
      <div className="flex flex-col gap-8 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <Button variant="ghost" size="sm" onClick={() => router.back()} className="mb-2 -ml-2">
              <ArrowLeft className="mr-2 size-4" /> 뒤로가기
            </Button>
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-extrabold tracking-tight">{partner.name}</h1>
              <Badge className="h-6 px-3">{partner.tier} 등급</Badge>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-1"><MapPin className="size-4" />{partner.region}</div>
              <div className="flex items-center gap-1"><Calendar className="size-4" />갱신일: {partner.updatedAt}</div>
              {partner.hasBadge && <div className="flex items-center gap-1 text-emerald-600 font-bold"><ShieldCheck className="size-4" />인증됨</div>}
            </div>
          </div>
          <Button size="lg" className="gap-2" onClick={generatePdf} disabled={isDownloading}>
            {isDownloading ? <Loader2 className="animate-spin size-4" /> : <Download className="size-4" />}
            기안 리포트 PDF
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-indigo-50/50 border-indigo-100">
            <CardHeader className="pb-2">
              <CardDescription className="text-indigo-600 font-bold text-[10px] uppercase tracking-widest">재무 등급</CardDescription>
              <CardTitle className="text-3xl font-black">{partner.financialTier}</CardTitle>
            </CardHeader>
            <CardContent><p className="text-sm text-slate-500">KOREA-CREDIT 기준</p></CardContent>
          </Card>
          
          <Card className="bg-emerald-50/50 border-emerald-100">
            <CardHeader className="pb-2">
              <CardDescription className="text-emerald-600 font-bold text-[10px] uppercase tracking-widest">시공 성공률</CardDescription>
              <CardTitle className="text-3xl font-black">{partner.successRate}%</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
               <Progress value={partner.successRate} className="h-2 bg-emerald-100" />
            </CardContent>
          </Card>

          <Card className="bg-amber-50/50 border-amber-100">
            <CardHeader className="pb-2">
              <CardDescription className="text-amber-600 font-bold text-[10px] uppercase tracking-widest">평균 평점</CardDescription>
              <CardTitle className="text-3xl font-black flex items-center gap-2">
                {partner.rating} <Star className="size-6 fill-amber-400 text-amber-400" />
              </CardTitle>
            </CardHeader>
            <CardContent><p className="text-sm text-slate-500">최근 24개 프로젝트 기반</p></CardContent>
          </Card>
        </div>

        <Tabs defaultValue="capabilities" className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-12 p-0 mb-6">
            <TabsTrigger value="capabilities" className="px-6 h-full font-bold">핵심 역량</TabsTrigger>
            <TabsTrigger value="badges" className="px-6 h-full font-bold">보유 인증</TabsTrigger>
            <TabsTrigger value="reviews" className="px-6 h-full font-bold">리뷰</TabsTrigger>
          </TabsList>
          
          <TabsContent value="capabilities">
            <Card className="bg-slate-50 border-none">
              <CardContent className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-bold flex items-center gap-2"><PieChart className="size-5 text-primary" /> 전문 분야</h3>
                  <div className="flex flex-wrap gap-2">
                    {partner.capabilities.map(cap => (
                      <div key={cap} className="bg-white px-4 py-2 rounded-xl border flex items-center gap-2">
                        <CheckCircle2 className="size-4 text-emerald-500" /><span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-bold flex items-center gap-2"><Trophy className="size-5 text-primary" /> 파트너 소개</h3>
                  <p className="text-slate-600 leading-relaxed">{partner.description}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="badges">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {partner.badges.map(badge => (
                <div key={badge} className="flex flex-col items-center text-center gap-3 p-6 bg-slate-50 rounded-2xl border">
                  <ShieldCheck className="size-10 text-primary" />
                  <span className="text-sm font-bold">{badge}</span>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}
