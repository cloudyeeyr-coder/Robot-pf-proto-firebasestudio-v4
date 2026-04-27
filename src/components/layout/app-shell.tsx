
"use client"

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileText, 
  LogOut, 
  Search,
  ChevronDown,
  Bell
} from 'lucide-react';
import { useRole, UserRole } from '@/context/role-context';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarRail
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const { role, setRole } = useRole();
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = () => {
    localStorage.removeItem('rolehub_logged_in');
    router.push('/login');
    router.refresh();
  };

  const getNavItems = (role: UserRole) => {
    const common = [
      { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    ];

    switch (role) {
      case 'ADMIN':
        return [
          ...common,
        ];
      case 'MANUFACTURER':
        return [
          ...common,
        ];
      case 'SI_PARTNER':
        return [
          ...common,
        ];
      case 'BUYER':
      default:
        return [
          ...common,
          { name: 'SI Directory', href: '/search', icon: Search },
          { name: 'My Contracts', href: '/buyer/contracts', icon: FileText },
        ];
    }
  };

  const navItems = getNavItems(role);

  const getPageTitle = () => {
    if (pathname === '/') return 'Dashboard';
    if (pathname === '/search') return 'SI Partner Directory';
    if (pathname === '/buyer/contracts') return 'My Contracts';
    if (pathname.includes('/contracts/') && pathname.includes('/payment')) return 'Escrow Payment';
    if (pathname.includes('/contracts/') && pathname.includes('/warranty')) return 'Warranty Management';
    if (pathname.startsWith('/search/')) return 'Partner Profile';
    return 'RoleHub';
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar collapsible="icon" className="border-r border-sidebar-border bg-sidebar">
          <SidebarHeader className="h-16 flex items-center px-4 border-b border-sidebar-border">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
              <div className="size-8 bg-primary rounded-lg flex items-center justify-center">
                <LayoutDashboard className="text-white size-5" />
              </div>
              <span className="group-data-[collapsible=icon]:hidden font-headline">RoleHub</span>
            </Link>
          </SidebarHeader>
          <SidebarContent className="py-4">
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.href}
                    tooltip={item.name}
                  >
                    <Link href={item.href}>
                      <item.icon className="size-5" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-4 border-t border-sidebar-border">
             <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton className="w-full justify-start gap-3" onClick={handleSignOut}>
                    <LogOut className="size-5 text-muted-foreground" />
                    <span className="group-data-[collapsible=icon]:hidden">Sign Out</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
             </SidebarMenu>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>

        <main className="flex-1 flex flex-col min-w-0 bg-slate-50/50">
          <header className="h-16 border-b border-border bg-white/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-4 lg:px-8">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div className="h-6 w-px bg-border hidden sm:block" />
              <h1 className="font-semibold text-lg truncate max-w-[200px] sm:max-w-none">
                {getPageTitle()}
              </h1>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="hidden sm:flex gap-2 rounded-xl">
                    <Badge variant="secondary" className="font-mono text-[10px] uppercase">
                      {role.replace('_', ' ')}
                    </Badge>
                    <ChevronDown className="size-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Switch User Role</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setRole('ADMIN')}>Admin Mode</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setRole('MANUFACTURER')}>Manufacturer</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setRole('SI_PARTNER')}>SI Partner</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setRole('BUYER')}>Buyer</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="ghost" size="icon" className="relative rounded-full">
                <Bell className="size-5" />
                <span className="absolute top-2.5 right-2.5 size-2 bg-destructive rounded-full border-2 border-white" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={`https://picsum.photos/seed/${role}/100/100`} />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">John Doe</p>
                      <p className="text-xs leading-none text-muted-foreground uppercase tracking-wider">
                        {role.replace('_', ' ')}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive" onClick={handleSignOut}>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          <div className="flex-1 p-4 lg:p-8 animate-fade-in overflow-y-auto">
            {children}
          </div>

          <footer className="border-t border-border bg-white p-4 flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-2">
            <div>&copy; 2024 RoleHub Connect. All rights reserved.</div>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-primary">Privacy Policy</Link>
              <Link href="#" className="hover:text-primary">Terms of Service</Link>
              <Link href="#" className="hover:text-primary">Support</Link>
            </div>
          </footer>
        </main>
      </div>
    </SidebarProvider>
  );
}
