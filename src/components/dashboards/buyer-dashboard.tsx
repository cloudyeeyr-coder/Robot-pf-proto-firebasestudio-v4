"use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  History, 
  FileText, 
  ShoppingCart,
  Star,
  ArrowRight,
  CreditCard,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { MOCK_CONTRACTS } from '@/lib/mock-data';

export function BuyerDashboard() {
  const router = useRouter();
  
  const products = [
    { id: 1, name: 'Precision Sensor X1', manufacturer: 'TechSensors', rating: 4.8, price: '$499', image: 'https://picsum.photos/seed/sensor/400/300' },
    { id: 2, name: 'High-Torque Motor M2', manufacturer: 'PowerDrive', rating: 4.5, price: '$1,299', image: 'https://picsum.photos/seed/motor/400/300' },
    { id: 3, name: 'Industrial Hub V3', manufacturer: 'NexusConnect', rating: 4.9, price: '$750', image: 'https://picsum.photos/seed/hub/400/300' },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Search Section */}
      <div className="relative h-[250px] rounded-3xl overflow-hidden bg-zinc-950 mb-8">
        <Image 
          src="https://picsum.photos/seed/industrial-mono/1200/400" 
          alt="Hero" 
          fill 
          className="object-cover opacity-20 grayscale"
          data-ai-hint="industrial technology"
        />
        <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-12 text-white">
          <h1 className="text-4xl font-extrabold mb-4 font-headline uppercase italic">Industrial Connectivity</h1>
          <p className="text-lg text-white/60 mb-6 max-w-xl">Find the best SI partners and secure contracts via trusted escrow.</p>
          <div className="flex gap-2 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 size-5 text-slate-400" />
              <Input 
                placeholder="Search SI companies, solutions, keywords..." 
                className="pl-10 h-12 bg-white text-slate-900 border-none rounded-xl"
                onKeyDown={(e) => e.key === 'Enter' && router.push('/search')}
              />
            </div>
            <Button size="lg" className="rounded-xl px-8 bg-white hover:bg-zinc-200 text-zinc-950 font-bold" onClick={() => router.push('/search')}>SEARCH</Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-8">
          {/* Active Contracts Summary */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <FileText className="size-6 text-zinc-950" /> Active Contracts
              </h2>
              <Button variant="link" className="text-zinc-950 font-bold" onClick={() => router.push('/buyer/contracts')}>
                View All <ArrowRight className="size-4 ml-1" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MOCK_CONTRACTS.slice(0, 2).map((contract) => (
                <Card key={contract.id} className="border-none shadow-sm hover:shadow-md transition-all">
                  <CardContent className="p-5 flex items-center justify-between">
                    <div className="flex gap-4 items-center">
                      <div className={cn(
                        "size-10 rounded-xl flex items-center justify-center",
                        contract.status === 'payment_pending' ? "bg-zinc-100 text-zinc-600" : "bg-zinc-900 text-white"
                      )}>
                        {contract.status === 'payment_pending' ? <CreditCard className="size-5" /> : <ShieldCheck className="size-5" />}
                      </div>
                      <div>
                        <p className="text-sm font-bold truncate max-w-[150px]">{contract.title}</p>
                        <p className="text-xs text-muted-foreground">{contract.partnerName}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-zinc-950 gap-1 font-bold" onClick={() => {
                      const path = contract.status === 'payment_pending' ? `/contracts/${contract.id}/payment` : `/contracts/${contract.id}/payment/status`;
                      router.push(path);
                    }}>
                      {contract.status === 'payment_pending' ? 'PAY' : 'DETAILS'} <ArrowRight className="size-3" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Featured Catalog */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Featured Components</h2>
              <Button variant="ghost" className="text-zinc-950 gap-1 font-bold">VIEW CATALOG <ArrowRight className="size-4" /></Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((p) => (
                <Card key={p.id} className="group overflow-hidden border-none shadow-sm hover:shadow-xl transition-all rounded-2xl">
                  <div className="relative h-48">
                    <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500 grayscale hover:grayscale-0" />
                    <Badge className="absolute top-3 right-3 bg-white text-zinc-950 border-none font-bold">{p.price}</Badge>
                  </div>
                  <CardHeader className="p-4 pb-0">
                    <p className="text-xs font-bold text-muted-foreground uppercase">{p.manufacturer}</p>
                    <CardTitle className="text-lg">{p.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <div className="flex items-center gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className={cn("size-3", s <= Math.floor(p.rating) ? "fill-zinc-950 text-zinc-950" : "text-slate-200")} />
                      ))}
                      <span className="text-xs font-medium ml-1">{p.rating}</span>
                    </div>
                    <Button className="w-full gap-2 rounded-xl bg-zinc-950 hover:bg-zinc-800">
                      <ShoppingCart className="size-4" />
                      Add to RFQ
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Activity */}
        <aside className="space-y-6">
          <Card className="rounded-2xl border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-bold uppercase tracking-tight">Alert Center</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  { icon: CreditCard, label: '1 Pending Payment', date: '2h ago', color: 'zinc' },
                  { icon: ShieldCheck, label: 'Escrow Held', date: '5h ago', color: 'zinc' },
                  { icon: CheckCircle2, label: 'Warranty Issued', date: 'Yesterday', color: 'zinc' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-center cursor-pointer hover:bg-slate-50 p-2 rounded-lg transition-colors" onClick={() => router.push('/buyer/contracts')}>
                    <div className="size-10 rounded-xl flex items-center justify-center bg-zinc-100 text-zinc-950">
                      <item.icon className="size-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-6 rounded-xl border-zinc-200 hover:bg-zinc-50" onClick={() => router.push('/buyer/contracts')}>VIEW ALL ACTIVITIES</Button>
            </CardContent>
          </Card>

          <Card className="bg-zinc-950 text-white rounded-2xl border-none shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg uppercase italic font-black">Expert Support</CardTitle>
              <CardDescription className="text-slate-400">Questions about contracts or escrow?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex -space-x-2 mb-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="size-10 rounded-full border-2 border-zinc-950 bg-zinc-800 overflow-hidden grayscale">
                    <Image src={`https://picsum.photos/seed/person${i}/40/40`} alt="Person" width={40} height={40} />
                  </div>
                ))}
                <div className="size-10 rounded-full border-2 border-zinc-950 bg-zinc-800 flex items-center justify-center text-xs font-bold">+5</div>
              </div>
              <Button className="w-full bg-white text-zinc-950 hover:bg-slate-100 rounded-xl font-bold uppercase tracking-wider">Contact Manager</Button>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}