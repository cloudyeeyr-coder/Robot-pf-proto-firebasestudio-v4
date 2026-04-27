
"use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import { useRole, UserRole } from '@/context/role-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ShieldCheck, 
  Factory, 
  Briefcase, 
  User, 
  ArrowLeft,
  LayoutDashboard
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
      title: '수요기업 (Buyer)', 
      desc: '프로젝트 발주 및 계약 관리', 
      icon: User,
      color: 'bg-slate-100 text-slate-900 border-slate-200'
    },
    { 
      id: 'SI_PARTNER' as UserRole, 
      title: 'SI 파트너', 
      desc: '제안서 작성 및 프로젝트 수행', 
      icon: Briefcase,
      color: 'bg-blue-50 text-blue-700 border-blue-100'
    },
    { 
      id: 'MANUFACTURER' as UserRole, 
      title: '제조사 (Manufacturer)', 
      desc: '생산 공정 및 재고 관리', 
      icon: Factory,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-100'
    },
    { 
      id: 'ADMIN' as UserRole, 
      title: '관리자 (Admin)', 
      desc: '플랫폼 운영 및 정산 관리', 
      icon: ShieldCheck,
      color: 'bg-indigo-50 text-indigo-700 border-indigo-100'
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center space-y-4">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors group">
            <ArrowLeft className="mr-2 size-4 group-hover:-translate-x-1 transition-transform" /> 홈으로 돌아가기
          </Link>
          <div className="flex justify-center">
            <div className="size-16 bg-primary rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/30">
              <LayoutDashboard className="text-white size-8" />
            </div>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900">로그인</h1>
          <p className="text-slate-500 text-lg">접속하실 사용자 유형을 선택해 주세요.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ROLES.map((role) => (
            <Card 
              key={role.id} 
              className="cursor-pointer group hover:border-primary/50 hover:shadow-xl transition-all duration-300 border-2"
              onClick={() => handleLogin(role.id)}
            >
              <CardContent className="p-6 flex items-center gap-6">
                <div className={cn("size-16 rounded-2xl flex items-center justify-center shrink-0 border", role.color)}>
                  <role.icon className="size-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{role.title}</h3>
                  <p className="text-slate-500 text-sm mt-1">{role.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <p className="text-slate-400 text-sm">
            계정이 없으신가요? <Link href="/signup/buyer" className="text-primary font-bold hover:underline">수요기업으로 시작하기</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
