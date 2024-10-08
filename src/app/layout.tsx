import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import NavBar from "./navbar";
import Providers from "./providers";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cards",
  description: "Track credit card payments",
  robots: {
    index: false,
    follow: false,
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
          <main className="container">{children}</main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
