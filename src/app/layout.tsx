import { Toaster } from '@/components/ui/sonner';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import NavBar from '@/components/common/navbar';
import AuthLayout from '@/components/common/auth-layout';
import Footer from '@/components/common/footer';

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Cards',
  description: 'Track credit card payments',
  robots: {
    index: false,
    follow: false,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${poppins.className} antialiased`}>
        <Providers>
          <NavBar />
          {/* NOTE: header height = 96px, footer height = 65px */}
          <main className="container min-h-[calc(100vh-96px-65px)]">
            <AuthLayout>{children}</AuthLayout>
          </main>
          <Footer />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
