"use client"

import React, { useState, useEffect } from 'react';
import { useRole } from '@/context/role-context';
import { AdminDashboard } from '@/components/dashboards/admin-dashboard';
import { ManufacturerDashboard } from '@/components/dashboards/manufacturer-dashboard';
import { SIPartnerDashboard } from '@/components/dashboards/si-partner-dashboard';
import { BuyerDashboard } from '@/components/dashboards/buyer-dashboard';
import { Loader2, ArrowRight, ShieldCheck, Zap, Users, LayoutDashboard } from 'lucide-react';
import { AppShell } from '@/components/layout/app-shell';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { KnoticWordmark } from '@/components/brand/Logo';

export default function HomePage() {
  const { role, isLoading } = useRole();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingLogin, setCheckingLogin] = useState(true);

  useEffect(() => {
    const loginStatus = localStorage.getItem('rolehub_logged_in') === 'true';
    setIsLoggedIn(loginStatus);
    setCheckingLogin(false);
  }, []);

  if (isLoading || checkingLogin) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-white">
        <Loader2 className="animate-spin size-8 text-primary" />
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-ink-canvas flex flex-col">
        <header className="h-20 border-b bg-white flex items-center justify-between px-8 lg:px-20 sticky top-0 z-50">
           <Link href="/" className="flex items-center gap-2">
              <KnoticWordmark className="h-10 w-auto" />
           </Link>
           <div className="flex items-center gap-8">
             <nav className="hidden md:flex items-center gap-6 font-bold text-sm uppercase tracking-wider">
               <Link href="#" className="hover:text-primary transition-colors">Solutions</Link>
               <Link href="#" className="hover:text-primary transition-colors">Directory</Link>
               <Link href="#" className="hover:text-primary transition-colors">Support</Link>
             </nav>
             <div className="flex items-center gap-4 border-l pl-8">
               <Link href="/login">
                 <Button variant="ghost" className="font-bold">LOGIN</Button>
               </Link>
               <Link href="/signup/buyer">
                 <Button className="font-bold rounded-lg px-6">GET STARTED</Button>
               </Link>
             </div>
           </div>
        </header>

        <main className="flex-1">
          <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-white">
            <div className="absolute inset-0 z-0">
               <img 
                 src="https://picsum.photos/seed/industrial-dark/1920/1080" 
                 alt="Background" 
                 className="w-full h-full object-cover opacity-5 grayscale"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
            </div>
            
            <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
              <Badge className="mb-8 px-4 py-1 rounded-full bg-primary/10 text-primary border-none font-bold uppercase tracking-[0.2em] animate-fade-in">
                Industrial Connectivity Ecosystem
              </Badge>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 text-ink-primary uppercase leading-[0.9] animate-fade-in">
                Accelerating <br /> 
                <span className="italic underline underline-offset-8 decoration-primary/20">Trust In Automation</span>
              </h1>
              <p className="text-xl text-ink-muted mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.1s' }}>
                A unified platform for Buyers, Manufacturers, and SI Partners to collaborate with security and precision.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <Link href="/login">
                  <Button size="lg" className="h-14 px-10 rounded-xl text-base font-bold gap-2 w-full sm:w-auto uppercase tracking-wider">
                    Join the Ecosystem <ArrowRight className="size-5" />
                  </Button>
                </Link>
                <Link href="/signup/buyer">
                  <Button size="lg" variant="outline" className="h-14 px-10 rounded-xl text-base font-bold border-2 text-primary border-primary hover:bg-primary/5 transition-all w-full sm:w-auto bg-transparent uppercase tracking-wider">
                    Sign Up as Buyer
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          <section className="py-24 bg-ink-surface/50 px-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[
                  { icon: Zap, title: "Precision Matching", desc: "Our algorithm connects you with verified SI partners tailored to your technical requirements." },
                  { icon: ShieldCheck, title: "Industrial Escrow", desc: "Transactions are secured until project milestones are met, ensuring zero-risk collaboration." },
                  { icon: Users, title: "Partner Network", desc: "Access a global directory of certified systems integrators across all automation brands." }
                ].map((feature, i) => (
                  <div key={i} className="group space-y-6">
                    <div className="size-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-primary border border-ink-border group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <feature.icon className="size-8" />
                    </div>
                    <h3 className="text-2xl font-bold uppercase tracking-tight text-ink-primary">{feature.title}</h3>
                    <p className="text-ink-muted leading-relaxed text-lg border-l-2 border-ink-border pl-6 group-hover:border-primary transition-colors">
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        <footer className="py-20 border-t bg-white text-ink-muted">
           <div className="max-w-7xl mx-auto px-8">
             <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                <div className="space-y-4">
                   <KnoticWordmark className="h-8 w-auto" />
                   <p className="text-sm">Empowering industrial automation through secure collaboration and verified partnerships.</p>
                </div>
                <div>
                  <h4 className="text-ink-primary font-bold mb-4 uppercase text-xs tracking-widest">Company</h4>
                  <ul className="text-sm space-y-2">
                    <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
                    <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
                    <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-ink-primary font-bold mb-4 uppercase text-xs tracking-widest">Platform</h4>
                  <ul className="text-sm space-y-2">
                    <li><Link href="#" className="hover:text-primary transition-colors">Escrow</Link></li>
                    <li><Link href="#" className="hover:text-primary transition-colors">E-Warranty</Link></li>
                    <li><Link href="#" className="hover:text-primary transition-colors">Directory</Link></li>
                  </ul>
                </div>
                <div>
                   <h4 className="text-ink-primary font-bold mb-4 uppercase text-xs tracking-widest">Global</h4>
                   <p className="text-sm">123 Automation Ave, <br />Seoul, South Korea</p>
                </div>
             </div>
             <div className="pt-8 border-t text-center text-xs">
               <p>&copy; 2024 Knotic. All rights reserved.</p>
             </div>
           </div>
        </footer>
      </div>
    );
  }

  const renderDashboard = () => {
    switch (role) {
      case 'ADMIN': return <AdminDashboard />;
      case 'MANUFACTURER': return <ManufacturerDashboard />;
      case 'SI_PARTNER': return <SIPartnerDashboard />;
      case 'BUYER': return <BuyerDashboard />;
      default: return <BuyerDashboard />;
    }
  };

  return (
    <AppShell>
      {renderDashboard()}
    </AppShell>
  );
}
