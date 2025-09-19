// file: app/layout.tsx

import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans'; // Import GeistSans
import { GeistMono } from 'geist/font/mono'; // Import GeistMono
import "./globals.css";

export const metadata: Metadata = {
  title: "Payroll App",
  description: "A simple payroll app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Terapkan font sebagai CSS variable */}
      <body className={`${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}