
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
import { useRole } from '@/context/role-context';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

const buyerSignupSchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters."),
  businessNumber: z.string().regex(/^\d{3}-\d{2}-\d{5}$/, "Format: 000-00-00000"),
  representative: z.string().min(2, "Please enter representative name."),
  phone: z.string().regex(/^\d{2,3}-\d{3,4}-\d{4}$/, "Format: 000-0000-0000"),
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

type BuyerSignupValues = z.infer<typeof buyerSignupSchema>;

export default function BuyerSignupPage() {
  const { toast } = useToast();
  const { setRole } = useRole();
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
        form.setError('email', { message: 'This email is already registered.' });
        toast({ title: "Registration Failed", description: "Duplicate email address.", variant: "destructive" });
      } else {
        localStorage.setItem('rolehub_logged_in', 'true');
        setRole('BUYER');
        toast({ title: "Welcome!", description: `Registration successful for ${data.companyName}!` });
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
    <div className="min-h-screen bg-ink-canvas flex items-center justify-center p-6">
      <Card className="w-full max-w-md border-ink-border rounded-xl">
        <CardHeader className="p-8 pb-4">
          <Link href="/" className="flex items-center text-sm text-ink-muted hover:text-primary-600 transition-colors mb-6 group">
            <ArrowLeft className="mr-2 size-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
          </Link>
          <CardTitle className="text-3xl font-semibold tracking-tight">Buyer Sign Up</CardTitle>
          <CardDescription className="text-sm text-ink-muted">Start your trusted business with Knotic today.</CardDescription>
        </CardHeader>
        <CardContent className="p-8 pt-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl><Input placeholder="Tech Solutions Inc." {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="businessNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Reg. Number</FormLabel>
                    <FormControl>
                      <Input 
                        className="font-mono"
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
                    <FormLabel>Representative Name</FormLabel>
                    <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input 
                        className="font-mono"
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
                    <FormLabel>Email</FormLabel>
                    <FormControl><Input type="email" placeholder="contact@company.com" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl><Input type="password" placeholder="At least 8 characters" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full h-12 text-base font-medium mt-6" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Sign Up"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center border-t border-ink-border p-6 bg-ink-surface/30">
          <p className="text-sm text-ink-muted">Already have an account? <Link href="/login" className="text-primary-600 font-medium hover:underline">Login</Link></p>
        </CardFooter>
      </Card>
    </div>
  );
}
