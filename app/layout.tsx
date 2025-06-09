import type React from "react";
import type { Metadata } from "next";
import { Inter, Cairo } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const cairo = Cairo({ subsets: ["arabic", "latin"] });

export const metadata: Metadata = {
  title: "Hamedenho Ai - المساعد الذكي",
  description: "مساعدك الذكي المتقدم بدعم اللغة العربية والرياضيات",
  keywords: ["AI", "chatbot", "assistant", "هامدنهو", "ذكي", "عربي"],
  authors: [{ name: "فريق هامدنهو" }],
  viewport: "width=device-width, initial-scale=1",
  generator: "Mohamed Hamedenho",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className="h-full" suppressHydrationWarning>
      <body className={`${cairo.className} h-full antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
