"use client"

import React from 'react';
import { 
  Search, 
  History, 
  FileText, 
  ShoppingCart,
  Star,
  ArrowRight,
  Filter
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export function BuyerDashboard() {
  const products = [
    { id: 1, name: 'Precision Sensor X1', manufacturer: 'TechSensors', rating: 4.8, price: '$499', image: 'https://picsum.photos/seed/sensor/400/300' },
    { id: 2, name: 'High-Torque Motor M2', manufacturer: 'PowerDrive', rating: 4.5, price: '$1,299', image: 'https://picsum.photos/seed/motor/400/300' },
    { id: 3, name: 'Industrial Hub V3', manufacturer: 'NexusConnect', rating: 4.9, price: '$750', image: 'https://picsum.photos/seed/hub/400/300' },
  ];

  return (
    <div className="space-y-8">
      <div className="relative h-[250px] rounded-3xl overflow-hidden bg-primary mb-8">
        <Image 
          src="https://picsum.photos/seed/industrial/1200/400" 
          alt="Hero" 
          fill 
          className="object-cover opacity-40"
          data-ai-hint="industrial technology"
        />
        <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-12 text-white">
          <h1 className="text-4xl font-extrabold mb-4 font-headline">Find the Right Solution</h1>
          <p className="text-lg text-white/80 mb-6 max-w-xl">Search through thousands of industrial components and connect directly with manufacturers.</p>
          <div className="flex gap-2 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 size-5 text-slate-400" />
              <Input 
                placeholder="Search by part number, manufacturer, or keywords..." 
                className="pl-10 h-12 bg-white text-slate-900 border-none rounded-xl"
              />
            </div>
            <Button size="lg" className="rounded-xl px-8 bg-secondary hover:bg-secondary/90 text-primary font-bold">Search</Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-8">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Featured Catalog</h2>
              <Button variant="ghost" className="text-primary gap-1">View All <ArrowRight className="size-4" /></Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((p) => (
                <Card key={p.id} className="group overflow-hidden border-none shadow-sm hover:shadow-xl transition-all rounded-2xl">
                  <div className="relative h-48">
                    <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <Badge className="absolute top-3 right-3 bg-white/90 text-primary backdrop-blur-sm border-none">{p.price}</Badge>
                  </div>
                  <CardHeader className="p-4 pb-0">
                    <p className="text-xs font-bold text-muted-foreground uppercase">{p.manufacturer}</p>
                    <CardTitle className="text-lg">{p.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <div className="flex items-center gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className={cn("size-3", s <= Math.floor(p.rating) ? "fill-amber-400 text-amber-400" : "text-slate-300")} />
                      ))}
                      <span className="text-xs font-medium ml-1">{p.rating}</span>
                    </div>
                    <Button className="w-full gap-2 rounded-xl">
                      <ShoppingCart className="size-4" />
                      Add to RFQ
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  { icon: FileText, label: 'Contract Updated', date: '2h ago', color: 'blue' },
                  { icon: ShoppingCart, label: 'RFQ Submitted', date: '5h ago', color: 'emerald' },
                  { icon: History, label: 'Order Delivered', date: 'Yesterday', color: 'purple' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-center">
                    <div className={cn("size-10 rounded-xl flex items-center justify-center", 
                      item.color === 'blue' ? 'bg-blue-50 text-blue-600' : 
                      item.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' : 'bg-purple-50 text-purple-600'
                    )}>
                      <item.icon className="size-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-6 rounded-xl">See Full History</Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 text-white rounded-2xl border-none">
            <CardHeader>
              <CardTitle className="text-lg">Need Support?</CardTitle>
              <CardDescription className="text-slate-400">Our dedicated account managers are here to help.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex -space-x-2 mb-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="size-10 rounded-full border-2 border-slate-900 bg-slate-800 overflow-hidden">
                    <Image src={`https://picsum.photos/seed/person${i}/40/40`} alt="Person" width={40} height={40} />
                  </div>
                ))}
                <div className="size-10 rounded-full border-2 border-slate-900 bg-slate-700 flex items-center justify-center text-xs font-bold">+12</div>
              </div>
              <Button className="w-full bg-white text-slate-900 hover:bg-slate-100 rounded-xl font-bold">Connect Now</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
