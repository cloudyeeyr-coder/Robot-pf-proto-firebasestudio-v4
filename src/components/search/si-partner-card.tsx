
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
    <Card className="group hover:border-primary/40 hover:shadow-lg transition-all border-border/50">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <CardTitle className="text-xl font-bold truncate max-w-[180px]">{partner.name}</CardTitle>
              {partner.hasBadge && (
                <ShieldCheck className="size-4 text-emerald-500 fill-emerald-50" />
              )}
            </div>
            <div className="flex items-center text-sm text-muted-foreground gap-1">
              <MapPin className="size-3" />
              {partner.region}
            </div>
          </div>
          <Badge variant={partner.tier === 'Gold' ? 'default' : partner.tier === 'Silver' ? 'secondary' : 'outline'} className="font-bold">
            {partner.tier}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <span>Success Rate</span>
            <span className="text-primary">{partner.successRate}%</span>
          </div>
          <Progress value={partner.successRate} className="h-2" />
        </div>

        <div className="flex flex-wrap gap-1.5">
          {partner.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-[10px] bg-slate-100 font-medium">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-1">
            <Star className="size-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-bold">{partner.rating}</span>
          </div>
          <Link href={`/search/${partner.id}`}>
            <Button variant="ghost" size="sm" className="gap-1 group-hover:text-primary">
              View Profile <ArrowRight className="size-3 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
