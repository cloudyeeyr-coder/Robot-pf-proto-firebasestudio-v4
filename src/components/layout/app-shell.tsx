"use client"

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  FileText, 
  Users, 
  Settings, 
  LogOut, 
  Search,
  MessageSquare,
  ShieldCheck,
  Factory,
  Briefcase,
  History,
  Menu,
  ChevronDown,
  Bell,
  Sparkles
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

  const getNavItems = (role: UserRole) => {
    const common = [
      { name: 'Dashboard', href: '/', icon: LayoutDashboard },
      { name: 'Messages', href: '/messages', icon: MessageSquare },
    ];

    switch (role) {
      case 'ADMIN':
        return [
          ...common,
          { name: 'User Management', href: '/admin/users', icon: Users },
          { name: 'Platform Stats', href: '/admin/stats', icon: ShieldCheck },
          { name: 'Settings', href: '/settings', icon: Settings },
        ];
      case 'MANUFACTURER':
        return [
          ...common,
          { name: 'Production', href: '/manufacturer/production', icon: Factory },
          { name: 'AS History', href: '/manufacturer/service', icon: History },
          { name: 'Inventory', href: '/manufacturer/inventory', icon: Package },
        ];
      case 'SI_PARTNER':
        return [
          ...common,
          { name: 'Proposals', href: '/si-partner/proposals', icon: FileText },
          { name: 'Projects', href: '/si-partner/projects', icon: Briefcase },
          { name: 'AI Assistance', href: '/si-partner/ai-tools', icon: Sparkles },
        ];
      case 'BUYER':
      default:
        return [
          ...common,
          { name: 'Search Catalog', href: '/buyer/search', icon: Search },
          { name: 'Purchase History', href: '/buyer/orders', icon: History },
          { name: 'Contracts', href: '/buyer/contracts', icon: FileText },
        ];
    }
  };

  const navItems = getNavItems(role);

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
                  <SidebarMenuButton className="w-full justify-start gap-3">
                    <LogOut className="size-5 text-muted-foreground" />
                    <span className="group-data-[collapsible=icon]:hidden">Sign Out</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
             </SidebarMenu>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>

        <main className="flex-1 flex flex-col min-w-0">
          <header className="h-16 border-b border-border bg-white/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-4 lg:px-8">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div className="h-6 w-px bg-border hidden sm:block" />
              <h1 className="font-semibold text-lg truncate max-w-[200px] sm:max-w-none">
                {pathname === '/' ? 'Home' : pathname.split('/').pop()?.replace('-', ' ').toUpperCase()}
              </h1>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="hidden sm:flex gap-2">
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

              <Button variant="ghost" size="icon" className="relative">
                <Bell className="size-5" />
                <span className="absolute top-2 right-2 size-2 bg-destructive rounded-full border-2 border-white" />
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
                  <DropdownMenuItem className="text-destructive">Log out</DropdownMenuItem>
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
              <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-primary">Terms of Service</Link>
              <Link href="/support" className="hover:text-primary">Support</Link>
            </div>
          </footer>
        </main>
      </div>
    </SidebarProvider>
  );
}