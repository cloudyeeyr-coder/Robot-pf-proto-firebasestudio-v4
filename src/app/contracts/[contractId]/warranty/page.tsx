
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
      
      doc.setDrawColor(24, 95, 165);
      doc.setLineWidth(1);
      doc.rect(10, 10, 190, 277);
      
      doc.setFontSize(30);
      doc.setTextColor(24, 95, 165);
      doc.text("Warranty Certificate", 105, 40, { align: 'center' });
      
      doc.setFontSize(14);
      doc.setTextColor(31, 31, 30);
      doc.text(`Contract ID: ${contract.id}`, 20, 70);
      doc.text(`Project: ${contract.title}`, 20, 80);
      doc.text(`Manufacturer: ${contract.partnerName}`, 20, 100);
      
      doc.line(20, 110, 190, 110);
      
      doc.setFontSize(16);
      doc.text("Coverage Details", 20, 125);
      doc.setFontSize(10);
      doc.text("1. This certificate guarantees the quality of workmanship for the above contract.", 20, 135);
      doc.text("2. Period: 2 years from completion date.", 20, 145);
      doc.text("3. Scope: Free repairs for defects caused by manufacturing or installation.", 20, 155);
      
      doc.setFontSize(18);
      doc.text("Knotic Ecosystem", 105, 230, { align: 'center' });
      
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
        <div className="max-w-7xl mx-auto px-6 py-24 text-center text-ink-muted">Contract not found.</div>
      </AppShell>
    );
  }

  const canDownload = contract.status === 'escrow_held' || contract.status === 'completed';

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-ink-muted">
              <ArrowLeft className="size-5" />
            </Button>
            <h1 className="text-3xl font-semibold tracking-tight text-ink-primary">Warranty Management</h1>
          </div>
          {canDownload && (
            <div className="flex gap-4">
              <Button variant="secondary" size="sm" className="gap-2">
                <Printer className="size-4" /> Print
              </Button>
              <Button size="sm" className="gap-2" onClick={generateWarrantyPdf} disabled={isGenerating}>
                {isGenerating ? <Loader2 className="animate-spin size-4" /> : <Download className="size-4" />}
                Download PDF
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <Card className="relative overflow-hidden border-ink-border">
              {canDownload && <div className="absolute top-0 right-0 p-8"><ShieldCheck className="size-24 text-ink-surface" /></div>}
              <CardHeader className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant={canDownload ? "success" : "secondary"} className="border-none uppercase tracking-wider text-[10px]">
                    {canDownload ? "Verified" : "Awaiting Deposit"}
                  </Badge>
                </div>
                <CardTitle className="text-2xl font-semibold text-ink-primary">Digital Warranty (AS-CERT-2024)</CardTitle>
                <CardDescription className="text-sm text-ink-muted">Valid for 24 months after project completion.</CardDescription>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                <div className="grid grid-cols-2 gap-8 py-8 border-y border-dashed border-ink-border">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-ink-muted mb-1">Subject</p>
                    <p className="text-base font-medium text-ink-primary">{contract.title}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-ink-muted mb-1">Period</p>
                    <p className="text-base font-medium text-ink-primary">24 Months</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-ink-muted mb-1">Value</p>
                    <p className="text-base font-semibold font-mono text-primary-600">${contract.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-ink-muted mb-1">Partner</p>
                    <p className="text-base font-medium text-ink-primary">{contract.partnerName}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-ink-primary uppercase tracking-wider">Terms Summary</h4>
                  <ul className="text-sm text-ink-muted space-y-3 list-disc pl-5">
                    <li>Comprehensive coverage for malfunctions due to manufacturing or installation defects.</li>
                    <li>Guaranteed validity for transactions settled exclusively through Knotic Escrow.</li>
                    <li>Exclusions apply for natural disasters, intentional damage, or unauthorized modifications.</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          <aside className="space-y-8">
            <Card className="bg-ink-primary text-white border-none p-8">
              <h3 className="text-lg font-medium mb-6">Warranty Guide</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <CheckCircle2 className="size-5 text-success shrink-0" />
                  <p className="text-sm text-ink-border leading-relaxed">Warranty is automatically reserved upon successful escrow deposit.</p>
                </div>
                <div className="flex gap-4">
                  <CheckCircle2 className="size-5 text-success shrink-0" />
                  <p className="text-sm text-ink-border leading-relaxed">Digital certificate is formally issued once completion is confirmed by all parties.</p>
                </div>
                <div className="flex gap-4">
                  <AlertCircle className="size-5 text-warning shrink-0" />
                  <p className="text-sm text-ink-border leading-relaxed">Issuance may be suspended or revoked during active project disputes.</p>
                </div>
              </div>
            </Card>

            {!canDownload && (
              <Card className="p-8 border-ink-border bg-ink-surface/30 flex flex-col items-center text-center gap-6">
                <FileText className="size-12 text-ink-border" />
                <div className="space-y-2">
                  <p className="text-lg font-medium text-ink-primary">Deposit Required</p>
                  <p className="text-sm text-ink-muted">Complete the escrow deposit to unlock your project warranty information.</p>
                </div>
                <Button variant="secondary" className="w-full h-11" onClick={() => router.push(`/contracts/${contractId}/payment`)}>
                  Go to Payment
                </Button>
              </Card>
            )}
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
