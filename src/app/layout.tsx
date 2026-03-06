import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";

export const metadata = { title: "SnapFIT", description: "AI-powered fitness + nutrition SaaS" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
