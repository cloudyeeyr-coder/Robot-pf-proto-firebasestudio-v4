import type { Metadata } from 'next';
import './globals.css';
import { RoleProvider } from '@/context/role-context';
import { Toaster } from '@/components/ui/toaster';
import { JetBrains_Mono } from 'next/font/google';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  title: 'Knotic | Enterprise Industrial Ecosystem',
  description: 'Seamless collaboration platform for Industrial Automation.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="font-sans antialiased bg-background min-h-screen">
        <RoleProvider>
          {children}
          <Toaster />
        </RoleProvider>
      </body>
    </html>
  );
}
