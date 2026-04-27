
"use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

const buyerSignupSchema = z.object({
  companyName: z.string().min(2, "회사명은 2자 이상이어야 합니다."),
  businessNumber: z.string().regex(/^\d{3}-\d{2}-\d{5}$/, "사업자 번호 형식: 000-00-00000"),
  representative: z.string().min(2, "대표자 성함을 입력해 주세요."),
  phone: z.string().regex(/^\d{2,3}-\d{3,4}-\d{4}$/, "전화번호 형식: 000-0000-0000"),
  email: z.string().email("유효한 이메일 주소를 입력해 주세요."),
  password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다."),
});

type BuyerSignupValues = z.infer<typeof buyerSignupSchema>;

export default function BuyerSignupPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<BuyerSignupValues>({
    resolver: zodResolver(buyerSignupSchema),
    defaultValues: {
      companyName: '',
      businessNumber: '',
      representative: '',
      phone: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: BuyerSignupValues) => {
    setIsSubmitting(true);
    setTimeout(() => {
      if (data.email === 'duplicate@example.com') {
        form.setError('email', { message: '이미 등록된 이메일입니다.' });
        toast({ title: "등록 실패", description: "중복된 이메일 주소입니다.", variant: "destructive" });
      } else {
        localStorage.setItem('rolehub_logged_in', 'true');
        toast({ title: "가입 성공!", description: `${data.companyName}님 환영합니다!` });
        router.push('/');
      }
      setIsSubmitting(false);
    }, 1200);
  };

  const formatBusinessNumber = (value: string) => {
    const numbers = value.replace(/[^\d]/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 5) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 5)}-${numbers.slice(5, 10)}`;
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/[^\d]/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-none rounded-3xl overflow-hidden">
        <CardHeader className="bg-white p-8 pb-4">
          <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-6 group">
            <ArrowLeft className="mr-2 size-4 group-hover:-translate-x-1 transition-transform" /> 홈으로 돌아가기
          </Link>
          <CardTitle className="text-3xl font-black tracking-tight">수요기업 회원가입</CardTitle>
          <CardDescription className="text-base">RoleHub와 함께 신뢰할 수 있는 비즈니스를 시작해 보세요.</CardDescription>
        </CardHeader>
        <CardContent className="p-8 pt-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>회사명</FormLabel>
                    <FormControl><Input className="h-11 rounded-xl" placeholder="주식회사 테크솔루션" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="businessNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>사업자 등록 번호</FormLabel>
                    <FormControl>
                      <Input 
                        className="h-11 rounded-xl"
                        placeholder="000-00-00000" 
                        {...field} 
                        onChange={(e) => field.onChange(formatBusinessNumber(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="representative"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>대표자명</FormLabel>
                    <FormControl><Input className="h-11 rounded-xl" placeholder="홍길동" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>연락처</FormLabel>
                    <FormControl>
                      <Input 
                        className="h-11 rounded-xl"
                        placeholder="010-0000-0000" 
                        {...field} 
                        onChange={(e) => field.onChange(formatPhone(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이메일</FormLabel>
                    <FormControl><Input className="h-11 rounded-xl" type="email" placeholder="contact@company.com" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비밀번호</FormLabel>
                    <FormControl><Input className="h-11 rounded-xl" type="password" placeholder="8자 이상 입력" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full h-12 text-lg font-bold mt-6 rounded-xl shadow-lg shadow-primary/20" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "가입하기"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center border-t p-6 bg-slate-50/50">
          <p className="text-sm text-muted-foreground">이미 계정이 있으신가요? <Link href="/signup/buyer" className="text-primary font-bold hover:underline">로그인</Link></p>
        </CardFooter>
      </Card>
    </div>
  );
}
