import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "SnapFIT - AI Fitness Plans",
  description: "AI-generated workout and meal plans tailored to your goals."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900">
        <Navbar />
        <main className="py-10">{children}</main>
      </body>
    </html>
  );
}
