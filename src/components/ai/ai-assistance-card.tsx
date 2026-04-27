"use client"

import React, { useState } from 'react';
import { Sparkles, Loader2, Send, Copy, Check } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { aiSummarizeProposalDrafts } from '@/ai/flows/ai-summarize-proposal-drafts';
import { aiGenerateContentIdeasForDocuments } from '@/ai/flows/ai-generate-content-ideas-for-documents';
import { aiImproveReportDescriptions } from '@/ai/flows/ai-improve-report-descriptions';

export function AIAssistanceCard() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string | string[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('summarize');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = () => {
    const text = Array.isArray(result) ? result.join('\n') : result;
    if (text) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({ title: "Copied to clipboard" });
    }
  };

  const handleProcess = async () => {
    if (!input.trim()) {
      toast({ title: "Please enter some content first", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      if (activeTab === 'summarize') {
        const res = await aiSummarizeProposalDrafts({ proposalDraft: input });
        setResult(res.summary);
      } else if (activeTab === 'ideas') {
        const res = await aiGenerateContentIdeasForDocuments({ 
          topic: input, 
          documentType: 'Business Proposal' 
        });
        setResult(res.ideas);
      } else if (activeTab === 'improve') {
        const res = await aiImproveReportDescriptions({ originalDescription: input });
        setResult(res.improvedDescription);
      }
    } catch (error) {
      toast({ title: "AI failed to process. Please try again.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-white to-blue-50">
      <CardHeader>
        <div className="flex items-center gap-2 text-primary">
          <Sparkles className="size-5 fill-primary" />
          <CardTitle>GenAI Workspace</CardTitle>
        </div>
        <CardDescription>
          Supercharge your workflow with context-aware AI tools.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="summarize">Summarize</TabsTrigger>
            <TabsTrigger value="ideas">Ideas</TabsTrigger>
            <TabsTrigger value="improve">Polish</TabsTrigger>
          </TabsList>
          
          <div className="space-y-4">
            <Textarea
              placeholder={
                activeTab === 'summarize' ? "Paste your proposal draft here..." :
                activeTab === 'ideas' ? "What topic are you writing about?" :
                "Paste the description you want to improve..."
              }
              className="min-h-[120px] bg-white/50"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <Button onClick={handleProcess} className="w-full gap-2" disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin size-4" /> : <Send className="size-4" />}
              {isLoading ? "Thinking..." : "Generate with AI"}
            </Button>

            {result && (
              <div className="mt-4 p-4 rounded-lg bg-white border border-border animate-in fade-in slide-in-from-top-2">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Result</h4>
                  <Button variant="ghost" size="icon" onClick={handleCopy}>
                    {copied ? <Check className="size-4 text-green-500" /> : <Copy className="size-4" />}
                  </Button>
                </div>
                <div className="text-sm space-y-2 whitespace-pre-wrap">
                  {Array.isArray(result) ? (
                    <ul className="list-disc pl-4 space-y-1">
                      {result.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                  ) : (
                    <p>{result}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </Tabs>
      </CardContent>
      <CardFooter>
        <p className="text-[10px] text-muted-foreground italic text-center w-full">
          AI-generated content should be reviewed for accuracy.
        </p>
      </CardFooter>
    </Card>
  );
}