import type { Metadata } from "next";
import { Inter } from 'next/font/google';

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
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <style jsx global>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          html {
            scroll-behavior: smooth;
          }
          
          body {
            font-family: var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #f8fafc;
            background: #0f172a;
            overflow-x: hidden;
          }
          
          button {
            font-family: inherit;
            transition: all 0.2s ease;
          }
          
          button:hover {
            transform: translateY(-1px);
          }
          
          button:active {
            transform: translateY(0);
          }
          
          /* Custom scrollbar */
          ::-webkit-scrollbar {
            width: 8px;
          }
          
          ::-webkit-scrollbar-track {
            background: #1e293b;
          }
          
          ::-webkit-scrollbar-thumb {
            background: #475569;
            border-radius: 4px;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: #64748b;
          }
          
          /* Animations */
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.8;
            }
          }
          
          .animate-fade-in {
            animation: fadeInUp 0.6s ease-out;
          }
          
          .animate-pulse {
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
          
          /* Glass morphism effect */
          .glass {
            background: rgba(15, 23, 42, 0.6);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(148, 163, 184, 0.1);
          }
          
          /* Gradient text */
          .gradient-text {
            background: linear-gradient(135deg, #60a5fa, #a78bfa);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          /* Card hover effects */
          .card-hover {
            transition: all 0.3s ease;
          }
          
          .card-hover:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          }
          
          /* Loading spinner */
          .spinner {
            width: 20px;
            height: 20px;
            border: 2px solid rgba(255, 255, 255, 0.1);
            border-left-color: #60a5fa;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
          
          /* Responsive design helpers */
          @media (max-width: 768px) {
            .mobile-hide {
              display: none;
            }
            
            .mobile-full {
              width: 100%;
            }
            
            .mobile-stack {
              flex-direction: column;
            }
          }
        `}</style>
      </head>
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
