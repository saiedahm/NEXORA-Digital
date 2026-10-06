import type { Metadata } from "next";
import "./globals.css";
import "./platform/platform.css";
import "./pricing/pricing.css";
import "./dashboard/dashboard.css";
import "./ai-studio/studio.css";
import "./assistant/assistant.css";
import "./workspace/workspace.css";
import "./project/project.css";
import "./structure/structure.css";
import "./builder/builder.css";

export const metadata: Metadata = {
  title: "NEXORA DIGITAL",
  description: "AI-powered website creation and renewal platform."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
