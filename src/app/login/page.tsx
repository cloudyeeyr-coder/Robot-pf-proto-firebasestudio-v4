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
  ArrowLeft,
  Cpu
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

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
      color: 'bg-zinc-50 text-zinc-900 border-zinc-200'
    },
    { 
      id: 'SI_PARTNER' as UserRole, 
      title: 'SI Partner', 
      desc: 'Proposal writing and project execution', 
      icon: Briefcase,
      color: 'bg-zinc-900 text-white border-zinc-800'
    },
    { 
      id: 'MANUFACTURER' as UserRole, 
      title: 'Manufacturer', 
      desc: 'Production processes and inventory', 
      icon: Factory,
      color: 'bg-red-600 text-white border-red-500'
    },
    { 
      id: 'ADMIN' as UserRole, 
      title: 'Admin', 
      desc: 'Platform operations and settlement', 
      icon: ShieldCheck,
      color: 'bg-zinc-100 text-zinc-900 border-zinc-300'
    },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl space-y-12">
        <div className="text-center space-y-6">
          <Link href="/" className="inline-flex items-center text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-primary transition-colors group">
            <ArrowLeft className="mr-2 size-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
          </Link>
          <div className="flex justify-center">
            <div className="size-20 bg-primary flex items-center justify-center shadow-2xl shadow-primary/20">
              <Cpu className="text-white size-10" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-5xl font-black tracking-tighter text-zinc-900 uppercase italic">RoleHub Login</h1>
            <p className="text-zinc-500 text-lg uppercase tracking-tight">Select your operational interface</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ROLES.map((role) => (
            <Card 
              key={role.id} 
              className="cursor-pointer group hover:border-primary hover:shadow-2xl transition-all duration-500 border-2 rounded-none overflow-hidden"
              onClick={() => handleLogin(role.id)}
            >
              <CardContent className="p-0 flex items-stretch h-32">
                <div className={cn("w-32 flex items-center justify-center shrink-0 border-r", role.color)}>
                  <role.icon className="size-10" />
                </div>
                <div className="flex-1 p-6 flex flex-col justify-center bg-white">
                  <h3 className="text-xl font-black uppercase tracking-tight group-hover:text-primary transition-colors">{role.title}</h3>
                  <p className="text-zinc-500 text-xs mt-1 leading-tight">{role.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <p className="text-zinc-400 text-sm font-bold uppercase tracking-wider">
            New to the ecosystem? <Link href="/signup/buyer" className="text-primary font-black hover:underline underline-offset-4">Register as Buyer</Link>
          </p>
        </div>
      </div>
    </div>
  );
}