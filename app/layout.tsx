 import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NEXORA DIGITAL",
  description: "Your Business. Built. Managed. Grown. By AI.",
  manifest: "/manifest.webmanifest"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
