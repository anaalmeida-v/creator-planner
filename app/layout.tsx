import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import { AppShell } from "@/components/layout/AppShell";
import { RegisterSW } from "@/components/pwa/RegisterSW";
import { StoreProvider } from "@/lib/store";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "oopsaninha",
  description: "seu conteúdo, no seu ritmo.",
  applicationName: "oopsaninha",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "oopsaninha",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  themeColor: "#fcfbf9",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${outfit.variable} font-sans antialiased`}>
        <StoreProvider>
          <RegisterSW />
          <AppShell>{children}</AppShell>
        </StoreProvider>
      </body>
    </html>
  );
}
