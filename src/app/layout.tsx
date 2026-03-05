import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Music Generator - deAPI",
  description: "Generate music with AI using deAPI txt2music",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-zinc-950 text-zinc-100 antialiased">
        {children}
      </body>
    </html>
  );
}
