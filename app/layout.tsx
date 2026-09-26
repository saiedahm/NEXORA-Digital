import type { Metadata } from "next";
import "./globals.css";
import { LegalComplianceGate } from "@/components/legal/LegalComplianceGate";

export const metadata: Metadata = {
  title: "NEXORA DIGITAL",
  description: "Your Business. Built. Managed. Grown. By AI.",
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>
        {children}
        <LegalComplianceGate />
      </body>
    </html>
  );
}
