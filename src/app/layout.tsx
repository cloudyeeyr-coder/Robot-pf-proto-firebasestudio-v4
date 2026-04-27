import type {Metadata} from 'next';
import './globals.css';
import { RoleProvider } from '@/context/role-context';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'RoleHub Connect | Enterprise Ecosystem',
  description: 'Seamless collaboration platform for Buyers, Manufacturers, and SI Partners.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background min-h-screen">
        <RoleProvider>
          {children}
          <Toaster />
        </RoleProvider>
      </body>
    </html>
  );
}