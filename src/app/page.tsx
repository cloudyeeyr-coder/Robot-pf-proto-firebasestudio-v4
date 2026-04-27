"use client"

import React from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { useRole } from '@/context/role-context';
import { AdminDashboard } from '@/components/dashboards/admin-dashboard';
import { ManufacturerDashboard } from '@/components/dashboards/manufacturer-dashboard';
import { SIPartnerDashboard } from '@/components/dashboards/si-partner-dashboard';
import { BuyerDashboard } from '@/components/dashboards/buyer-dashboard';
import { Loader2 } from 'lucide-react';

export default function HomePage() {
  const { role, isLoading } = useRole();

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader2 className="animate-spin size-8 text-primary" />
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