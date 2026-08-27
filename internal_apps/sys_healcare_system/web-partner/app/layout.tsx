import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { CartProvider } from "@/store/CartContext";
import { AuthProvider } from '@/providers/AuthProvider';
import FloatingAIAssistant from '@/components/common/FloatingAIAssistant';
import CookieConsent from '@/components/common/CookieConsent';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import { AntdRegistry } from '@ant-design/nextjs-registry';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Healthcare Management System | Comprehensive Health Solutions",
    template: "%s | Healthcare Management System"
  },
  description: "A comprehensive healthcare management platform providing telemedicine, education, and community support.",
  keywords: ["healthcare", "telemedicine", "medical education", "health news", "patient management"],
  authors: [{ name: "Healthcare Team" }],
  creator: "Healthcare Team",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://healthcare-mgmt.example.com",
    title: "Healthcare Management System",
    description: "Your all-in-one platform for medical services and health education.",
    siteName: "Healthcare Management System",
  },
  twitter: {
    card: "summary_large_image",
    title: "Healthcare Management System",
    description: "Comprehensive health solutions at your fingertips.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <CartProvider>
            <AntdRegistry>
              <div className="flex flex-col min-h-screen">
                {/* <Header /> */}
                <main className="flex-grow">
                  <ErrorBoundary>
                    {children}
                  </ErrorBoundary>
                </main>
                {/* <Footer /> */}
              </div>
              <FloatingAIAssistant />
              <CookieConsent />
            </AntdRegistry>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
