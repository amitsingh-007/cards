import { Toaster } from '@/components/ui/sonner';
import type { Metadata, Viewport } from 'next';
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
  applicationName: 'Cards',
  manifest: '/manifest.webmanifest.json',
  robots: {
    index: false,
    follow: false,
  },
  icons: {
    icon: '/cards_192.png',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en',
    title: 'Cards',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
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
          {/* NOTE: header height = 96px, footer height = 72px */}
          <main className="container min-h-[calc(100vh-96px-72px)]">
            <AuthLayout>{children}</AuthLayout>
          </main>
          <Footer />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
