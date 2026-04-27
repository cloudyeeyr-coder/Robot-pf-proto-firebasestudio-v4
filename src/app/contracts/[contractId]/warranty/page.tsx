
"use client"

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AppShell } from '@/components/layout/app-shell';
import { MOCK_CONTRACTS } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, Download, Printer, AlertCircle, ArrowLeft, Loader2, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import jsPDF from 'jspdf';

export default function WarrantyPage() {
  const { contractId } = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);

  const contract = MOCK_CONTRACTS.find(c => c.id === contractId);

  const generateWarrantyPdf = async () => {
    if (!contract) return;
    setIsGenerating(true);
    
    try {
      const doc = new jsPDF();
      
      // 디자인적 요소 추가
      doc.setDrawColor(41, 76, 220); // Primary color
      doc.setLineWidth(1);
      doc.rect(10, 10, 190, 277);
      
      doc.setFontSize(30);
      doc.setTextColor(41, 76, 220);
      doc.text("AS 보증 증서", 105, 40, { align: 'center' });
      
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text(`계약번호: ${contract.id}`, 20, 70);
      doc.text(`프로젝트명: ${contract.title}`, 20, 80);
      doc.text(`수요기업: (주)수요테크`, 20, 90);
      doc.text(`시공사: ${contract.partnerName}`, 20, 100);
      
      doc.line(20, 110, 190, 110);
      
      doc.setFontSize(16);
      doc.text("보증 내용", 20, 125);
      doc.setFontSize(10);
      doc.text("1. 본 증서는 RoleHub Connect를 통해 체결된 위 계약의 시공 품질을 보증합니다.", 20, 135);
      doc.text("2. 보증 기간: 준공일로부터 2년", 20, 145);
      doc.text("3. 보증 범위: 시공 하자 및 제품 결함에 따른 무상 보수", 20, 155);
      
      doc.setFontSize(12);
      doc.text("위 프로젝트의 성공적인 시공과 사후 관리를 보증합니다.", 20, 190);
      
      doc.setFontSize(18);
      doc.text("RoleHub Connect", 105, 230, { align: 'center' });
      
      const today = new Date().toLocaleDateString();
      doc.setFontSize(10);
      doc.text(`발급일: ${today}`, 105, 240, { align: 'center' });

      doc.save(`Warranty_${contract.id}.pdf`);
      toast({ title: "보증서 발급 완료", description: "보증서 PDF가 다운로드되었습니다." });
    } catch (error) {
      toast({ title: "발급 실패", variant: "destructive" });
    } finally {
      setIsGenerating(false);
    }
  };

  if (!contract) {
    return (
      <AppShell>
        <div className="text-center py-20">계약을 찾을 수 없습니다.</div>
      </AppShell>
    );
  }

  const canDownload = contract.status === 'escrow_held' || contract.status === 'completed';

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="size-5" />
            </Button>
            <h1 className="text-3xl font-extrabold tracking-tight">AS 보증서 관리</h1>
          </div>
          {canDownload && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Printer className="size-4" /> 인쇄
              </Button>
              <Button size="sm" className="gap-2" onClick={generateWarrantyPdf} disabled={isGenerating}>
                {isGenerating ? <Loader2 className="animate-spin size-4" /> : <Download className="size-4" />}
                PDF 다운로드
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="relative overflow-hidden border-2 border-primary/20">
              {canDownload && <div className="absolute top-0 right-0 p-4"><ShieldCheck className="size-12 text-primary/20" /></div>}
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant={canDownload ? "default" : "secondary"}>
                    {canDownload ? "발급 가능" : "발급 대기"}
                  </Badge>
                </div>
                <CardTitle className="text-2xl">전자 보증서 (AS-CERT-2024)</CardTitle>
                <CardDescription>프로젝트 준공 후 2년간 유효한 품질 보증서입니다.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6 py-6 border-y border-dashed">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-bold mb-1">보증 대상</p>
                    <p className="font-bold">{contract.title}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-bold mb-1">보증 기간</p>
                    <p className="font-bold">24개월 (준공일 기준)</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-bold mb-1">계약 금액</p>
                    <p className="font-bold text-primary">₩{contract.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-bold mb-1">시공사</p>
                    <p className="font-bold">{contract.partnerName}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-bold text-sm">보증 약관 요약</h4>
                  <ul className="text-sm text-slate-600 space-y-2 list-disc pl-4">
                    <li>시공사의 중대한 과실로 인한 설비 오작동 발생 시 무상 수리</li>
                    <li>RoleHub 에스크로를 통해 정산된 건에 한해 효력 발생</li>
                    <li>천재지변 및 사용자 임의 조작으로 인한 파손은 제외</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-slate-900 text-white border-none">
              <CardHeader>
                <CardTitle className="text-lg">보증 안내</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-slate-400">
                <div className="flex gap-3">
                  <CheckCircle2 className="size-5 text-emerald-500 shrink-0" />
                  <p>에스크로 예치가 완료된 시점부터 보증 효력이 예약됩니다.</p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="size-5 text-emerald-500 shrink-0" />
                  <p>시공 완료 확정 시 보증서가 정식 발급됩니다.</p>
                </div>
                <div className="flex gap-3">
                  <AlertCircle className="size-5 text-amber-500 shrink-0" />
                  <p>분쟁(Dispute) 발생 시 해결 전까지 보증서 발급이 중단될 수 있습니다.</p>
                </div>
              </CardContent>
            </Card>

            {!canDownload && (
              <div className="p-6 rounded-2xl bg-amber-50 border border-amber-100 flex flex-col items-center text-center gap-4">
                <FileText className="size-10 text-amber-400" />
                <div className="space-y-1">
                  <p className="font-bold text-amber-900">대금 예치 전입니다</p>
                  <p className="text-xs text-amber-700">에스크로 예치를 완료하시면 보증서 정보를 확인하실 수 있습니다.</p>
                </div>
                <Button variant="outline" className="w-full bg-white border-amber-200 text-amber-800 hover:bg-amber-100" onClick={() => router.push(`/contracts/${contractId}/payment`)}>
                  결제하러 가기
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
