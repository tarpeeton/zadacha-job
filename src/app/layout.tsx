import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "Start 20.07.2025",
  description: "TEST",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
