
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
      <div className="h-screen w-full flex items-center justify-center">
        <Loader2 className="animate-spin size-8 text-primary" />
      </div>
    );
  }

  // Not logged in: Show Landing Page
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        {/* Simple Landing Header */}
        <header className="h-20 border-b bg-white flex items-center justify-between px-8 lg:px-20 sticky top-0 z-50">
           <Link href="/" className="flex items-center gap-2 font-bold text-2xl text-primary">
              <div className="size-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                <LayoutDashboard className="text-white size-6" />
              </div>
              <span className="font-headline tracking-tight">RoleHub Connect</span>
           </Link>
           <div className="flex items-center gap-4">
             <Link href="/login">
               <Button variant="ghost" className="font-bold hidden sm:flex">로그인</Button>
             </Link>
             <Link href="/signup/buyer">
               <Button className="font-bold rounded-xl px-6 shadow-md">무료로 시작하기</Button>
             </Link>
           </div>
        </header>

        {/* Hero Section */}
        <main className="flex-1 flex flex-col items-center justify-center text-center px-4 max-w-6xl mx-auto py-20">
          <Badge className="mb-6 px-4 py-1.5 rounded-full bg-primary/10 text-primary border-primary/20 font-bold animate-fade-in">
            Enterprise Ecosystem Platform
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8 text-slate-900 leading-[1.1] animate-fade-in">
            산업 생태계를 연결하는 <br /> 
            <span className="text-primary italic">신뢰의 플랫폼</span>
          </h1>
          <p className="text-xl text-slate-600 mb-12 max-w-2xl leading-relaxed animate-fade-in" style={{ animationDelay: '0.1s' }}>
            수요기업, 제조사, SI 파트너가 한곳에 모여 안전하게 계약하고 성장합니다.
            에스크로와 전자 보증서로 비즈니스의 모든 리스크를 관리하세요.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Link href="/login">
              <Button size="lg" className="h-16 px-10 rounded-2xl text-lg font-bold gap-2 shadow-2xl shadow-primary/30 w-full sm:w-auto hover:scale-105 transition-transform">
                로그인하여 시작하기 <ArrowRight className="size-5" />
              </Button>
            </Link>
            <Link href="/signup/buyer">
              <Button size="lg" variant="outline" className="h-16 px-10 rounded-2xl text-lg font-bold border-2 w-full sm:w-auto bg-white hover:bg-slate-50">
                수요기업 회원가입
              </Button>
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-28 w-full animate-fade-in" style={{ animationDelay: '0.3s' }}>
            {[
              { icon: Zap, title: "신속한 매칭", desc: "검증된 SI 파트너 디렉토리에서 프로젝트에 최적화된 업체를 즉시 찾으세요." },
              { icon: ShieldCheck, title: "에스크로 보호", desc: "계약 대금을 안전하게 예치하고 시공 완료 시점에 안전하게 정산합니다." },
              { icon: Users, title: "통합 관리", desc: "계약 체결부터 결제 상태, AS 보증서까지 하나의 대시보드에서 통합 관리하세요." }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-10 rounded-[32px] border border-slate-100 shadow-sm text-left space-y-5 hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="size-14 bg-slate-50 rounded-2xl flex items-center justify-center text-primary">
                  <feature.icon className="size-7" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed text-lg">{feature.desc}</p>
              </div>
            ))}
          </div>
        </main>

        <footer className="py-12 border-t bg-white">
           <div className="max-w-6xl mx-auto px-8 text-center text-slate-400 text-sm">
             <p>&copy; 2024 RoleHub Connect. All rights reserved.</p>
           </div>
        </footer>
      </div>
    );
  }

  // Dashboard View (when logged in)
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
