import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "CounselFlow - AI-Native Legal Operating System",
  description: "Revolutionary AI-powered legal platform for elite law firms and corporate legal departments. Advanced analytics, contract management, and comprehensive legal workflow automation.",
  keywords: ["legal AI", "law firm management", "legal compliance", "contract management", "legal analytics", "AI legal assistant"],
  authors: [{ name: "CounselFlow Team" }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <div id="root">
          {children}
        </div>
        
        {/* Background effects */}
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `
            radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(16, 185, 129, 0.05) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
          zIndex: -1
        }} />
      </body>
    </html>
  );
}
