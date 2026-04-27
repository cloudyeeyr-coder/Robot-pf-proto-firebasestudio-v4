
"use client"

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AppShell } from '@/components/layout/app-shell';
import { MOCK_CONTRACTS } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, Download, Printer, AlertCircle, ArrowLeft, Loader2, FileText, CheckCircle2 } from 'lucide-react';
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
      
      doc.setDrawColor(41, 76, 220);
      doc.setLineWidth(1);
      doc.rect(10, 10, 190, 277);
      
      doc.setFontSize(30);
      doc.setTextColor(41, 76, 220);
      doc.text("Warranty Certificate", 105, 40, { align: 'center' });
      
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text(`Contract ID: ${contract.id}`, 20, 70);
      doc.text(`Project: ${contract.title}`, 20, 80);
      doc.text(`Client: Tech Innovations Ltd.`, 20, 90);
      doc.text(`Manufacturer: ${contract.partnerName}`, 20, 100);
      
      doc.line(20, 110, 190, 110);
      
      doc.setFontSize(16);
      doc.text("Coverage Details", 20, 125);
      doc.setFontSize(10);
      doc.text("1. This certificate guarantees the quality of workmanship for the above contract.", 20, 135);
      doc.text("2. Period: 2 years from completion date.", 20, 145);
      doc.text("3. Scope: Free repairs for defects caused by manufacturing or installation.", 20, 155);
      
      doc.setFontSize(12);
      doc.text("We guarantee the success and maintenance of your project.", 20, 190);
      
      doc.setFontSize(18);
      doc.text("RoleHub Connect", 105, 230, { align: 'center' });
      
      const today = new Date().toLocaleDateString();
      doc.setFontSize(10);
      doc.text(`Issued Date: ${today}`, 105, 240, { align: 'center' });

      doc.save(`Warranty_${contract.id}.pdf`);
      toast({ title: "Warranty Issued", description: "Your warranty PDF has been downloaded." });
    } catch (error) {
      toast({ title: "Issue Failed", variant: "destructive" });
    } finally {
      setIsGenerating(false);
    }
  };

  if (!contract) {
    return (
      <AppShell>
        <div className="text-center py-20">Contract not found.</div>
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
            <h1 className="text-3xl font-extrabold tracking-tight">Warranty Management</h1>
          </div>
          {canDownload && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Printer className="size-4" /> Print
              </Button>
              <Button size="sm" className="gap-2" onClick={generateWarrantyPdf} disabled={isGenerating}>
                {isGenerating ? <Loader2 className="animate-spin size-4" /> : <Download className="size-4" />}
                Download PDF
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
                    {canDownload ? "Available" : "Awaiting Verification"}
                  </Badge>
                </div>
                <CardTitle className="text-2xl">Digital Warranty (AS-CERT-2024)</CardTitle>
                <CardDescription>Valid for 2 years after project completion.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6 py-6 border-y border-dashed">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-bold mb-1">Subject</p>
                    <p className="font-bold">{contract.title}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-bold mb-1">Period</p>
                    <p className="font-bold">24 Months</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-bold mb-1">Contract Amount</p>
                    <p className="font-bold text-primary">${contract.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-bold mb-1">Partner</p>
                    <p className="font-bold">{contract.partnerName}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-bold text-sm">Terms Summary</h4>
                  <ul className="text-sm text-slate-600 space-y-2 list-disc pl-4">
                    <li>Free repair for malfunctions due to gross negligence.</li>
                    <li>Only valid for transactions settled via RoleHub Escrow.</li>
                    <li>Excludes natural disasters and user manipulation.</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-slate-900 text-white border-none">
              <CardHeader>
                <CardTitle className="text-lg">Warranty Guide</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-slate-400">
                <div className="flex gap-3">
                  <CheckCircle2 className="size-5 text-emerald-500 shrink-0" />
                  <p>Warranty is reserved upon escrow deposit completion.</p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="size-5 text-emerald-500 shrink-0" />
                  <p>Certificate is formally issued upon completion confirm.</p>
                </div>
                <div className="flex gap-3">
                  <AlertCircle className="size-5 text-amber-500 shrink-0" />
                  <p>Issuance may be suspended during active disputes.</p>
                </div>
              </CardContent>
            </Card>

            {!canDownload && (
              <div className="p-6 rounded-2xl bg-amber-50 border border-amber-100 flex flex-col items-center text-center gap-4">
                <FileText className="size-10 text-amber-400" />
                <div className="space-y-1">
                  <p className="font-bold text-amber-900">Deposit Required</p>
                  <p className="text-xs text-amber-700">Complete escrow deposit to unlock warranty information.</p>
                </div>
                <Button variant="outline" className="w-full bg-white border-amber-200 text-amber-800 hover:bg-amber-100" onClick={() => router.push(`/contracts/${contractId}/payment`)}>
                  Go to Payment
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
