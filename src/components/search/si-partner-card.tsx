
"use client"

import React from 'react';
import { SiPartner } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { MapPin, Star, Trophy, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface SiPartnerCardProps {
  partner: SiPartner;
}

export function SiPartnerCard({ partner }: SiPartnerCardProps) {
  return (
    <Card className="group hover:border-primary-400 border-ink-border transition-colors duration-150">
      <CardHeader className="p-6 pb-4">
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg font-medium text-ink-primary truncate max-w-[200px]">{partner.name}</CardTitle>
              {partner.hasBadge && (
                <Badge variant="manufacturer" className="h-5 px-1.5 border-none">
                  <ShieldCheck className="size-3" />
                </Badge>
              )}
            </div>
            <div className="flex items-center text-xs text-ink-muted gap-1 font-medium uppercase tracking-wider">
              <MapPin className="size-3" />
              {partner.region}
            </div>
          </div>
          <Badge variant={partner.tier === 'Gold' ? 'default' : 'secondary'} className="text-[10px] font-semibold uppercase tracking-wider">
            {partner.tier}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6 pt-0 space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] font-semibold uppercase tracking-widest text-ink-muted">
            <span>Success Rate</span>
            <span className="text-primary-600 font-mono">{partner.successRate}%</span>
          </div>
          <Progress value={partner.successRate} className="h-1.5 bg-ink-surface" />
        </div>

        <div className="flex flex-wrap gap-1.5">
          {partner.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-[10px] bg-white border-ink-border text-ink-muted font-medium">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-ink-border">
          <div className="flex items-center gap-1.5">
            <Star className="size-4 fill-warning text-warning" />
            <span className="text-sm font-semibold font-mono text-ink-primary">{partner.rating}</span>
          </div>
          <Link href={`/search/${partner.id}`}>
            <Button variant="ghost" size="sm" className="h-8 px-2 text-xs font-medium text-ink-muted group-hover:text-primary-600 transition-colors">
              View Profile <ArrowRight className="size-3 ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
