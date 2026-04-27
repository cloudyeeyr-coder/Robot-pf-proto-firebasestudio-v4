"use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import { useRole, UserRole } from '@/context/role-context';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ShieldCheck, 
  Factory, 
  Briefcase, 
  User, 
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { KnoticWordmark, KnoticSymbol } from '@/components/brand/Logo';

export default function LoginPage() {
  const router = useRouter();
  const { setRole } = useRole();

  const handleLogin = (role: UserRole) => {
    localStorage.setItem('rolehub_logged_in', 'true');
    setRole(role);
    router.push('/');
    router.refresh();
  };

  const ROLES = [
    { 
      id: 'BUYER' as UserRole, 
      title: 'Buyer', 
      desc: 'Project orders and contract management', 
      icon: User,
      color: 'bg-white text-ink-primary border-ink-border'
    },
    { 
      id: 'SI_PARTNER' as UserRole, 
      title: 'SI Partner', 
      desc: 'Proposal writing and project execution', 
      icon: Briefcase,
      color: 'bg-primary text-white border-primary/20'
    },
    { 
      id: 'MANUFACTURER' as UserRole, 
      title: 'Manufacturer', 
      desc: 'Production processes and inventory', 
      icon: Factory,
      color: 'bg-ink-primary text-white border-ink-primary/20'
    },
    { 
      id: 'ADMIN' as UserRole, 
      title: 'Admin', 
      desc: 'Platform operations and settlement', 
      icon: ShieldCheck,
      color: 'bg-ink-surface text-ink-primary border-ink-border'
    },
  ];

  return (
    <div className="min-h-screen bg-ink-canvas flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl space-y-12">
        <div className="text-center space-y-6">
          <Link href="/" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-ink-muted hover:text-primary transition-colors group">
            <ArrowLeft className="mr-2 size-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
          </Link>
          <div className="flex justify-center">
             <KnoticWordmark className="h-12 w-auto" />
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-black tracking-tighter text-ink-primary uppercase italic">Operational Login</h1>
            <p className="text-ink-muted text-sm uppercase tracking-widest">Select your interface</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ROLES.map((role) => (
            <Card 
              key={role.id} 
              className="cursor-pointer group hover:border-primary hover:shadow-xl transition-all duration-300 border-2 rounded-2xl overflow-hidden"
              onClick={() => handleLogin(role.id)}
            >
              <CardContent className="p-0 flex items-stretch h-32">
                <div className={cn("w-24 flex items-center justify-center shrink-0 border-r", role.color)}>
                  <role.icon className="size-8" />
                </div>
                <div className="flex-1 p-6 flex flex-col justify-center bg-white">
                  <h3 className="text-xl font-bold uppercase tracking-tight group-hover:text-primary transition-colors">{role.title}</h3>
                  <p className="text-ink-muted text-xs mt-1 leading-tight">{role.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <p className="text-ink-muted text-sm font-medium">
            New to the ecosystem? <Link href="/signup/buyer" className="text-primary font-bold hover:underline underline-offset-4">Register as Buyer</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
